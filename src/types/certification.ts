export interface CertificationPreview {
  url: string;
  page: number;
  thumbnail: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  expirationAt: string | null;
  credentialUrl: string | null;
  credentialId: string | null;
  skills: string[];
  image: string;
  isPDF: boolean;
  pdfPages: number;
  thumbnail: string;
  previewUrl: string;
  previews: CertificationPreview[];
  createdAt: string;
  updatedAt: string;
  localPath?: string; // Optional local fallback file path in /public
}

export type CertificationsResponse = {
  success: boolean;
  data: Certification[];
  pagination?: {
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    itemsPerPage?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
  };
  links?: Record<string, string | null>;
};
