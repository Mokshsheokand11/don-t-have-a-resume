export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    summary: string;
  };
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  achievements: string[];
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  location: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  link: string;
}

export type TemplateType = 'professional' | 'modern' | 'developer' | 'creative';
export type JobField = 'Software Developer' | 'Data Analyst' | 'Marketing' | 'Graphic Designer' | 'Finance' | 'HR' | 'Student / Fresher';
