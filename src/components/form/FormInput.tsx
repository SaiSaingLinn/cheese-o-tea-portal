import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { FieldValues, UseFormReturn } from "react-hook-form";
import React from "react";

interface FormInputProps<TForm extends FieldValues> extends InputProps {
  formData: UseFormReturn<TForm>;
  name: string;
  label?: string;
  password?: boolean;
  description?: string;
  required?: boolean;
  numericInput?: boolean;
}

const CustomInput = React.forwardRef((props: any, ref) => {
  const { formData, ...rest } = props;
  return (
    <Input
      ref={ref}
      {...rest}
      type={rest.type || "text"}
    />
    // <Input ref={ref} {...rest} />
  );
});
CustomInput.displayName = "CustomInput";

export function FormInput<TForm extends FieldValues>({
  formData,
  name,
  label,
  password,
  description,
  required = false,
  numericInput = false,
  ...props
}: FormInputProps<TForm>) {
  return (
    <FormField
      control={formData.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="space-y-1">
          {label && (
            <FormLabel className="text-xs">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <CustomInput {...field} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
