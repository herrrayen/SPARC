import { Route, Routes } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import RegistrationPopup from "./components/RegistrationPopup";
import Home from "./pages/Home";
import Program from "./pages/Program";
import Speakers from "./pages/Speakers";
import Awards from "./pages/Awards";
import Venue from "./pages/Venue";
import Outreach from "./pages/Outreach";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="site-bg">
      <div className="pattern-overlay" aria-hidden="true" />
      <SiteHeader />
      <main className="page-shell">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/program" element={<Program />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
      <RegistrationPopup />
      <SiteFooter />
    </div>
  );
}

export default App;
