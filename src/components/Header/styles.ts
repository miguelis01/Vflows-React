import styled from "styled-components";

export const Header = styled.header`
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 3rem;
`;

export const HeaderTitle = styled.h1`
  text-align: center;
`;
export const CompanyInfo = styled.div`
  display: grid;
  grid-template-columns: 5fr 5fr;
  flex-wrap: wrap;
  border: 1px solid red;
  border-radius: 5px;
  margin: 0.1rem;
  margin-top: 2rem;
  padding-left: 17px;
  padding-right: 17px;
`;
export const FormInfo = styled.h2`
  border: 1px solid red;
  border-radius: 5px;
  margin: 0.1rem;
  margin-top: 0.4rem;
  text-align: center;
  padding: 0.4rem;
`;
