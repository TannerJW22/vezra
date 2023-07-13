"use client";

import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "@/lib/types";

import { ThemeContext } from "@/app/ThemeProvider";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useContext, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController } from "react-hook-form";
import { BiDownArrow } from "react-icons/bi";

// -=-=-= Types -=-=-= //
type DateSelectProps<
  TFormSchema extends FieldValues,
  TInputValue
> = InputHTMLAttributes<HTMLInputElement> & {
  config: {
    id: string;
    label: string;
    syncFnProps: () => any;
    syncValue: TInputValue;
    syncSetValue: UseFormSetValue<TFormSchema>;
    syncControl: Control<TFormSchema>;
    syncError?: any;
    syncDisable?: string | string[] | boolean;
    syncCustomDefault?: unknown;
  };
};

// =-=-=- Main Component =-=-=- //
export default function DateSelect<
  TFormSchema extends FieldValues,
  TInputValue
>({ config, className, ...props }: DateSelectProps<TFormSchema, TInputValue>) {
  // React Hook Form handles everything but isMenuOpen and activeChoice (which controls displayed label).

  const theme = useContext(ThemeContext);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChoice, setActiveChoice] = useState(undefined);
  const menuRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log("startDate >>> ", startDate); // <<--*
  //   console.log("isMenuOpen >>> ", isMenuOpen); // <<--*
  //   console.log("activeChoice >>> ", activeChoice); // <<--*
  // }, [startDate, isMenuOpen, activeChoice]);

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState,
  } = useController({
    name: config?.id as Path<TFormSchema>,
    control: config?.syncControl,
    defaultValue: (config?.syncCustomDefault || "") as PathValue<
      TFormSchema,
      Path<TFormSchema>
    >,
  });

  const handleSelect = (date: Date) => {
    config.syncSetValue(
      config.id as Path<TFormSchema>,
      date as PathValue<TFormSchema, Path<TFormSchema>>,
      {
        // shouldValidate: true,
        shouldDirty: true,
      }
    );
    setIsMenuOpen(false);
  };

  return (
    //
    <div className="relative">
      <input
        {...props}
        {...config.syncFnProps()}
        readOnly
        id={config.id}
        disabled={config.syncDisable}
        onClick={() => {
          console.log("onClick works"); // <<--*
          setIsMenuOpen(true);
        }}
        className={cn(
          cn(theme.singleSelect.base, className),
          config?.syncDisable && theme.singleSelect.onDisable,
          config?.syncError && theme.singleSelect.onError
        )}
      />
      <label
        className={cn(
          theme.singleSelect.label.placeholder,
          isMenuOpen && theme.singleSelect.label.header,
          config.syncValue && theme.singleSelect.label.header
        )}
        htmlFor={config.id}
      >
        {config.label}
      </label>
      <BiDownArrow
        onClick={() => setIsMenuOpen(true)}
        className={theme.singleSelect.arrow}
      />
      {isMenuOpen && (
        <DatePicker
          className="absolute z-10"
          startOpen={true}
          onClickOutside={() => setIsMenuOpen(false)}
          shouldCloseOnSelect={false}
          onChange={(date: Date) => handleSelect(date)}
        />
      )}
    </div>
  );
}
