import { useCreateMenu } from "@/common/quries/menu";
import { MenuForm } from "./MenuForm";

export function MenuCreateForm() {
  const { mutate, isPending } = useCreateMenu();

  const handleSubmit = (values: Menu) => {
    mutate(values);
  };

  return (
    <MenuForm
      isCreate
      loading={isPending}
      values={{
        name: "",
        description: "",
        price: 0,
        categoryId: "",
        imageUrl: "",
      }}
      onSubmit={handleSubmit}
    />
  );
}
