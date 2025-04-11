import { useModal } from "@/common/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ModalManager() {
  const { open, option, closeModal } = useModal();

  const handleChange = (status: boolean) => {
    if (!status) closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-left">
          <DialogTitle>{option?.title}</DialogTitle>
          {option?.subtitle && (
            <DialogDescription>{option?.subtitle}</DialogDescription>
          )}
        </DialogHeader>
        {option?.content}
        {option?.actions && <DialogFooter className="flex-col">{option?.actions}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
