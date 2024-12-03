import { ChangeEvent, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface LogoUploadProps {
  onFileSelect: (file: File) => void;
  defaultImage?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/svg+xml"];

export function LogoUpload({ onFileSelect, defaultImage }: LogoUploadProps) {
  const [preview, setPreview] = useState<string>(defaultImage || "");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPG, PNG, or SVG file.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 5MB limit.");
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative h-48 w-48 mx-auto rounded-lg border-2 border-dashed transition-colors ${
          isDragging ? "border-primary bg-primary/10" : "border-muted"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
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
              className="absolute -right-2 -top-2"
              onClick={() => {
                setPreview("");
                setProgress(0);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Drag & drop or click to upload
            </span>
            <input
              type="file"
              className="hidden"
              accept={ALLOWED_TYPES.join(",")}
              onChange={handleChange}
            />
          </label>
        )}
      </div>
      {progress > 0 && progress < 100 && (
        <Progress value={progress} className="w-full" />
      )}
      <p className="text-xs text-muted-foreground text-center">
        Supported formats: JPG, PNG, SVG (max 5MB)
      </p>
    </div>
  );
}
