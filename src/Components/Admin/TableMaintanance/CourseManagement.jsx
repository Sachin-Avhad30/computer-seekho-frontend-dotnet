// import React, { useState, useEffect } from 'react';
// import { Search, Plus, Edit2, Trash2, X, Save, FolderOpen, Image as ImageIcon, CheckCircle } from 'lucide-react';
// import Tablemaintainanceapi from '../../../Services/Tablemaintainanceapi';
// import Pagination from './Pagination';

// // ============================================================
// // BASE PATH CONFIGURATION
// // ============================================================
// const BASE_IMAGE_PATH = 'C:\\Users\\disha\\client_computer_seekho\\src\\assets';

// const CourseManagement = () => {
//   const [courses, setCourses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [currentCourse, setCurrentCourse] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const response = await Tablemaintainanceapi.get('/courses/active');
//       console.log('Courses response:', response.data);
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       alert('Error fetching courses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAdd = () => {
//     setModalMode('add');
//     setCurrentCourse({
//       courseName: '',
//       courseDescription: '',
//       courseDuration: '',
//       courseFees: '',
//       courseFeesFrom: '',
//       courseFeesTo: '',
//       courseSyllabus: '',
//       ageGrpType: 'Adult',
//       courseIsActive: true,
//       coverPhoto: '',
//       videoId: ''
//     });
//     setShowModal(true);
//   };

//   const handleEdit = (course) => {
//     setModalMode('edit');
//     setCurrentCourse({ ...course });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this course?')) return;

//     try {
//       await Tablemaintainanceapi.delete(`/courses/${id}`);
//       fetchCourses();
//       alert('Course deleted successfully');
//     } catch (error) {
//       console.error('Error deleting course:', error);
//       alert('Error deleting course');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       console.log('=== SAVING COURSE ===');
//       console.log('Cover photo path:', currentCourse.coverPhoto);
      
//       if (modalMode === 'add') {
//         await Tablemaintainanceapi.post('/courses', currentCourse);
//         alert('Course created successfully');
//       } else {
//         await Tablemaintainanceapi.put(`/courses/${currentCourse.courseId}`, currentCourse);
//         alert('Course updated successfully');
//       }
//       fetchCourses();
//       setShowModal(false);
//       setCurrentCourse(null);
//     } catch (error) {
//       console.error('Error saving course:', error);
//       alert('Error saving course: ' + error.message);
//     }
//   };

//   const filteredCourses = courses.filter(course =>
//     course.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search courses..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           onClick={handleAdd}
//           className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Plus className="w-5 h-5" />
//           Add Course
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center py-12">
//           <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : currentCourses.length === 0 ? (
//         <p className="text-center py-8 text-gray-500">No courses found</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age Group</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentCourses.map((course) => (
//                   <tr key={course.courseId} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {course.courseName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {course.courseDuration} months
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       ₹{course.courseFees}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {course.ageGrpType}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         course.courseIsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                       }`}>
//                         {course.courseIsActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <div className="flex gap-2">
//                         <button onClick={() => handleEdit(course)} className="text-blue-600 hover:text-blue-800 transition-colors">
//                           <Edit2 className="w-5 h-5" />
//                         </button>
//                         <button onClick={() => handleDelete(course.courseId)} className="text-red-600 hover:text-red-800 transition-colors">
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredCourses.length > 0 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//               itemsPerPage={itemsPerPage}
//               totalItems={filteredCourses.length}
//             />
//           )}
//         </>
//       )}

//       {showModal && (
//         <CourseModal
//           mode={modalMode}
//           course={currentCourse}
//           setCourse={setCurrentCourse}
//           onSave={handleSave}
//           onClose={() => {
//             setShowModal(false);
//             setCurrentCourse(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// // ============================================================
// // UPDATED: Course Image Path Selector with BASE PATH
// // ============================================================
// const CourseImagePathSelector = ({ currentPath, onPathSelected }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePath, setImagePath] = useState(currentPath || '');

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
    
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       alert('Please select an image file');
//       return;
//     }

//     setSelectedFile(file);
    
//     // UPDATED: Append filename to base path
//     const fileName = file.name;
//     const fullPath = `${BASE_IMAGE_PATH}\\${fileName}`;
//     setImagePath(fullPath);
//     onPathSelected(fullPath);
    
//     console.log('File selected:', fileName);
//     console.log('Full path set to:', fullPath);
//   };

//   const handlePathChange = (e) => {
//     const newPath = e.target.value;
//     setImagePath(newPath);
//     onPathSelected(newPath);
//   };

//   return (
//     <div className="space-y-4">
//       {/* File Browser */}
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileSelect}
//           className="hidden"
//           id="course-image-select"
//         />
//         <label
//           htmlFor="course-image-select"
//           className="cursor-pointer flex flex-col items-center gap-2"
//         >
//           <FolderOpen className="w-12 h-12 text-gray-400" />
//           <div className="text-sm text-gray-600">
//             <span className="text-blue-600 font-medium">Click to browse</span> for cover image
//           </div>
//           <p className="text-xs text-gray-500">Image will be saved to: {BASE_IMAGE_PATH}</p>
//         </label>
//       </div>

//       {/* Show selected file info */}
//       {selectedFile && (
//         <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//           <div className="flex items-start gap-3">
//             <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//             <div className="flex-1">
//               <p className="text-sm font-medium text-green-800">File Selected</p>
//               <p className="text-xs text-green-700 mt-1">
//                 <strong>Name:</strong> {selectedFile.name}
//               </p>
//               <p className="text-xs text-green-700">
//                 <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Manual path input */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Cover Photo Path (Auto-generated with base path)
//         </label>
//         <input
//           type="text"
//           value={imagePath}
//           onChange={handlePathChange}
//           placeholder="Path will be auto-generated..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
//         />
//         <p className="text-xs text-gray-500 mt-1">
//           Base path: <code className="bg-gray-100 px-1 rounded">{BASE_IMAGE_PATH}</code>
//         </p>
//       </div>

//       {/* Preview current image if path exists */}
//       {imagePath && (
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">Preview</label>
//           <img
//             src={imagePath}
//             alt="Preview"
//             className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
//             onError={(e) => {
//               e.target.style.display = 'none';
//               e.target.nextElementSibling.style.display = 'block';
//             }}
//           />
//           <div style={{ display: 'none' }} className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-200">
//             <span className="text-xs text-gray-400">Preview not available</span>
//           </div>
//         </div>
//       )}

//       {/* Info Message */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//         <div className="flex gap-2">
//           <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//           <div className="text-sm text-blue-800">
//             <p className="font-medium">How it works:</p>
//             <ul className="mt-1 space-y-1 text-xs">
//               <li>• Select an image file from anywhere on your computer</li>
//               <li>• The full path will be automatically created using the base path</li>
//               <li>• Base path: <code className="bg-blue-100 px-1 rounded text-[10px]">{BASE_IMAGE_PATH}</code></li>
//               <li>• You can manually edit the path if needed</li>
//               <li>• <strong>No file upload</strong> - only the path is saved</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Course Modal Component
// const CourseModal = ({ mode, course, setCourse, onSave, onClose }) => {
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCourse(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handlePathSelected = (path) => {
//     console.log('Cover photo path selected:', path);
//     setCourse(prev => ({
//       ...prev,
//       coverPhoto: path
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//       <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto my-8">
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
//           <h2 className="text-xl font-bold text-gray-900">
//             {mode === 'add' ? 'Add New Course' : 'Edit Course'}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Basic Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
//               <input
//                 type="text"
//                 name="courseName"
//                 value={course.courseName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 name="courseDescription"
//                 value={course.courseDescription}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
//                 <input
//                   type="number"
//                   name="courseDuration"
//                   value={course.courseDuration}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Course Fees *</label>
//                 <input
//                   type="number"
//                   name="courseFees"
//                   value={course.courseFees}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   step="0.01"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Fees Valid From</label>
//                 <input
//                   type="date"
//                   name="courseFeesFrom"
//                   value={course.courseFeesFrom}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Fees Valid To</label>
//                 <input
//                   type="date"
//                   name="courseFeesTo"
//                   value={course.courseFeesTo}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus</label>
//               <textarea
//                 name="courseSyllabus"
//                 value={course.courseSyllabus}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Age Group Type</label>
//               <select
//                 name="ageGrpType"
//                 value={course.ageGrpType}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="Adult">Adult</option>
//                 <option value="Kids">Kids</option>
//                 <option value="All Ages">All Ages</option>
//               </select>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="courseIsActive"
//                 checked={course.courseIsActive}
//                 onChange={handleChange}
//                 className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//               />
//               <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
//             </div>
//           </div>

//           {/* Cover Photo Path Selection */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Cover Photo Path</h3>
//             <CourseImagePathSelector 
//               currentPath={course.coverPhoto}
//               onPathSelected={handlePathSelected}
//             />
//           </div>
//         </div>

//         <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Save className="w-5 h-5" />
//             Save Course
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseManagement;

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Save, FolderOpen, Image as ImageIcon, CheckCircle, Upload } from 'lucide-react';
import Tablemaintainanceapi from '../../../Services/Tablemaintainanceapi';
import fileService from '../../../Services/fileService';
import Pagination from './Pagination';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await Tablemaintainanceapi.get('/courses/active');
      console.log('Courses response:', response.data);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Error fetching courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setModalMode('add');
    setCurrentCourse({
      courseName: '',
      courseDescription: '',
      courseDuration: '',
      courseFees: '',
      courseFeesFrom: '',
      courseFeesTo: '',
      courseSyllabus: '',
      ageGrpType: 'Adult',
      courseIsActive: true,
      coverPhoto: '',
      videoId: ''
    });
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setModalMode('edit');
    setCurrentCourse({ ...course });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await Tablemaintainanceapi.delete(`/courses/${id}`);
      fetchCourses();
      alert('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course');
    }
  };

  const handleSave = async () => {
    try {
      console.log('=== SAVING COURSE ===');
      console.log('Cover photo path:', currentCourse.coverPhoto);

      const courseData = {
        ...currentCourse,
        coverPhoto: currentCourse.coverPhoto || null
      };

      if (modalMode === 'add') {
        await Tablemaintainanceapi.post('/courses', courseData);
        alert('Course created successfully');
      } else {
        await Tablemaintainanceapi.put(`/courses/${currentCourse.courseId}`, courseData);
        alert('Course updated successfully');
      }
      fetchCourses();
      setShowModal(false);
      setCurrentCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course: ' + error.message);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Course
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : currentCourses.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No courses found</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCourses.map((course) => (
                  <tr key={course.courseId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {course.courseDuration} months
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ₹{course.courseFees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {course.ageGrpType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.courseIsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {course.courseIsActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(course)} className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(course.courseId)} className="text-red-600 hover:text-red-800 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCourses.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredCourses.length}
            />
          )}
        </>
      )}

      {showModal && (
        <CourseModal
          mode={modalMode}
          course={currentCourse}
          setCourse={setCurrentCourse}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setCurrentCourse(null);
          }}
        />
      )}
    </div>
  );
};

// ============================================================
// UPDATED: Course Image Path Selector with Real File Upload
// ============================================================
const CourseImagePathSelector = ({ currentPath, onPathSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const response = await fileService.uploadImage(file);
      console.log('Upload successful:', response);

      const fullPath = response.imagePath;
      onPathSelected(fullPath);
      setUploadSuccess('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* File Browser */}
      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isUploading ? 'bg-gray-50 border-gray-300' : 'border-gray-300 hover:border-blue-400'
        }`}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="course-image-select"
          disabled={isUploading}
        />
        <label
          htmlFor="course-image-select"
          className={`cursor-pointer flex flex-col items-center gap-2 ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isUploading ? (
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FolderOpen className="w-12 h-12 text-gray-400" />
          )}
          <div className="text-sm text-gray-600">
            {isUploading ? (
              <span className="font-medium text-blue-600">Uploading...</span>
            ) : (
              <>
                <span className="text-blue-600 font-medium">Click to upload</span> cover photo
              </>
            )}
          </div>
        </label>
      </div>

      {/* Messages */}
      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
      {uploadSuccess && <p className="text-sm text-green-600">{uploadSuccess}</p>}

      {/* Show selected file info & Preview */}
      {(selectedFile || currentPath) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 h-16 bg-white rounded border border-gray-200 overflow-hidden">
              {currentPath ? (
                <img
                  src={currentPath}
                  alt="Cover Photo"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
                />
              ) : (
                <ImageIcon className="w-full h-full text-gray-300 p-2" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Current Cover Photo</p>
              <p className="text-xs text-gray-500 mt-1 break-all">
                {currentPath || 'No photo uploaded'}
              </p>
              {selectedFile && (
                <p className="text-xs text-green-600 mt-1">
                  New file selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Course Modal Component
const CourseModal = ({ mode, course, setCourse, onSave, onClose }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePathSelected = (path) => {
    console.log('Cover photo path selected:', path);
    setCourse(prev => ({
      ...prev,
      coverPhoto: path
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto my-8">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'add' ? 'Add New Course' : 'Edit Course'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
              <input
                type="text"
                name="courseName"
                value={course.courseName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="courseDescription"
                value={course.courseDescription}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                <input
                  type="number"
                  name="courseDuration"
                  value={course.courseDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Fees *</label>
                <input
                  type="number"
                  name="courseFees"
                  value={course.courseFees}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fees Valid From</label>
                <input
                  type="date"
                  name="courseFeesFrom"
                  value={course.courseFeesFrom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fees Valid To</label>
                <input
                  type="date"
                  name="courseFeesTo"
                  value={course.courseFeesTo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus</label>
              <textarea
                name="courseSyllabus"
                value={course.courseSyllabus}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Group Type</label>
              <select
                name="ageGrpType"
                value={course.ageGrpType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Adult">Adult</option>
                <option value="Kids">Kids</option>
                <option value="All Ages">All Ages</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="courseIsActive"
                checked={course.courseIsActive}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
            </div>
          </div>

          {/* Cover Photo Path Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Cover Photo Path</h3>
            <CourseImagePathSelector
              currentPath={course.coverPhoto}
              onPathSelected={handlePathSelected}
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;