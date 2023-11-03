import React, { useEffect, useContext, useState } from "react";
import { CnpjInfoContext } from "../../context/CNPJContext";
import { api } from "../../services/api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Table from "../../components/Table/Table";
import * as S from "./styles";

const Company = () => {
  const { cnpj, setCnpj } = useContext(CnpjInfoContext);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState();

  function getCompanyContracts(cnpj: string | null) {
    api.get(`/contracts/${cnpj}`).then((response) => {
      const contractsJson = JSON.stringify(response.data.contracts);
      localStorage.setItem("contracts", contractsJson);
    });
  }

  function getCompany(cnpj: string | null) {
    api.get(`/companies/${cnpj}`).then((response) => {
      const companyJson = JSON.stringify(response.data.companies[0]);
      localStorage.setItem("company", companyJson);
      setCompany(JSON.parse(localStorage.getItem("company")));
      setLoading(false);
    });
  }

  useEffect(() => {
    if (cnpj == null) {
      setCnpj(localStorage.getItem("cnpj"));
    }
    getCompanyContracts(cnpj);
    getCompany(cnpj);
  }, []);

  return (
    <S.Container>
      <S.Section>
        {!loading && (
          <>
            <Header
              title="Contratos Vinculados"
              fantasyName={company.fantasyName}
              socialReason={company.socialReason}
              cnpj={company.cnpj}
            />
            <Table />
          </>
        )}
        <Footer />
      </S.Section>
    </S.Container>
  );
};

export default Company;
