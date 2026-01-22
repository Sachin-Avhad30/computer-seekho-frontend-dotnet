import { Routes, Route, Navigate } from "react-router-dom";
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
import PublicLayout from "./Components/Layout/PublicLayout";
import Login from "./Components/Admin/Login";
import ProtectedRoute from "./Components/Admin/ProtectedRoute";
import AdminLayout from "./Components/Admin/AdminLayout";
import FollowUp from "./Components/Admin/FollowUp ";
import AddEnquiry from "./Components/Admin/AddEnquiry";
import StudentRegistration from "./Components/Admin/StudentRegistration";
import TableMaintenance from "./Components/Admin/TableMaintenance";
import ExcelUpload from "./Components/Admin/ExcelUpload";
import Signup from "./Components/Admin/Signup";

function App() {
  return (
    <>
      {/* <Header />
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
      <Footer /> */}

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/pg-diploma" element={<OPDC />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route
            path="/placement/batch-wise"
            element={<BatchWisePlacement />}
          />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="follow-up" replace />} />
          <Route path="follow-up" element={<FollowUp />} />
          <Route path="enquiry/add" element={<AddEnquiry />} />
          <Route
            path="student-registration"
            element={<StudentRegistration />}
          />
          <Route path="table-maintenance" element={<TableMaintenance />} />
          <Route path="excel-upload" element={<ExcelUpload />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
