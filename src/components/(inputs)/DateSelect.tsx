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
import {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [startDate, setStartDate] = useState<Date | string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChoice, setActiveChoice] = useState(undefined);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"); // <<--*
    console.log("startDate >>> ", startDate); // <<--*
    console.log("syncValue >>> ", config.syncValue); // <<--*
    console.log("isMenuOpen >>> ", isMenuOpen); // <<--*
    console.log("activeChoice >>> ", activeChoice); // <<--*
  }, [startDate, isMenuOpen, activeChoice, config.syncValue]);

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

  const handleSelect = (rawDate: Date) => {
    const date = rawDate.toLocaleDateString();

    config.syncSetValue(
      config.id as Path<TFormSchema>,
      date as PathValue<TFormSchema, Path<TFormSchema>>,
      {
        // shouldValidate: true,
        shouldDirty: true,
      }
    );
    setStartDate(date);
    setIsMenuOpen(false);
  };

  const handleClearChoice = () => {
    config.syncSetValue(
      config.id as Path<TFormSchema>,
      "" as PathValue<TFormSchema, Path<TFormSchema>>,
      {
        // shouldValidate: true,
        shouldDirty: true,
      }
    );
    setStartDate("");
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
          if (!isMenuOpen) {
            // this check is a precaution to avoid conflicts w/ {handleClearChoice} in <span>
            setIsMenuOpen(true);
          }
        }}
        className={cn(
          cn(theme.dateCalendar.base, className),
          config?.syncDisable && theme.dateCalendar.onDisable,
          config?.syncError && theme.dateCalendar.onError
        )}
      />
      <label
        className={cn(
          theme.dateCalendar.label.placeholder,
          isMenuOpen && theme.dateCalendar.label.header,
          config.syncValue && theme.dateCalendar.label.header
        )}
        htmlFor={config.id}
      >
        {config.label}
      </label>
      {isMenuOpen && (
        <span
          ref={spanRef}
          onClick={() => handleClearChoice()}
          className={theme.dateCalendar.clearChoice}
        >
          {"..."}
        </span>
      )}
      <BiDownArrow
        onClick={() => setIsMenuOpen(true)}
        className={theme.dateCalendar.arrow}
      />
      {isMenuOpen && (
        <DatePicker
          className="hidden absolute z-10 border border-red-500"
          calendarClassName="absolute z-20 scale-[0.90] -top-[44px] left-[10px]"
          startOpen={true}
          onClickOutside={(e) => {
            // this check is necessary to avoid conflicts w/ {handleClearChoice} in <span>
            if (spanRef && !spanRef.current!.contains(e.target as Node)) {
              setIsMenuOpen(false);
            }
          }}
          shouldCloseOnSelect={false}
          onChange={(date: Date) => handleSelect(date)}
        />
      )}
    </div>
  );
}
