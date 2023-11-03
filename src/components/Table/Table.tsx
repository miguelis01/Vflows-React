import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";

interface ContractInterface {
  id: string;
  companyId: string;
  contractName: string;
  contractCode: string;
  technicalRetention: number;
}

export default function Table() {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkboxArray, setCheckboxArray] = useState<string[]>([]);
  const [contracts, setContracts] = useState([]);
  const [viewContractError, setViewContractError] = useState("");
  const [contractID, setContractID] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const contractsJson = localStorage.getItem("contracts");
    setContracts(JSON.parse(contractsJson));
  }, []);

  function openContract() {
    if (checkboxArray.length === 0) {
      setViewContractError("Ao menos um Contrato deverá ser selecionado");
      return false;
    }

    if (checkboxArray.length >= 2) {
      setViewContractError("Somente um Contrato deverá ser selecionado");
      return false;
    }

    navigate(`/company/contract/${checkboxArray[0]}`);
  }

  function handleClick(id: string) {
    setContractID(id);
    setIsOpen(true);
    console.log("a");
  }

  return (
    <>
      <S.Container>
        <S.Table cellPadding={12}>
          <S.TableHead className="lg:text-xl text-lg bg-table_header text-white h-12">
            <tr>
              <th></th>
              <th>Nome do Contrato</th>
              <th>Código do Contrato</th>
              <th>Retenção Técnica</th>
              <th>Detalhes</th>
            </tr>
          </S.TableHead>
          <tbody>
            {contracts &&
              contracts.map((contract: ContractInterface, index: number) => (
                <tr
                  style={{
                    backgroundColor: `
										${index % 2 == 0 ? "cadetBlue" : "lightCyan"}`,
                  }}
                  key={contract.contractName}
                >
                  <td className="text-left pl-4">
                    <input
                      type="checkbox"
                      name={`contrato ${index}`}
                      id={`${index}`}
                      style={{ width: "25px", height: "25px" }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckboxArray([...checkboxArray, contract.id]);
                        } else {
                          setCheckboxArray(
                            checkboxArray.filter(
                              (contracts) => contracts !== contract.id,
                            ),
                          );
                        }
                      }}
                    />
                  </td>
                  <td>{contract.contractName}</td>
                  <td>{contract.contractCode}</td>
                  <td style={{ color: "white", textAlign: "center" }}>
                    <div style={{ backgroundColor: "blue", padding: "1rem" }}>
                      {" "}
                      {contract.technicalRetention}%
                    </div>
                  </td>
                  <td>
                    <div onClick={() => handleClick(contract.id)}>Detalhes</div>
                  </td>
                </tr>
              ))}
          </tbody>
        </S.Table>
      </S.Container>
      {viewContractError.length != 0 && (
        <span className="text-error">{viewContractError}</span>
      )}
      <S.ButtonBox>
        <S.Button1 onClick={() => navigate("/")}>Anterior</S.Button1>
        <S.Button2 onClick={() => openContract()}>Próximo</S.Button2>
      </S.ButtonBox>
    </>
  );
}
