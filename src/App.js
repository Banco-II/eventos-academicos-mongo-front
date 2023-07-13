import { Routes, BrowserRouter, Route } from "react-router-dom";
import GlobalStyle from "./styles/global-styles";
import HomePage from "./pages/Home";
import LocationsPage from "./pages/Locations";
// import EventsPage from "./pages/Event";
import UpdatePage from "./pages/Update";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
// import SearchLocations from "./pages/SearchLocations";

function App() {
  injectStyle();
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/locations" element={<LocationsPage />} />
          {/* <Route path="/events" element={<EventsPage />} /> */}
          <Route path="/update" element={<UpdatePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
