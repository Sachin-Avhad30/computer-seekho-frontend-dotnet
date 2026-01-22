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
import MoreRecruiters from "./Pages/MoreRecruiters";
import CoursesDetails from "./Pages/CoursesDetails";
import BatchWisePlacement from "./Components/BatchWisePlacement/BatchWisePlacement";

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
        <Route path="/more-recruiters" element={<MoreRecruiters />} />
        <Route path="/courses/:slug" element={<CoursesDetails />} />
        <Route
          path="/placement/batch-wise"
          element={<BatchWisePlacement></BatchWisePlacement>}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
