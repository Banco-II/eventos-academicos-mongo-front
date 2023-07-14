import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgb(20, 30, 48), rgb(36, 59, 85));
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  padding: 15px;
  width: 380px;
  height: auto;
  border-radius: 20px;
  opacity: 0.9;
  background-color: #2c3e50;
  box-shadow: 1px 1px 1px grey 0.5;

  h1 {
    color: #fff;
    font-size: 40px;
    font-family: "Poppins", sans-serif;
    text-align: center;
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
  }

  h2 {
    margin: 10px 0;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
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
    margin: 10px auto;
    padding-left: 10px;
    outline: none;
    font-size: 16px;
  }

  button {
    margin: 20px auto;
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
