import { useCallback, useEffect, useState } from "react";
import { getProjects } from "@/lib/api";
import type { Project } from "@/types/project";

type UseProjectsOptions = {
  limit?: number;
};

function getErrorMessage(err: unknown) {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  try {
    return String(err);
  } catch {
    return "Unknown error";
  }
}

export default function useProjects({ limit = 9 }: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProjects({ limit });
      const list = res?.data ?? [];

      // Ensure deterministic ordering: featured first, then by `order`, then by createdAt desc
      const sorted = [...list].sort((a, b) => {
        if ((a.featured ? 1 : 0) !== (b.featured ? 1 : 0)) {
          return a.featured ? -1 : 1;
        }
        const orderA = a.order ?? 0;
        const orderB = b.order ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        const dateA = new Date(a.createdAt ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? 0).getTime();
        return dateB - dateA;
      });

      setProjects(sorted);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await load();
    })();
    return () => {
      mounted = false;
    };
  }, [load]);

  return { projects, loading, error, reload: load } as const;
}
