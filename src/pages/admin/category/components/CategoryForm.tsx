import { useModal } from "@/common/hooks/useModal";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/common/config/schemas";

interface CategoryFormProps {
  values: Category;
  loading?: boolean;
  isCreate?: boolean;
  onSubmit: (values: Category) => void;
}

export function CategoryForm({ loading, onSubmit, values }: CategoryFormProps) {
  const { closeModal } = useModal();
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      ...values,
    },
  });

  const handleSubmit = (values: Category) => {
    closeModal();
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2">
          <FormInput
            formData={form}
            name="name"
            label="Name"
            required
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
