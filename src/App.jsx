import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import Placement from "./Pages/Placement";
import Courses from "./Pages/Courses";
import CampusLife from "./Pages/CampusLife";
import Faculty from "./Pages/Faculty";
import Contact from "./Pages/Contact";
import OPDC from "./Pages/OPDC"; // ✅ ADD THIS
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/campus-life" element={<CampusLife />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pg-diploma" element={<OPDC />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
