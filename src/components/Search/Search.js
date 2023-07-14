import { Pointer, SearchCheck } from "lucide-react";
import styled from "styled-components";

const Search = ({ search, setSearch, content, setContent }) => {
  return (
    <Navi>
      {/* <h2>Pesquisar:</h2> */}
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Digite para pesquisar eventos"
      />
      <SearchCheck
        color="black"
        size={40}
        onClick={() => setContent(!content)}
      />
    </Navi>
  );
};

export default Search;

const Navi = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;

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
`;
