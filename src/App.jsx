import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/home";
import Placement from "./Pages/Placement";
import Courses from "./Pages/Courses";
import CampusLife from "./Pages/CampusLife";
import Faculty from "./Pages/Faculty";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/placement" element={<Placement></Placement>} />
        <Route path="/courses" element={<Courses></Courses>} />
        <Route path="/campus-life" element={<CampusLife></CampusLife>} />
        <Route path="/faculty" element={<Faculty></Faculty>} />
        <Route path="/contact" element={<Contact></Contact>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
