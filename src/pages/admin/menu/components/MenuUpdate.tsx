import { useUpdateMenu } from "@/common/quries/menu";
import { MenuForm } from "./MenuForm";

export function MenuUpdateForm({
  id,
  values,
}: {
  id: string;
  values: Menu;
}) {
  const { mutate, isPending } = useUpdateMenu(id || "");

  return (
    <MenuForm
      loading={isPending}
      values={{
        ...values,
      }}
      onSubmit={mutate}
    />
  );
}