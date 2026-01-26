// import React, { useState, useEffect } from 'react';
// import { Search, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
// import Tablemaintainanceapi from '../../../Services/Tablemaintainanceapi';

// const BatchManagement = () => {
//   const [batches, setBatches] = useState([]);
//   const [activeCourses, setActiveCourses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [currentBatch, setCurrentBatch] = useState(null);

//   useEffect(() => {
//     fetchBatches();
//     fetchActiveCourses();
//   }, []);

//   const fetchBatches = async () => {
//     setLoading(true);
//     try {
//       const response = await Tablemaintainanceapi.get('/batches');
//       console.log('Batches response:', response.data);
//       setBatches(response.data);
//     } catch (error) {
//       console.error('Error fetching batches:', error);
//       alert('Error fetching batches: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchActiveCourses = async () => {
//     try {
//       const response = await Tablemaintainanceapi.get('/courses/active');
//       console.log('Active courses response:', response.data);
//       setActiveCourses(response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   const handleAdd = () => {
//     setModalMode('add');
//     setCurrentBatch({
//       batch_name: '',
//       batch_start_time: '',
//       batch_end_time: '',
//       course_id: '',
//       presentation_date: '',
//       final_presentation_date: '',
//       course_fees: '',
//       course_fees_from: '',
//       course_fees_to: '',
//       batch_is_active: true,
//       batch_logo_url: ''
//     });
//     setShowModal(true);
//   };

//   const handleEdit = (batch) => {
//     setModalMode('edit');
//     setCurrentBatch({ ...batch });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this batch?')) return;

//     try {
//       await Tablemaintainanceapi.delete(`/batches/${id}`);
//       fetchBatches();
//       alert('Batch deleted successfully');
//     } catch (error) {
//       console.error('Error deleting batch:', error);
//       alert('Error deleting batch');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (modalMode === 'add') {
//         await Tablemaintainanceapi.post('/batches', currentBatch);
//         alert('Batch created successfully');
//       } else {
//         await Tablemaintainanceapi.put(`/batches/${currentBatch.batch_id}`, currentBatch);
//         alert('Batch updated successfully');
//       }
//       fetchBatches();
//       setShowModal(false);
//       setCurrentBatch(null);
//     } catch (error) {
//       console.error('Error saving batch:', error);
//       alert('Error saving batch: ' + error.message);
//     }
//   };

//   const filteredBatches = batches.filter(batch =>
//     batch.batch_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       {/* Search and Add */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search batches..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           onClick={handleAdd}
//           className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//         >
//           <Plus className="w-5 h-5" />
//           Add Batch
//         </button>
//       </div>

//       {/* Table */}
//       {loading ? (
//         <div className="text-center py-12">
//           <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : filteredBatches.length === 0 ? (
//         <p className="text-center py-8 text-gray-500">No batches found</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fees</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredBatches.map((batch) => (
//                 <tr key={batch.batch_id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {batch.batch_name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {batch.course_name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {batch.batch_start_time} - {batch.batch_end_time}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     ₹{batch.course_fees}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       batch.batch_is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                       {batch.batch_is_active ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <div className="flex gap-2">
//                       <button onClick={() => handleEdit(batch)} className="text-blue-600 hover:text-blue-800">
//                         <Edit2 className="w-5 h-5" />
//                       </button>
//                       <button onClick={() => handleDelete(batch.batch_id)} className="text-red-600 hover:text-red-800">
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <BatchModal
//           mode={modalMode}
//           batch={currentBatch}
//           setBatch={setCurrentBatch}
//           activeCourses={activeCourses}
//           onSave={handleSave}
//           onClose={() => {
//             setShowModal(false);
//             setCurrentBatch(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// // Batch Modal Component
// const BatchModal = ({ mode, batch, setBatch, activeCourses, onSave, onClose }) => {
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setBatch(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-900">
//             {mode === 'add' ? 'Add New Batch' : 'Edit Batch'}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Batch Name *</label>
//             <input
//               type="text"
//               name="batch_name"
//               value={batch.batch_name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
//               <input
//                 type="time"
//                 name="batch_start_time"
//                 value={batch.batch_start_time}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
//               <input
//                 type="time"
//                 name="batch_end_time"
//                 value={batch.batch_end_time}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
//             <select
//               name="course_id"
//               value={batch.course_id}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Course</option>
//               {activeCourses.map(course => (
//                 <option key={course.course_id} value={course.course_id}>
//                   {course.course_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Course Fees</label>
//             <input
//               type="number"
//               name="course_fees"
//               value={batch.course_fees}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               step="0.01"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Fees Valid From</label>
//               <input
//                 type="date"
//                 name="course_fees_from"
//                 value={batch.course_fees_from}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Fees Valid To</label>
//               <input
//                 type="date"
//                 name="course_fees_to"
//                 value={batch.course_fees_to}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Presentation Date</label>
//               <input
//                 type="datetime-local"
//                 name="presentation_date"
//                 value={batch.presentation_date?.replace(' ', 'T')}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Final Presentation Date</label>
//               <input
//                 type="datetime-local"
//                 name="final_presentation_date"
//                 value={batch.final_presentation_date?.replace(' ', 'T')}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Batch Logo URL</label>
//             <input
//               type="text"
//               name="batch_logo_url"
//               value={batch.batch_logo_url}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="batch_is_active"
//               checked={batch.batch_is_active}
//               onChange={handleChange}
//               className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//             />
//             <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
//           </div>
//         </div>

//         <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Save className="w-5 h-5" />
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BatchManagement;

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import Tablemaintainanceapi from '../../../Services/Tablemaintainanceapi';
import Pagination from './Pagination';

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [activeCourses, setActiveCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchBatches();
    fetchActiveCourses();
  }, []);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await Tablemaintainanceapi.get('/batches');
      console.log('Batches response:', response.data);
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
      alert('Error fetching batches: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveCourses = async () => {
  try {
    const response = await Tablemaintainanceapi.get('/courses/active');
    console.log('Active courses response:', response.data);
    console.log('Number of courses:', response.data.length);
    
    // Check if response.data is an array
    if (Array.isArray(response.data)) {
      setActiveCourses(response.data);
    } else {
      console.error('Courses data is not an array:', response.data);
      setActiveCourses([]);
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    console.error('Error details:', error.response?.data);
    alert('Error fetching courses: ' + (error.response?.data?.message || error.message));
  }
};

  const handleAdd = () => {
    setModalMode('add');
    setCurrentBatch({
      batch_name: '',
      batch_start_time: '',
      batch_end_time: '',
      course_id: '',
      presentation_date: '',
      final_presentation_date: '',
      course_fees: '',
      course_fees_from: '',
      course_fees_to: '',
      batch_is_active: true,
      batch_logo_url: ''
    });
    setShowModal(true);
  };

  const handleEdit = (batch) => {
    setModalMode('edit');
    setCurrentBatch({ ...batch });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this batch?')) return;

    try {
      await Tablemaintainanceapi.delete(`/batches/${id}`);
      fetchBatches();
      alert('Batch deleted successfully');
    } catch (error) {
      console.error('Error deleting batch:', error);
      alert('Error deleting batch');
    }
  };

  const handleSave = async () => {
    try {
      if (modalMode === 'add') {
        await Tablemaintainanceapi.post('/batches', currentBatch);
        alert('Batch created successfully');
      } else {
        await Tablemaintainanceapi.put(`/batches/${currentBatch.batch_id}`, currentBatch);
        alert('Batch updated successfully');
      }
      fetchBatches();
      setShowModal(false);
      setCurrentBatch(null);
    } catch (error) {
      console.error('Error saving batch:', error);
      alert('Error saving batch: ' + error.message);
    }
  };

  const filteredBatches = batches.filter(batch =>
    batch.batch_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBatches = filteredBatches.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Search and Add */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search batches..."
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
          Add Batch
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : currentBatches.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No batches found</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBatches.map((batch) => (
                  <tr key={batch.batch_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {batch.batch_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {batch.course_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {batch.batch_start_time} - {batch.batch_end_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ₹{batch.course_fees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        batch.batch_is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {batch.batch_is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(batch)} className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(batch.batch_id)} className="text-red-600 hover:text-red-800 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredBatches.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredBatches.length}
            />
          )}
        </>
      )}

      {/* Modal */}
      {showModal && (
        <BatchModal
          mode={modalMode}
          batch={currentBatch}
          setBatch={setCurrentBatch}
          activeCourses={activeCourses}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setCurrentBatch(null);
          }}
        />
      )}
    </div>
  );
};

// Batch Modal Component
const BatchModal = ({ mode, batch, setBatch, activeCourses, onSave, onClose }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBatch(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'add' ? 'Add New Batch' : 'Edit Batch'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch Name *</label>
            <input
              type="text"
              name="batch_name"
              value={batch.batch_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                name="batch_start_time"
                value={batch.batch_start_time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                name="batch_end_time"
                value={batch.batch_end_time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
  <select
    name="course_id"
    value={batch.course_id}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select Course</option>
    {activeCourses.map(course => (
      <option key={course.courseId} value={course.courseId}>
        {course.courseName}
      </option>
    ))}
  </select>
</div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Fees</label>
            <input
              type="number"
              name="course_fees"
              value={batch.course_fees}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fees Valid From</label>
              <input
                type="date"
                name="course_fees_from"
                value={batch.course_fees_from}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fees Valid To</label>
              <input
                type="date"
                name="course_fees_to"
                value={batch.course_fees_to}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Presentation Date</label>
              <input
                type="datetime-local"
                name="presentation_date"
                value={batch.presentation_date?.replace(' ', 'T')}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Final Presentation Date</label>
              <input
                type="datetime-local"
                name="final_presentation_date"
                value={batch.final_presentation_date?.replace(' ', 'T')}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch Logo URL</label>
            <input
              type="text"
              name="batch_logo_url"
              value={batch.batch_logo_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="batch_is_active"
              checked={batch.batch_is_active}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchManagement;