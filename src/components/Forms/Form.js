import styled from "styled-components";

export const Form = styled.form`
  width: 22vw;
  height: 100vh;
  padding: 0 20px;
  background-image: linear-gradient(rgb(20, 30, 48), rgb(36, 59, 85));
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: #fff;
    font-size: 40px;
    font-family: "Poppins", sans-serif;
    text-align: center;
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
  }

  label {
    color: #fff;
    font-size: 20px;
    margin-top: 20px;
    font-family: "DM Sans", sans-serif;
  }

  input {
    background-color: #d9d9d9;
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin: 10px auto 20px;
    padding-left: 10px;
    outline: none;
    font-size: 16px;
  }

  button {
    margin: 40px auto;
    border-radius: 10px;
    background-color: #000000;
    border: 1px solid #fff;
    width: 100%;
    height: 60px;

    font-family: "Poppins", sans-serif;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: 0.2s all;
  }

  button:active {
    background-color: #141e30;
    transform: scale(0.98);
  }

  ::placeholder {
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

