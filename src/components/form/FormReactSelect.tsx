import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Select from "react-select";
import { InputProps } from "../ui/input";

interface FormInputProps<TForm extends FieldValues> extends InputProps {
  formData: TForm;
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  options?: { label: string; value: string | number; email?: string }[];
  isDisabled?: boolean;
  isSearchable?: boolean;
  isMulti?: boolean;
  getOptionLabel?: any; 
  placeholder?: string;
}

export function FormReactSelect<TForm extends FieldValues>({
  formData,
  name,
  label,
  description,
  required = false,
  isDisabled = false,
  isSearchable = false,
  isMulti = false,
  options,
  getOptionLabel,
  placeholder,
  ...props
}: FormInputProps<TForm>) {
  return (
    <FormField
      control={formData.control}
      name={name as any}
      render={({ field }: { field: ControllerRenderProps<TForm, any> }) => (
        <FormItem className="space-y-1">
          {label && (
            <FormLabel className="text-xs">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <Select
              {...field}
              className="react-select-container"
              classNamePrefix="react-select"          
              value={isMulti ? field.value : options?.find((option) => option?.value === field?.value) || null}
              onChange={(selected: any) => {
                isMulti ? field.onChange(selected || []) : field.onChange(selected?.value || "");
                props?.onChange && props?.onChange(selected)
              }}
              options={options}
              isDisabled={isDisabled}
              isClearable
              isSearchable={isSearchable}
              isMulti={isMulti ? !(isDisabled && Array.isArray(field.value) && field.value.length <= 1) : false}
              getOptionLabel={getOptionLabel}
              placeholder={placeholder}
              closeMenuOnSelect={isMulti ? false : true}
            />
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
