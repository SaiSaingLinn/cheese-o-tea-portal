import { useModal } from "@/common/hooks/useModal";
import { CategoryUpdateForm } from "./CategoryUpdate";
import { Button } from "@/components/ui/button";
import { FilePenLineIcon, Trash2Icon } from "lucide-react";
import { useDeleteCategory } from "@/common/quries/category";

export function CategoryAction({ values }: { values: Category }) {
  const { openModal } = useModal();
  const { mutate } = useDeleteCategory();

  return (
    <div className="flex justify-start gap-3 md:gap-0">
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          openModal({
            title: "Edit Category",
            content: (
              <CategoryUpdateForm id={values?.id || ""} values={values} />
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
