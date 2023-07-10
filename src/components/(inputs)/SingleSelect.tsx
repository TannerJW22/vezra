"use client";

import type { Control, FieldValues, Path, PathValue } from "@/lib/types";

import { ThemeContext } from "@/app/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseFormSetValue, useController } from "react-hook-form";
import { BiDownArrow } from "react-icons/bi";

// -=-=-= Types -=-=-= //
type SingleSelectProps<TFormSchema extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    config: {
      id: string;
      label: string;
      choices: ReadonlyArray<string>;
      syncFnProps: () => any;
      syncValue: string;
      syncSetValue: UseFormSetValue<TFormSchema>;
      syncControl: Control<TFormSchema>;
      syncError?: any;
      syncDisable?: string | string[] | boolean;
      syncCustomDefault?: unknown;
    };
  };

// =-=-=- Main Component =-=-=- //
export default function SingleSelect<TFormSchema extends FieldValues>({
  config,
  className,
  ...props
}: SingleSelectProps<TFormSchema>) {
  // RHF handles everything but visible choice and menu toggle

  const theme = useContext(ThemeContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [activeChoice, setActiveChoice] = useState(undefined);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    console.log("menuIsOpen", menuIsOpen); // <<--*
    console.log("menuRef.current", menuRef.current); // <<--*

    const closeMenuOnBlur = (event: Event) => {
      console.log("menuIsOpen >>>", menuIsOpen); // <<--*
      console.log("menuRef.current >>>", menuRef.current); // <<--*
      console.log("event.target >>>", event.target); // <<--*

      if (
        menuIsOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        console.log("hello from inside"); // <<--*
        setMenuIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenuOnBlur);

    return () => {
      document.removeEventListener("mousedown", closeMenuOnBlur);
    };
  }, [menuIsOpen]);

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
      setActiveChoice(undefined);
      config.syncSetValue(
        config.id as Path<TFormSchema>,
        "" as PathValue<TFormSchema, Path<TFormSchema>>,
        {
          // shouldValidate: true,
          shouldDirty: true,
        }
      );
      setMenuIsOpen(false);
      //
    } else {
      // --- Normal Selection --- //
      setActiveChoice(e.target.textContent);
      config.syncSetValue(
        config.id as Path<TFormSchema>,
        e.target.textContent,
        {
          // shouldValidate: true,
          shouldDirty: true,
        }
      );
      setMenuIsOpen(false);
    }
  };

  return (
    //
    <div className="relative w-fit">
      <input
        {...props}
        {...config.syncFnProps()}
        readOnly
        id={config.id}
        disabled={config.syncDisable}
        onClick={() => {
          console.log("onClick works"); // <<--*
          setMenuIsOpen(true);
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
          menuIsOpen && theme.singleSelect.label.header,
          config.syncValue && theme.singleSelect.label.header
        )}
        htmlFor={config.id}
      >
        {config.label}
      </label>
      <BiDownArrow
        onClick={() => setMenuIsOpen(true)}
        className={theme.singleSelect.arrow}
      />
      {menuIsOpen && (
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
