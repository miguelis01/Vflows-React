import * as S from "./styles";

export default function Footer() {
  return (
    <S.Footer>
      <img
        src="/logo.png"
        alt="Logo da VFlows"
        style={{ paddingLeft: "2rem", width: "5.4rem", height: "3.4rem" }}
        className="lg:w-40 sm:w-32 w-24 sm:block hidden"
      />
      <S.Text>© 20202022 - Construindo Patrimonios</S.Text>
    </S.Footer>
  );
}
