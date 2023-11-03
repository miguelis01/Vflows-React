import { Form } from "@unform/web";
import Input from "../HomeInput/HomeInput";
import { api } from "../../services/api";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CnpjInfoContext } from "../../context/CNPJContext";
import * as S from "./styles";

export default function HomeForm() {
  const { cnpj } = useContext(CnpjInfoContext);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [error, setError] = useState<string | null>(null);

  function login() {
    api.get(`/contracts/${cnpj}`).then((response) => {
      const contractNumber = response.data.contracts.length;
      if (contractNumber > 0) {
        localStorage.setItem("cnpj", cnpj);
        navigate("/company");
      } else {
        setError("CNPJ sem contratos ativos");
      }
    });
  }

  function handleSubmit() {
    if (cnpj != null && cnpj.length == 14) {
      login();
    } else {
      setError("CNPJ Invalido");
    }
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <S.Container>
          <Input name="cnpj" />
          {error && <S.Error>{error}</S.Error>}
        </S.Container>
        <S.Button type="submit">Acessar</S.Button>
      </Form>
    </>
  );
}
