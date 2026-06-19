"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';

function MermaidChart({ chart }: { chart: string }) {
  const [svgCode, setSvgCode] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    
    const renderChart = async () => {
      try {
        mermaid.initialize({ 
          startOnLoad: false, 
          theme: 'default',
          securityLevel: 'loose' 
        });
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
        const { svg } = await mermaid.render(id, chart);
        
        if (isMounted) {
          setSvgCode(svg);
        }
      } catch (error) {
        console.error("Mermaid render error:", error);
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (!svgCode) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg my-6 text-sm overflow-x-auto text-gray-500 animate-pulse">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div 
      className="flex justify-center my-8 w-full overflow-x-auto" 
      dangerouslySetInnerHTML={{ __html: svgCode }} 
    />
  );
}

interface MarkdownViewerProps {
  content: string;
  repoUrl: string;
}

export default function MarkdownViewer({ content, repoUrl }: MarkdownViewerProps) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-[var(--color-custom-dark-blue)] prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-[var(--color-custom-blue)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-gray-100 prose-pre:text-gray-800">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code(props) {
            const {children, className, node, ...rest} = props;
            const match = /language-(\w+)/.exec(className || '');
            
            // Check if it's a mermaid block
            if (match && match[1] === 'mermaid') {
              return <MermaidChart chart={String(children).replace(/\n$/, '')} />;
            }
            
            // Standard code block
            return (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          },
          img(props) {
            const { src, alt, ...rest } = props;
            let finalSrc = src;
            
            // If image is relative, point it to raw github content
            if (typeof src === 'string' && !src.startsWith('http') && !src.startsWith('data:')) {
              const cleanRepoUrl = repoUrl.replace(/\/$/, '');
              const cleanPath = src.replace(/^\.\//, '').replace(/^\//, '');
              // Using Github's raw proxy
              finalSrc = `${cleanRepoUrl}/raw/main/${cleanPath}`;
            }
            
            return <img src={finalSrc} alt={alt || ''} {...rest} />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
