import { useCallback, useEffect, useState } from "react";
import { getCertifications } from "@/lib/api";
import type { Certification } from "@/types/certification";

type UseCertificationsOptions = {
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

export default function useCertifications({
  limit,
}: UseCertificationsOptions = {}) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCertifications({ limit });
      const list = res?.data ?? [];

      // Sort by issue date descending (newest first)
      const sorted = [...list].sort((a, b) => {
        const dateA = new Date(a.issuedAt).getTime();
        const dateB = new Date(b.issuedAt).getTime();
        return dateB - dateA;
      });

      setCertifications(sorted);
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

  return { certifications, loading, error, reload: load } as const;
}
