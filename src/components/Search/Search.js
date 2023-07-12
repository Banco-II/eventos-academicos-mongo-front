const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
        <h2>Pesquisar:</h2>
        <input 
            type="search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Digite para pesquisar evento"
        />
    </div>
  )
}

export default Search