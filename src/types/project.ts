export interface Project {
  id: string;
  title: string;
  descriptionEn: string;
  descriptionId: string;
  image: string;
  technologies: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectsResponse = {
  success: boolean;
  data: Project[];
  pagination?: Record<string, any>;
  links?: Record<string, string | null>;
};
