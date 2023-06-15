import { Routes, BrowserRouter, Route } from "react-router-dom";
import GlobalStyle from "./styles/global-styles";
import HomePage from "./pages/Home";
import LocationsPage from "./pages/Locations";
import EventsPage from "./pages/Event";
import SearchLocation from "./pages/SearchLocation";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/events" element={<EventsPage/>}/>
        <Route path="/search-location" element={<SearchLocation/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
