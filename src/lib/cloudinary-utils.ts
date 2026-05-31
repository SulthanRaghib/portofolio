/**
 * Cloudinary URL Utilities
 *
 * Cloudinary stores certificate files under `/raw/upload/` which serves
 * the original PDF binary. Browsers cannot render raw PDFs as <img> tags.
 *
 * To get an image preview (JPG/PNG) of a PDF page, we must change the
 * delivery type from `raw` to `image` and optionally add transformation
 * parameters like width, quality, page number, and output format.
 */

/**
 * Convert a Cloudinary `/raw/upload/` URL to `/image/upload/` with
 * transformation parameters so the PDF page is returned as an image.
 *
 * @param url - Original Cloudinary raw URL
 * @param options - Transformation options
 * @returns Transformed image URL, or the original URL if not a Cloudinary raw URL
 */
export function toCloudinaryImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    page?: number;
    format?: string;
  } = {},
): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  const {
    width = 800,
    quality = "auto",
    page = 1,
    format = "jpg",
  } = options;

  // Replace /raw/upload/ with /image/upload/ and inject transformations
  // Pattern: .../raw/upload/[optional_existing_transforms/]v<version>/...
  const replaced = url.replace(
    /\/raw\/upload\/(?:[^/]*\/)*v(\d+)\//,
    (_match, version) => {
      const transforms = [
        `w_${width}`,
        `q_${quality}`,
        `pg_${page}`,
        `f_${format}`,
      ].join(",");
      return `/image/upload/${transforms}/v${version}/`;
    },
  );

  return replaced;
}

/**
 * Generate a thumbnail URL for certificate cards.
 */
export function getCertThumbnailUrl(url: string): string {
  return toCloudinaryImageUrl(url, {
    width: 500,
    quality: "auto",
    page: 1,
    format: "jpg",
  });
}

/**
 * Generate a high-resolution preview URL for modal display.
 */
export function getCertPreviewImageUrl(url: string): string {
  return toCloudinaryImageUrl(url, {
    width: 1200,
    quality: "auto",
    page: 1,
    format: "jpg",
  });
}
