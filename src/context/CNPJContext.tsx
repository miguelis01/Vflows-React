import { createContext, useState, Dispatch } from "react";

type CnpjContextType = {
  cnpj: string | null;
  setCnpj: Dispatch<React.SetStateAction<string | null>>;
};

const iCnpjContextState = {
  cnpj: null,
  setCnpj: () => {},
};

export const CnpjInfoContext =
  createContext<CnpjContextType>(iCnpjContextState);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CnpjProvider = (props: any) => {
  const [cnpj, setCnpj] = useState<string | null>(null);
  return (
    <CnpjInfoContext.Provider value={{ cnpj, setCnpj }}>
      {props.children}
    </CnpjInfoContext.Provider>
  );
};
