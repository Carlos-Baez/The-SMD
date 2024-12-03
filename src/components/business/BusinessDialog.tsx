import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BusinessForm } from "./BusinessForm";
import { Business } from "@/types/business";

interface BusinessDialogProps {
  business?: Business;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BusinessDialog({
  business,
  open,
  onOpenChange,
}: BusinessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="px-4 py-2 border-b">
          <DialogTitle>
            {business ? "Edit Business" : "Add New Business"}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          <BusinessForm
            onSubmit={(data) => {
              console.log("Form submitted:", data);
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
            defaultValues={business}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
