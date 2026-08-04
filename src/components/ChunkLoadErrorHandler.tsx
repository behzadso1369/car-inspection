"use client";

import { useEffect } from "react";

const RELOAD_KEY = "carmacheck:chunk-reload";

function isChunkLoadError(message: string) {
  const msg = message.toLowerCase();
  return (
    msg.includes("loading chunk") ||
    msg.includes("chunkloaderror") ||
    msg.includes("failed to fetch dynamically imported module") ||
    msg.includes("error loading dynamically imported module") ||
    msg.includes("loading css chunk") ||
    msg.includes("next_reload") ||
    msg.includes("next reload")
  );
}

function reloadOnceForNewDeploy() {
  try {
    const alreadyReloaded = sessionStorage.getItem(RELOAD_KEY);
    if (alreadyReloaded === "1") return;

    sessionStorage.setItem(RELOAD_KEY, "1");
    window.location.reload();
  } catch {
    window.location.reload();
  }
}

/**
 * After a production deploy, open tabs may still reference old hashed chunks.
 * This recovers by doing a single hard reload when those assets 404.
 */
export function ChunkLoadErrorHandler() {
  useEffect(() => {
    // Clear the guard after a successful load so future deploys can recover again.
    const clearTimer = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_KEY);
      } catch {
        // ignore
      }
    }, 10_000);

    const onError = (event: ErrorEvent) => {
      const message = [
        event.message,
        event.error?.message,
        event.error?.name,
        event.filename,
      ]
        .filter(Boolean)
        .join(" ");

      if (isChunkLoadError(message)) {
        reloadOnceForNewDeploy();
      }
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        typeof reason === "string"
          ? reason
          : [reason?.message, reason?.name, reason?.toString?.()]
              .filter(Boolean)
              .join(" ");

      if (isChunkLoadError(String(message || ""))) {
        reloadOnceForNewDeploy();
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.clearTimeout(clearTimer);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
