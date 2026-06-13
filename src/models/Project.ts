import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  techStack: string;
  imgUrl: string;
  repoUrl: string;
  DemoUrl: string;
  category: 'Personal' | 'Community';
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: String, required: true },
    imgUrl: { type: String, required: true },
    repoUrl: { type: String, required: true },
    DemoUrl: { type: String, required: true },
    category: { type: String, enum: ['Personal', 'Community'], default: 'Personal' },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in Next.js development environment
const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
