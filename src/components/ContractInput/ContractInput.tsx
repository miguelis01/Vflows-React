import { InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "@unform/core";

import * as S from "./styles";

interface InvoiceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  disabled?: boolean;
}

export default function Input({
  title,
  name,
  disabled,
  ...rest
}: InvoiceInputProps) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <S.Section>
      {title}
      <input
        ref={inputRef}
        className={`border-black/20 border-[1px] rounded-lg sm:w-4/5 w-full h-10 pl-2 mt-2 ${
          disabled ? "bg-disabled" : ""
        }`}
        disabled={disabled}
        {...rest}
      />

      {error && (
        <span className="text-error text-xs font-semibold mt-2 mb-[-10px] lg:absolute lg:-bottom-6">
          {error}
        </span>
      )}
    </S.Section>
  );
}
