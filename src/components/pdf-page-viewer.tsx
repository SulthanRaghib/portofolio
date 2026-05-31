"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface PdfPageViewerProps {
  /** URL of the PDF file to render */
  url: string;
  /** Optional CSS class for the outer container */
  className?: string;
  /** Show prev/next navigation arrows and page indicator */
  showNavigation?: boolean;
  /** Starting page number (1-indexed) */
  initialPage?: number;
  /** Called when PDF loads successfully */
  onLoadSuccess?: (numPages: number) => void;
  /** Called when PDF fails to load */
  onError?: () => void;
}

/**
 * Renders individual PDF pages to a <canvas> element using pdf.js.
 * Supports single-page view with prev/next navigation.
 *
 * Key implementation detail: We serialize all render calls and cancel
 * in-flight renders before starting new ones to prevent canvas corruption
 * (mirrored / rotated pages) caused by concurrent transform operations.
 */
export function PdfPageViewer({
  url,
  className = "",
  showNavigation = false,
  initialPage = 1,
  onLoadSuccess,
  onError,
}: PdfPageViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeRenderRef = useRef<any>(null);
  const renderIdRef = useRef(0);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load the PDF document once
  useEffect(() => {
    let cancelled = false;

    const loadPdf = async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");

        // Configure worker from CDN (avoids Turbopack bundling issues)
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        }

        const loadingTask = pdfjsLib.getDocument({
          url,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (cancelled) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);
        setLoading(false);
        onLoadSuccess?.(doc.numPages);
      } catch (err) {
        if (cancelled) return;
        console.warn("[PdfPageViewer] Failed to load PDF:", err);
        setError(true);
        setLoading(false);
        onError?.();
      }
    };

    loadPdf();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  /**
   * Core render function — serialized and cancellation-safe.
   *
   * 1. Cancel any in-flight pdf.js renderTask
   * 2. Fully reset the canvas 2D context (identity transform, clear rect)
   * 3. Render the requested page
   */
  const renderPage = useCallback(async () => {
    const doc = pdfDocRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!doc || !canvas || !container) return;

    // Bump render id so stale callbacks can bail out
    const thisRenderId = ++renderIdRef.current;

    // Cancel any in-progress render task from pdf.js
    if (activeRenderRef.current) {
      try {
        activeRenderRef.current.cancel();
      } catch {
        // ignore — render may have already finished
      }
      activeRenderRef.current = null;
    }

    try {
      const page = await doc.getPage(currentPage);
      if (thisRenderId !== renderIdRef.current) return; // stale

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      if (containerWidth === 0 || containerHeight === 0) return;

      // Calculate scale to fit within container
      const unscaledViewport = page.getViewport({ scale: 1 });
      const scaleX = containerWidth / unscaledViewport.width;
      const scaleY = containerHeight / unscaledViewport.height;
      const scale = Math.min(scaleX, scaleY, 3); // cap at 3x

      const dpr = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: scale * dpr });
      const displayViewport = page.getViewport({ scale });

      // Set canvas dimensions
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${displayViewport.width}px`;
      canvas.style.height = `${displayViewport.height}px`;

      // CRITICAL: fully reset the 2D context before rendering
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // identity matrix
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Start render and track the task so it can be cancelled
      const renderTask = page.render({
        canvasContext: ctx,
        viewport,
      });

      activeRenderRef.current = renderTask;

      await renderTask.promise;

      // Clean up reference after successful render
      if (thisRenderId === renderIdRef.current) {
        activeRenderRef.current = null;
      }
    } catch (err) {
      // RenderingCancelledException is expected when we cancel — ignore it
      if (
        err &&
        typeof err === "object" &&
        "name" in err &&
        (err as { name: string }).name === "RenderingCancelledException"
      ) {
        return;
      }
      console.warn("[PdfPageViewer] Render error:", err);
    }
  }, [currentPage]);

  // Re-render when page changes or PDF finishes loading
  useEffect(() => {
    if (!loading && !error && pdfDocRef.current) {
      renderPage();
    }
  }, [loading, error, renderPage]);

  // Re-render on container resize (debounced)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeTimer: ReturnType<typeof setTimeout>;

    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (pdfDocRef.current && !loading && !error) {
          renderPage();
        }
      }, 150); // debounce to avoid rapid re-renders
    });

    observer.observe(container);
    return () => {
      clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, [renderPage, loading, error]);

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className={`relative flex flex-col items-center justify-center w-full h-full ${className}`}>
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="text-xs text-muted-foreground font-medium">Loading PDF...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/10 z-10">
          <div className="text-center px-4">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-destructive text-lg font-bold">!</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Failed to load certificate
            </p>
          </div>
        </div>
      )}

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="flex-1 w-full flex items-center justify-center overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className={`block rounded-sm ${loading || error ? "invisible" : ""}`}
        />
      </div>

      {/* Navigation controls */}
      {showNavigation && totalPages > 1 && !loading && !error && (
        <>
          {/* Left arrow */}
          <button
            onClick={goToPrev}
            disabled={currentPage <= 1}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 border border-border/60 shadow-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer backdrop-blur-sm"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          {/* Right arrow */}
          <button
            onClick={goToNext}
            disabled={currentPage >= totalPages}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 border border-border/60 shadow-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer backdrop-blur-sm"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Page indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-background/90 border border-border/60 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg">
            <span className="text-xs font-semibold text-foreground tabular-nums">
              {currentPage} / {totalPages}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
