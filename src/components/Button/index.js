import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Button(props) {
  const navigate = useNavigate();

  return (
    <ButtonStyled name="Voltar" onClick={() => navigate("/")}>
      Voltar
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  display: ${(props) => (props.clicked ? "none" : "")};
  margin: 40px auto;
  border-radius: 10px;
  background-color: #000000;
  border: 1px solid #fff;
  width: 100px;
  height: 60px;
  position: absolute;
  left: 10px;

  font-family: "Poppins", sans-serif;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: 0.2s all;
`;
