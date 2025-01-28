// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { cloudinaryConfig } from "../cloudinaryConfig";

// function StudentsPage() {
//   const [students, setStudents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newStudent, setNewStudent] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [viewStudent, setViewStudent] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
//     setStudents(storedStudents);
//   }, []);

//   const addOrUpdateStudent = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       const updatedStudents = students.map((student, index) =>
//         index === currentIndex ? newStudent : student
//       );
//       setStudents(updatedStudents);
//       localStorage.setItem("students", JSON.stringify(updatedStudents));
//     } else {
//       const updatedStudents = [...students, newStudent];
//       setStudents(updatedStudents);
//       localStorage.setItem("students", JSON.stringify(updatedStudents));
//     }
//     setShowModal(false);
//     setIsEditing(false);
//     setNewStudent({});
//   };

//   const deleteStudent = (index) => {
//     const updatedStudents = students.filter((_, i) => i !== index);
//     setStudents(updatedStudents);
//     localStorage.setItem("students", JSON.stringify(updatedStudents));
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleEdit = (index) => {
//     setNewStudent(students[index]);
//     setCurrentIndex(index);
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   const handleView = (student) => {
//     setViewStudent(student);
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/4 bg-gray-200 p-4">
//         <button
//           onClick={() => navigate("/students")}
//           className="block w-full mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Students Page
//         </button>
//         <button
//           onClick={handleLogout}
//           className="block w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//       <div className="w-3/4 p-6">
//         <button
//           onClick={() => setShowModal(true)}
//           className="mb-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
//         >
//           Add Student
//         </button>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2">ID</th>
//               <th className="border border-gray-300 p-2">Name</th>
//               <th className="border border-gray-300 p-2">Class</th>
//               <th className="border border-gray-300 p-2">Section</th>
//               <th className="border border-gray-300 p-2">Roll Number</th>
//               <th className="border border-gray-300 p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student, index) => (
//               <tr key={index}>
//                 <td className="border border-gray-300 p-2">{student.id}</td>
//                 <td className="border border-gray-300 p-2">{student.name}</td>
//                 <td className="border border-gray-300 p-2">{student.class}</td>
//                 <td className="border border-gray-300 p-2">{student.section}</td>
//                 <td className="border border-gray-300 p-2">{student.rollNumber}</td>
//                 <td className="border border-gray-300 p-2">
//                   <button
//                     className="text-blue-500 mr-2"
//                     onClick={() => handleView(student)}
//                   >
//                     View
//                   </button>
//                   <button
//                     className="text-yellow-500 mr-2"
//                     onClick={() => handleEdit(index)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="text-red-500"
//                     onClick={() => deleteStudent(index)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* {showModal && (
//           <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-1/3">
//               <h2 className="text-xl mb-4">{isEditing ? "Edit Student" : "Add Student"}</h2>
//               <form onSubmit={addOrUpdateStudent}>
//                 <input
//                   placeholder="ID"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newStudent.id || ""}
//                   onChange={(e) =>
//                     setNewStudent({
//                       ...newStudent,
//                       id: e.target.value,
//                     })
//                   }
//                 />
//                 <input
//                   placeholder="Name"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newStudent.name || ""}
//                   onChange={(e) =>
//                     setNewStudent({
//                       ...newStudent,
//                       name: e.target.value,
//                     })
//                   }
//                 />
//                 <input
//                   placeholder="Class"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newStudent.class || ""}
//                   onChange={(e) =>
//                     setNewStudent({
//                       ...newStudent,
//                       class: e.target.value,
//                     })
//                   }
//                 />
//                 <input
//                   placeholder="Section"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newStudent.section || ""}
//                   onChange={(e) =>
//                     setNewStudent({
//                       ...newStudent,
//                       section: e.target.value,
//                     })
//                   }
//                 />
//                 <input
//                   placeholder="Roll Number"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newStudent.rollNumber || ""}
//                   onChange={(e) =>
//                     setNewStudent({
//                       ...newStudent,
//                       rollNumber: e.target.value,
//                     })
//                   }
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                 >
//                   Submit
//                 </button>
//               </form>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )} */}
//         {showModal && (
//   <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white p-8 rounded-xl w-1/3 max-w-lg shadow-lg transform transition-all">
//       <h2 className="text-2xl font-semibold text-center mb-6">
//         {isEditing ? "Edit Student" : "Add Student"}
//       </h2>
//       <form onSubmit={addOrUpdateStudent}>
//         <div className="mb-4">
//           <label htmlFor="id" className="block text-sm font-medium text-gray-700">
//             ID
//           </label>
//           <input
//             id="id"
//             type="text"
//             placeholder="Enter student ID"
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={newStudent.id || ""}
//             onChange={(e) =>
//               setNewStudent({
//                 ...newStudent,
//                 id: e.target.value,
//               })
//             }
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             placeholder="Enter student name"
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={newStudent.name || ""}
//             onChange={(e) =>
//               setNewStudent({
//                 ...newStudent,
//                 name: e.target.value,
//               })
//             }
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="class" className="block text-sm font-medium text-gray-700">
//             Class
//           </label>
//           <input
//             id="class"
//             type="text"
//             placeholder="Enter student class"
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={newStudent.class || ""}
//             onChange={(e) =>
//               setNewStudent({
//                 ...newStudent,
//                 class: e.target.value,
//               })
//             }
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="section" className="block text-sm font-medium text-gray-700">
//             Section
//           </label>
//           <input
//             id="section"
//             type="text"
//             placeholder="Enter student section"
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={newStudent.section || ""}
//             onChange={(e) =>
//               setNewStudent({
//                 ...newStudent,
//                 section: e.target.value,
//               })
//             }
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
//             Roll Number
//           </label>
//           <input
//             id="rollNumber"
//             type="text"
//             placeholder="Enter student roll number"
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={newStudent.rollNumber || ""}
//             onChange={(e) =>
//               setNewStudent({
//                 ...newStudent,
//                 rollNumber: e.target.value,
//               })
//             }
//           />
//         </div>

//         <div className="flex justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors w-1/2 mr-2"
//           >
//             Submit
//           </button>
//           <button
//             onClick={() => setShowModal(false)}
//             className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors w-1/2 ml-2"
//           >
//             Close
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}



//         {/* {viewStudent && (
//           <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-1/3">
//               <h2 className="text-xl mb-4">View Student</h2>
//               <p><strong>ID:</strong> {viewStudent.id}</p>
//               <p><strong>Name:</strong> {viewStudent.name}</p>
//               <p><strong>Class:</strong> {viewStudent.class}</p>
//               <p><strong>Section:</strong> {viewStudent.section}</p>
//               <p><strong>Roll Number:</strong> {viewStudent.rollNumber}</p>
//               <button
//                 onClick={() => setViewStudent(null)}
//                 className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )} */}
//         {viewStudent && (
//   <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white p-8 rounded-xl w-1/3 max-w-lg shadow-lg transform transition-all">
//       <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
//         View Student Details
//       </h2>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold text-gray-700">ID:</span>
//           <span className="text-xl text-gray-800">{viewStudent.id}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold text-gray-700">Name:</span>
//           <span className="text-xl text-gray-800">{viewStudent.name}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold text-gray-700">Class:</span>
//           <span className="text-xl text-gray-800">{viewStudent.class}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold text-gray-700">Section:</span>
//           <span className="text-xl text-gray-800">{viewStudent.section}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold text-gray-700">Roll Number:</span>
//           <span className="text-xl text-gray-800">{viewStudent.rollNumber}</span>
//         </div>
//       </div>

//       <button
//         onClick={() => setViewStudent(null)}
//         className="mt-8 w-full bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition-colors"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}

//       </div>
//     </div>
//   );
// }

// export default StudentsPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const addOrUpdateStudent = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedStudents = students.map((student, index) =>
        index === currentIndex ? newStudent : student
      );
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    } else {
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
    setShowModal(false);
    setIsEditing(false);
    setNewStudent({});
  };

  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleEdit = (index) => {
    setNewStudent(students[index]);
    setCurrentIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleView = (student) => {
    setViewStudent(student);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-slate-200 text-white p-6 flex flex-col items-center">
        <button
          onClick={() => navigate("/students")}
          className="w-full py-3 mb-4 bg-blue-500 hover:bg-blue-400 rounded text-lg font-semibold"
        >
          Students Page
        </button>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-500 hover:bg-red-400 rounded text-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Students List</h1>
          <button
            onClick={() => setShowModal(true)}
            className="py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-400"
          >
            Add Student
          </button>
        </div>

        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Section</th>
              <th className="p-4 text-left">Roll Number</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className="even:bg-gray-100 hover:bg-gray-200 transition"
              >
                <td className="p-4">{student.id}</td>
                <td className="p-4">{student.name}</td>
                <td className="p-4">{student.class}</td>
                <td className="p-4">{student.section}</td>
                <td className="p-4">{student.rollNumber}</td>
                <td className="p-4 flex justify-center gap-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleView(student)}
                  >
                    View
                  </button>
                  <button
                    className="text-yellow-500 hover:underline"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => deleteStudent(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
              <h2 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Student" : "Add Student"}
              </h2>
              <form onSubmit={addOrUpdateStudent} className="space-y-4">
                <input
                  type="text"
                  placeholder="ID"
                  value={newStudent.id || ""}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, id: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={newStudent.name || ""}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Class"
                  value={newStudent.class || ""}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, class: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Section"
                  value={newStudent.section || ""}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, section: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={newStudent.rollNumber || ""}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, rollNumber: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewStudent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
              <h2 className="text-2xl font-bold mb-6 text-center">Student Details</h2>
              <div className="space-y-2">
                <p className="text-lg font-semibold">ID: {viewStudent.id}</p>
                <p className="text-lg font-semibold">Name: {viewStudent.name}</p>
                <p className="text-lg font-semibold">Class: {viewStudent.class}</p>
                <p className="text-lg font-semibold">Section: {viewStudent.section}</p>
                <p className="text-lg font-semibold">Roll Number: {viewStudent.rollNumber}</p>
              </div>
              <button
                onClick={() => setViewStudent(null)}
                className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentsPage;
