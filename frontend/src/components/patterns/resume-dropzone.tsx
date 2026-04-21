"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, Loader2, UploadCloud, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ResumeMeta } from "@/lib/schemas/auth";
import { uploadResume } from "@/lib/api/auth";

const ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

function humanSize(bytes: number) {
  if (bytes >= 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function ResumeDropzone({
  value,
  onUploaded,
  onCleared,
}: {
  value?: ResumeMeta;
  onUploaded: (meta: ResumeMeta) => void;
  onCleared: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const accept = useCallback(
    async (file: File | undefined) => {
      setError(undefined);
      if (!file) return;
      if (file.size > MAX_BYTES) {
        setError("File is larger than 10 MB.");
        return;
      }
      const okType =
        /\.(pdf|docx?)$/i.test(file.name) ||
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type);
      if (!okType) {
        setError("PDF or Word document only.");
        return;
      }
      try {
        setUploading(true);
        const meta = await uploadResume(file);
        onUploaded(meta);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onUploaded]
  );

  if (value) {
    return (
      <div className="bg-canvas border border-accent/30 shadow-[inset_0_0_0_1px_hsl(var(--accent-soft))] p-6 flex items-start gap-5">
        <span className="shrink-0 size-11 bg-accent-soft border border-accent/30 flex items-center justify-center">
          <FileText className="size-5 text-accent-ink" strokeWidth={1.5} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle2 className="size-4 text-success" strokeWidth={1.75} />
            <span className="label text-success">Resume attached</span>
          </div>
          <div className="text-[15px] text-ink truncate">{value.name}</div>
          <div className="mt-1 dateline">
            {humanSize(value.sizeBytes)}
            <span className="rule-dot" />
            Uploaded just now
          </div>
        </div>
        <button
          type="button"
          onClick={onCleared}
          aria-label="Remove file"
          className="shrink-0 text-muted hover:text-ink transition-colors p-1"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          void accept(file);
        }}
        className={cn(
          "relative group cursor-pointer select-none bg-canvas border border-dashed p-10 md:p-14 text-center transition-colors",
          dragging
            ? "border-accent bg-accent-soft/40"
            : "border-rule-strong hover:border-accent hover:bg-paper-soft",
          uploading && "pointer-events-none opacity-80"
        )}
      >
        <div
          className={cn(
            "mx-auto mb-5 size-14 flex items-center justify-center border transition-colors",
            dragging
              ? "border-accent bg-canvas text-accent-ink"
              : "border-rule-strong bg-paper-soft text-ink-soft group-hover:border-accent group-hover:text-accent-ink"
          )}
        >
          {uploading ? (
            <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
          ) : (
            <UploadCloud className="size-5" strokeWidth={1.5} />
          )}
        </div>
        <div className="font-display text-[22px] text-ink tracking-tight leading-tight">
          {uploading
            ? "Reading your resume…"
            : dragging
            ? "Release to upload"
            : "Drop your resume here"}
        </div>
        <div className="mt-2 text-[14px] text-muted-strong">
          or&nbsp;
          <span className="text-accent-ink underline underline-offset-4 decoration-rule-strong group-hover:decoration-accent">
            browse your files
          </span>
        </div>
        <div className="mt-6 dateline">
          PDF or Word&nbsp;·&nbsp;up to 10 MB
        </div>

        {/* Scan line when dragging */}
        {dragging ? (
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-accent animate-sweep"
          />
        ) : null}

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => void accept(e.target.files?.[0])}
        />
      </div>
      {error ? (
        <p className="mt-3 text-[13px] text-danger leading-relaxed">{error}</p>
      ) : null}
    </>
  );
}
