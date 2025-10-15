import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md w-full rounded-xl shadow-2xl border bg-white dark:bg-gray-900 text-center"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} // Fully center manually
      >
        <DialogHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="text-red-500 w-8 h-8" />
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </DialogTitle>
        </DialogHeader>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        <DialogFooter className="mt-6 flex justify-center gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
