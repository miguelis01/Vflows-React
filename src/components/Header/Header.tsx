import * as S from "./styles";

interface HeaderProps {
  title: string;
  socialReason: string;
  fantasyName: string;
  cnpj: string;
}

export default function Header({
  title,
  socialReason,
  fantasyName,
  cnpj,
}: HeaderProps) {
  return (
    <S.Header>
      <S.Top>
        <img
          src="/logo.png"
          alt="Logo da VFlow"
          style={{ paddingLeft: "2rem", width: "5.4rem", height: "3.4rem" }}
          className="xl:w-52 lg:w-40 sm:w-32 w-24 lg:mt-4 md:ml-8 ml-2"
        />
        <S.HeaderTitle>Pagamento de Fornecedor</S.HeaderTitle>
      </S.Top>

      <S.CompanyInfo>
        <div>
          <p>
            <b>Razão Social</b>: {socialReason}{" "}
          </p>
          <p>
            <b>Nome Fantasia</b>: {fantasyName}
          </p>
        </div>
        <div>
          <p style={{ textAlign: "right" }}>
            <b>CNPJ</b>: {cnpj}
          </p>
        </div>
      </S.CompanyInfo>
      <S.FormInfo>{title}</S.FormInfo>
    </S.Header>
  );
}
