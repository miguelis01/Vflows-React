import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Form } from "@unform/web";
import { api } from "../../services/api";
import Header from "../../components/Header/Header";
import ContractInput from "../../components/ContractInput/ContractInput";
import Footer from "../../components/Footer/Footer";
import * as S from "./styles";

const Contract = () => {
  const { contractId } = useParams();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState();
  const [contract, setContract] = useState();
  const [invoice, setInvoice] = useState([]);
  const [isClickedTecnhical, setIsClickedTecnhical] = useState(false);
  const [isClickedTaxes, setIsClickedTaxes] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  function getCompany() {
    setContract(
      JSON.parse(localStorage.getItem("contracts")).filter(
        (contract) => contract.id == contractId,
      )[0],
    );
    console.log(contract);
    setLoading(false);
  }

  function getContracts() {
    setCompany(JSON.parse(localStorage.getItem("company")));
  }

  function handleSubmit(data) {
    const errors = {};
    sendForm(data);
  }

  function sendForm(data) {
    console.log(data);
    console.log("Solicitação 999999 foi enviada com sucesso.");
    navigate("/");
  }

  useEffect(() => {
    api.get(`/invoices/contract/${contractId}`).then((response) => {
      getCompany();
      getContracts();
      const invoicesJson = JSON.stringify(response.data.invoices);
      setInvoice(response.data.invoices);
      localStorage.setItem("invoices", invoicesJson);
    });
  }, []);

  return (
    <>
      <S.Container>
        {!loading && (
          <Header
            title="Dados da Nota Fiscal"
            fantasyName={company.fantasyName}
            socialReason={company.socialReason}
            cnpj={company.cnpj}
          />
        )}
        <S.Section>
          {contract != undefined && (
            <>
              <S.ContainerHeader>
                <h3 style={{ marginRight: "4rem" }}>
                  Código do contrato: {contract.contractCode}
                </h3>
                <h3>{contract.contractName}</h3>
              </S.ContainerHeader>
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col"
              >
                <S.FormSection1>
                  <ContractInput
                    title="Número da nota"
                    type="number"
                    name="invoiceNumber"
                    id="invoiceNumber"
                  />
                  <ContractInput
                    title="Data de emisão"
                    type="date"
                    name="issueDate"
                    id="issueDate"
                  />
                  <ContractInput
                    title="Data de vencimento"
                    type="date"
                    name="dueDate"
                    id="dueDate"
                  />
                  <ContractInput
                    title="Valor (R$)"
                    type="number"
                    name="amount"
                    id="amount"
                    min="0"
                    step=".01"
                  />
                </S.FormSection1>

                <div>
                  <label className="md:text-xl xs:text-lg flex items-center md:mb-16 mb-8">
                    <input
                      type="checkbox"
                      name="taxesRetention"
                      id="taxesRetention"
                      className="mr-4 md:w-6 w-4 md:h-6 h-4"
                      onChange={() => setIsClickedTaxes(!isClickedTaxes)}
                    />
                    Retenção de Impostos
                  </label>
                  {isClickedTaxes && (
                    <div>
                      <h4 className="absolute md:text-xl sm:text-lg -top-4 bg-white md:w-40 w-32 text-center">
                        Dados
                      </h4>
                      <S.FormSection2>
                        <ContractInput
                          type="number"
                          name="ISSQN"
                          title="ISSQN"
                          id="ISSQN"
                          min="0"
                          max="99.99"
                          step=".01"
                        />
                        <ContractInput
                          name="IRRF"
                          title="IRRF"
                          id="IRRF"
                          min="0"
                          max="99.99"
                          step=".01"
                        />
                        <ContractInput
                          name="CSLL"
                          title="CSLL"
                          id="CSLL"
                          min="0"
                          max="99.99"
                          step=".01"
                        />
                        <ContractInput
                          name="COFINS"
                          title="COFINS"
                          id="COFINS"
                          min="0"
                          max="99.99"
                          step=".01"
                        />
                        <ContractInput
                          name="INSS"
                          title="INSS"
                          id="INSS"
                          min="0"
                          max="99.99"
                          step=".01"
                        />
                        <ContractInput
                          name="PIS"
                          title="PIS"
                          id="PIS"
                          min="0"
                          max="99.99"
                          step=".01"
                        />
                      </S.FormSection2>
                    </div>
                  )}

                  <div>
                    <label className="md:text-xl xs:text-lg flex items-center md:mb-16 mb-8">
                      <input
                        type="checkbox"
                        name="technicalRetention"
                        id="technicalRetention"
                        className="mr-4 md:w-6 w-4 md:h-6 h-4"
                        onChange={() =>
                          setIsClickedTecnhical(!isClickedTecnhical)
                        }
                      />
                      Retenção de Técnica
                    </label>
                    {isClickedTecnhical && (
                      <div>
                        <h4>Dados</h4>
                        <S.FormSection3>
                          <ContractInput
                            name="amountTecnhical"
                            title="Valor (R$)"
                            id="amountTecnhical"
                            disabled
                          />
                          <ContractInput
                            name="technicalRetention"
                            title="Percentual"
                            id="technicalRetention"
                            disabled
                          />
                        </S.FormSection3>
                      </div>
                    )}
                  </div>
                </div>
                <button type="button" onClick={() => navigate(-1)}>
                  Anterior
                </button>
                <button type="submit">Próximo</button>
              </Form>
              <Footer />
            </>
          )}
        </S.Section>
      </S.Container>
    </>
  );
};

export default Contract;
