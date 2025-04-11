import { useModal } from "@/common/hooks/useModal";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { menuSchema } from "@/common/config/schemas";
import { FormReactSelect } from "@/components/form/FormReactSelect";
import { useGetCategories } from "@/common/quries/category";
import { useMemo } from "react";

interface MenuFormProps {
  values: Menu;
  loading?: boolean;
  isCreate?: boolean;
  onSubmit: (values: Menu) => void;
}

export function MenuForm({ loading, onSubmit, values }: MenuFormProps) {
  const { closeModal } = useModal();
  const form = useForm<Menu>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      ...values,
    },
  });

  const { data: categoryOptions = [] } = useGetCategories();
  const categoryOptionsList = useMemo(() => {
    return categoryOptions?.map((option: Category) => ({
      label: option?.name,
      value: option?.id,
    }));
  }, [categoryOptions]);

  const handleSubmit = (values: Menu) => {
    closeModal();
    const payload = {
      ...values,
      price: Number(values.price),
      imageUrl: values.imageUrl?.trim() || undefined,
    }
    onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2">
          <FormInput formData={form} name="name" label="Name" required />
          <FormInput formData={form} name="description" label="Description" />
          <FormInput formData={form} name="price" label="Price" required type="number" />
          <FormInput formData={form} name="imageUrl" label="Image URL" />
          <FormReactSelect
            formData={form}
            name="categoryId"
            label="Category"
            options={categoryOptionsList}
            required
            isSearchable
          />
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
