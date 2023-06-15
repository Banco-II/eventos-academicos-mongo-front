import { Routes, BrowserRouter, Route } from "react-router-dom";
import GlobalStyle from "./styles/global-styles";
import HomePage from "./pages/Home";
import LocationsPage from "./pages/Locations";
import EventsPage from "./pages/Event";
import UpdatePage from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/update" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
