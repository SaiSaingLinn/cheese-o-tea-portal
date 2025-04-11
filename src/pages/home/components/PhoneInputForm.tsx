import { phoneSchema } from "@/common/config/schemas";
import { useModal } from "@/common/hooks/useModal";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PhoneInputFormProps {
  onSubmit: (values: { phone: string }) => void;
}

type PhoneFormValues = z.infer<typeof phoneSchema>;

export function PhoneInputForm({
  onSubmit,
}: PhoneInputFormProps) {
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    mode: "onChange", // so button disables instantly on invalid input
  });

  const handleSubmitPhone = (values: { phone: string }) => {
    closeModal();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitPhone)} className="space-y-4">
      <div>
        <div className="relative mt-1">
          <input
            type="tel"
            {...register("phone")}
            placeholder="09xxxxxxxxx"
            className={`w-full rounded-md border px-4 py-2 text-sm ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className={`w-full ${
          !isValid && "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Continue
      </Button>
    </form>
  );
};
