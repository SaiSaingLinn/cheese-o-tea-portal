import { useUpdateCategory } from "@/common/quries/category";
import { CategoryForm } from "./CategoryForm";

export function CategoryUpdateForm({
  id,
  values,
}: {
  id: string;
  values: Category;
}) {
  const { mutate, isPending } = useUpdateCategory(id || "");

  return (
    <CategoryForm
      loading={isPending}
      values={{
        ...values,
      }}
      onSubmit={mutate}
    />
  );
}