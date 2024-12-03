import { ChangeEvent, useState } from "react";
import { Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface CompactLogoUploadProps {
  onFileSelect: (file: File) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/svg+xml"];

export function CompactLogoUpload({ onFileSelect }: CompactLogoUploadProps) {
  const [preview, setPreview] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or SVG file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setProgress(0);
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress((e.loaded / e.total) * 100);
      }
    };
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setProgress(100);
      onFileSelect(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <AnimatePresence mode="wait">
        <motion.div
          className={`relative h-32 rounded-lg border-2 border-dashed transition-colors ${
            isDragging ? "border-primary" : "border-muted"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="Logo preview"
                className="h-full w-full rounded-lg object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6"
                onClick={() => {
                  setPreview("");
                  setProgress(0);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Drop logo here or click to upload
              </span>
              <input
                type="file"
                className="hidden"
                accept={ALLOWED_TYPES.join(",")}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </label>
          )}
        </motion.div>
      </AnimatePresence>
      {progress > 0 && progress < 100 && (
        <Progress value={progress} className="h-1" />
      )}
    </div>
  );
}
