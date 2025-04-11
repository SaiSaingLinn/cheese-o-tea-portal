import { useCreateCategory } from "@/common/quries/category";
import { CategoryForm } from "./CategoryForm";

export function CategoryCreateForm() {
  const { mutate, isPending } = useCreateCategory();

  const handleSubmit = (values: Category) => {
    mutate(values);
  };

  return (
    <CategoryForm
      isCreate
      loading={isPending}
      values={{
        name: "",
      }}
      onSubmit={handleSubmit}
    />
  );
}
