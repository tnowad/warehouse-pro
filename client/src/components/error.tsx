import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ErrorProps {
  title: string;
  description: string;
  onClose?: () => void;
}

export const ErrorAlert = ({ title, description, onClose }: ErrorProps) => {
  return (
    <Alert variant="destructive" className="space-y-2">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <div className="flex justify-end">
        {onClose && (
          <Button
            variant="link"
            size="icon"
            onClick={onClose}
            className="text-red-600 hover:bg-red-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  );
};
