// import React from 'react';
// import { Users } from 'lucide-react';
// import RegisteredStudentCard from './RegisteredStudentCard';

// const RegisteredStudentList = ({ students, loading, onRefresh }) => {
//   if (loading) {
//     return null;
//   }

//   if (students.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow p-12 text-center">
//         <Users size={48} className="mx-auto text-gray-400 mb-4" />
//         <h3 className="text-xl font-semibold text-gray-700 mb-2">No Registered Students Found</h3>
//         <p className="text-gray-500">No students match your search criteria.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {/* <div className="bg-white rounded-lg shadow p-4">
//           <div className="text-sm text-gray-600">Total Students</div>
//           <div className="text-2xl font-bold text-purple-600">{students.length}</div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="text-sm text-gray-600">Total Fees Collected</div>
//           <div className="text-2xl font-bold text-green-600">
//             ₹{students.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0).toFixed(2)}
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="text-sm text-gray-600">Receipts Generated</div>
//           <div className="text-2xl font-bold text-blue-600">
//             {students.filter(s => s.receiptId).length}
//           </div>
//         </div> */}
//       </div>

//       {/* Student Cards */}
//       <div className="grid gap-4">
//         {students.map((student) => (
//           <RegisteredStudentCard
//             key={student.studentId}
//             student={student}
//             onRefresh={onRefresh}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RegisteredStudentList;

import React from "react";
import RegisteredStudentCard from "./RegisteredStudentCard";

const RegisteredStudentList = ({ students, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600 text-lg">No registered students found</p>
        <p className="text-gray-500 text-sm mt-2">
          Students will appear here once they are registered
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Pass the entire students array - RegisteredStudentCard handles pagination internally */}
      <RegisteredStudentCard students={students} onRefresh={onRefresh} />
    </div>
  );
};

export default RegisteredStudentList;
