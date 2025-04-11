import { useModal } from "@/common/hooks/useModal";
import { MenuUpdateForm } from "./MenuUpdate";
import { Button } from "@/components/ui/button";
import { FilePenLineIcon, Trash2Icon } from "lucide-react";
import { useDeleteMenu } from "@/common/quries/menu";

export function MenuAction({ values }: { values: Menu }) {
  const { openModal } = useModal();
  const { mutate } = useDeleteMenu();

  return (
    <div className="flex justify-start gap-3 md:gap-0">
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          openModal({
            title: "Edit Menu",
            content: (
              <MenuUpdateForm id={values?.id || ""} values={values} />
            ),
          })
        }
        className="h-4"
      >
        <FilePenLineIcon className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => mutate(values?.id || "")}
        className="text-red-500 h-4"
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}
