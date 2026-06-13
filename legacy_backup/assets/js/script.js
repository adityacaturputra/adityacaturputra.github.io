const projects = [
    {
        name: 'University Day SMA Negeri 1 Kandanghaur',
        description: 'Web application project to support university day activities in high school',
        techStack: 'Nodejs, Express, Mongodb, EJS, React, Nextjs, HTML, CSS, Tailwind, TypeScript, Javascript',
        imgUrl: 'https://i.ibb.co/x3B79Ld/image.png',
        repoUrl: 'https://github.com/adityacaturputra/your-school-univday',
        DemoUrl: 'https://univdaysmansaka.web.app/',
    },
    {
        name: 'Busy Schedule - School Schedule Web App',
        description: 'Busy School is a web application that is useful for managing class schedules, viewing class schedules, and managing class assignments.',
        techStack: 'React, Create React App, Redux, PWA, Styled Components, HTML, CSS, JavaScript, Supabase, SQL',
        imgUrl: 'https://i.ibb.co/5Yzb7H3/image.png',
        repoUrl: 'https://github.com/adityacaturputra/busy-school',
        DemoUrl: 'https://busy-school.vercel.app/',
    },
    {
        name: 'Food Explorer - Restaurant Web App',
        description: 'Web app for explore any food you wanna to eat. This repo is to fulfill submissions on Dicoding course platform Learn Front-End Web Development Fundamentals. In this course, discussed about javascript es6, oop, web components, node js, npm, webpack, and ajax.',
        techStack: 'HTML, CSS, Javascript, Web Components, Webpack, Babel, Nodejs',
        imgUrl: 'https://i.ibb.co/XzKjJDh/image.png',
        repoUrl: 'https://github.com/adityacaturputra/food-explorer',
        DemoUrl: 'https://food-explorer.vercel.app/',
    },
    
]


const projectsElement = document.getElementById('projects')

projectsElement.innerHTML = projects.map((project) => `
<div class="project-container">
    <p class="project-title">${project.name}</p>
    <div class="project-image">
        <img class="project-image__img" src="${project.imgUrl}" alt="">
        <div class="project-image__img-overlay"></div>
        <div class="project-text">
            <p class="project-name">${project.name}</p>
            <p class="project-description">${project.description}</p>
            <br/>
            <p class="project-tech-stack">${project.techStack}</p>
            <p class="project-description"><a class="anchor" href="${project.repoUrl}" target="_blank">Repo<a/> | <a  class="anchor" href="${project.DemoUrl}" target="_blank">Demo<a/></p>
        </div>
    </div>
</div>
`).join("")


function ScrollTo(elementId) {
    var element = document.getElementById(elementId);
    var headerOffset = 72;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}