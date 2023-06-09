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
import { useController } from "react-hook-form";
import { BiDownArrow } from "react-icons/bi";

// -=-=-= Types -=-=-= //
type SingleSelectProps<
  TFormSchema extends FieldValues,
  TInputValue
> = InputHTMLAttributes<HTMLInputElement> & {
  config: {
    id: string;
    label: string;
    choices: ReadonlyArray<string>;
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
export default function SingleSelect<
  TFormSchema extends FieldValues,
  TInputValue
>({
  config,
  className,
  ...props
}: SingleSelectProps<TFormSchema, TInputValue>) {
  // React Hook Form handles everything but isMenuOpen and activeChoice (which controls displayed label).

  const theme = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    console.log("isMenuOpen", isMenuOpen); // <<--*
    console.log("menuRef.current", menuRef.current); // <<--*

    const closeMenuOnBlur = (event: Event) => {
      console.log("isMenuOpen >>>", isMenuOpen); // <<--*
      console.log("menuRef.current >>>", menuRef.current); // <<--*
      console.log("event.target >>>", event.target); // <<--*

      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        console.log("hello from inside"); // <<--*
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenuOnBlur);

    return () => {
      document.removeEventListener("mousedown", closeMenuOnBlur);
    };
  }, [isMenuOpen]);

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

  const handleSelect = (e: any) => {
    // --- Universal "Clear" Option --- //
    if (e.target.textContent === "...") {
      config.syncSetValue(
        config.id as Path<TFormSchema>,
        "" as PathValue<TFormSchema, Path<TFormSchema>>,
        {
          // shouldValidate: true,
          shouldDirty: true,
        }
      );
      setIsMenuOpen(false);
      //
    } else {
      // --- Normal Selection --- //
      config.syncSetValue(
        config.id as Path<TFormSchema>,
        e.target.textContent,
        {
          // shouldValidate: true,
          shouldDirty: true,
        }
      );
      setIsMenuOpen(false);
    }
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
