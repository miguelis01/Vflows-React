import { useEffect, useRef, useContext } from "react";
import { useField } from "@unform/core";
import { CnpjInfoContext } from "../../context/CNPJContext";

import InputMask from "react-input-mask";
import * as S from "./styles";

interface InputProps {
  name: string;
}

export default function Input({ name, ...rest }: InputProps) {
  const { setCnpj } = useContext(CnpjInfoContext);
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[_\W]/g, ""); // Remove caracteres não numéricos da máscara
    setCnpj(rawValue);
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Section>
      <label>CNPJ</label>
      <InputMask
        mask="99.999.999/9999-99"
        onChange={handleInputChange}
        ref={inputRef}
        defaultValue={defaultValue}
        style={{ width: "15rem" }}
        {...rest}
      />
    </S.Section>
  );
}
