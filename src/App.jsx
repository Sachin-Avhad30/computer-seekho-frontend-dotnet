import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import Placement from "./Pages/Placement";
import Courses from "./Pages/Courses";
import CampusLife from "./Pages/CampusLife";
import Faculty from "./Pages/Faculty";
import OPDC from "./Pages/OPDC";
import Footer from "./Components/Footer/Footer";
import ContactSection from "./Pages/ContactSection";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/campus-life" element={<CampusLife />} />
        <Route path="/pg-diploma" element={<OPDC />} />
        <Route path="/faculty" element={<Faculty></Faculty>} />
        <Route path="/contact" element={<ContactSection></ContactSection>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
