import type { ProjectsResponse, Project } from "@/types/project";

const DEFAULT_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://portofolio-backend-beta.vercel.app/api";

export type GetProjectsParams = {
  page?: number;
  limit?: number;
  featured?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

function buildUrl(path: string, params?: Record<string, any>) {
  const base = DEFAULT_BASE.replace(/\/$/, "");
  const url = new URL(`${base}${path.startsWith("/") ? "" : "/"}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

export async function getProjects(params?: GetProjectsParams): Promise<ProjectsResponse> {
  const query: Record<string, any> = {};
  if (params) {
    if (params.page) query.page = params.page;
    if (params.limit) query.limit = params.limit;
    if (params.featured !== undefined) query.featured = params.featured;
    if (params.search) query.search = params.search;
    if (params.sortBy) query.sortBy = params.sortBy;
    if (params.sortOrder) query.sortOrder = params.sortOrder;
  }

  const url = buildUrl("/projects", query);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // cache: "no-store" // uncomment to always fetch fresh data
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText} - ${text}`);
  }

  const json = (await res.json()) as ProjectsResponse;
  // Basic validation
  if (!json || !Array.isArray(json.data)) {
    return { success: false, data: [] } as ProjectsResponse;
  }

  return json;
}

export async function getProjectById(id: string): Promise<{ success: boolean; data?: Project } > {
  const url = buildUrl(`/projects/${encodeURIComponent(id)}`);
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch project ${id}: ${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}
