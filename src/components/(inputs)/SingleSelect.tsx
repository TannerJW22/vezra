"use client";

import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "@/lib/types";

import { ThemeContext } from "@/app/ThemeProvider";
import { useHideOnBlurEffect } from "@/hooks";
import { cn } from "@/lib/utils";
import {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  UseFormClearErrors,
  UseFormRegisterReturn,
  useController,
} from "react-hook-form";
import { BiDownArrow } from "react-icons/bi";

// -=-=-= Types -=-=-= //
type SingleSelectProps<
  TFormSchema extends FieldValues,
  TInputValue
> = InputHTMLAttributes<HTMLInputElement> & {
  config: {
    id: Path<TFormSchema>;
    label: string;
    choices: ReadonlyArray<string>;
    syncFnProps: () => UseFormRegisterReturn;
    syncValue: TInputValue;
    syncSetValue: UseFormSetValue<TFormSchema>;
    syncClearErrors: UseFormClearErrors<TFormSchema>;
    syncControl: Control<TFormSchema>;
    syncError?: any;
    syncDisable?: boolean;
    syncCustomDefault?: unknown;
  };
};

// =-=-=- Main Component =-=-=- //
export default function SingleSelect<
  TFormSchema extends FieldValues,
  TInputValue
>({
  config,
  className,
  ...props
}: SingleSelectProps<TFormSchema, TInputValue>) {
  // :::( React Hook Form handles all logic except dropdown visibility

  const theme = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  // Close dropdown on click away
  useHideOnBlurEffect<HTMLUListElement>({
    syncRef: menuRef,
    syncIsRefVisible: isMenuOpen,
    syncSetIsRefVisible: setIsMenuOpen,
  });

  // Clear errors onValueChange to reset UI styles
  useEffect(() => {
    if (config.syncError) {
      config.syncClearErrors(config.id);
    }
  }, [config.syncValue]);

  // Wire up input to React Hook Form
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

  //
  const handleSelect = (e: any) => {
    // Universal "Clear" Option
    if (e.target.textContent === "...") {
      config.syncSetValue(
        config.id as Path<TFormSchema>,
        "" as PathValue<TFormSchema, Path<TFormSchema>>,
        {
          // ? // shouldValidate: true,
          shouldDirty: true,
        }
      );
      setIsMenuOpen(false);
      //
    } else {
      // Normal Selection
      config.syncSetValue(
        config.id as Path<TFormSchema>,
        e.target.textContent,
        {
          // ? // shouldValidate: true,
          shouldDirty: true,
        }
      );
      setIsMenuOpen(false);
    }
  };

  return (
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
        <ul ref={menuRef} className={theme.singleSelect.menu}>
          <li
            onClick={(e) => handleSelect(e)}
            className={theme.singleSelect.menuItem}
          >
            {"..."}
          </li>
          {config.choices.map((value, i) => {
            return (
              <li
                key={i}
                onClick={(e) => handleSelect(e)}
                className={theme.singleSelect.menuItem}
              >
                {value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
