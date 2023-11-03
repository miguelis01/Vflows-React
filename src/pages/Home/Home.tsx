import Form from "../../components/HomeForm/HomeForm";
import * as S from "./styles";

const Home = () => {
  return (
    <>
      <S.Container>
        <S.Section>
          <img
            src="/logo.png"
            alt="logo"
            style={{
              paddingLeft: "2rem",
              objectFit: "scale-down",
              width: "50%",
              height: "6rem",
            }}
          />
          <h2>Pagamento de Fornecedor</h2>
          <Form />
        </S.Section>
      </S.Container>
    </>
  );
};

export default Home;
