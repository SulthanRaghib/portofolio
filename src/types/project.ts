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

export type Pagination = {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  nextPage?: number | null;
  prevPage?: number | null;
};

export type ProjectsResponse = {
  success: boolean;
  data: Project[];
  pagination?: Pagination;
  links?: Record<string, string | null>;
};
