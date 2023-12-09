// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "./Test.css";

// function LoginTest() {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const generateError = (err) =>
//     toast.error(err, {
//       position: "top-right",
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         {
//           ...values,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       if (data) {
//         if (data.errors) {
//           const { email, password } = data.errors;
//           if (email) generateError(email);
//           else if (password) generateError(password);
//         } else {
//           navigate("/secret-test");
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="container">
//       <h2>Login Account</h2>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={(e) =>
//               setValues({ ...values, [e.target.name]: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={(e) =>
//               setValues({ ...values, [e.target.name]: e.target.value })
//             }
//           />
//         </div>
//         <button type="submit">Submit</button>
//         <span>
//           Already have an account? <Link to="/reg-test">Register</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }

// export default LoginTest;
