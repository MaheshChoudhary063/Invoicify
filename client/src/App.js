// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
// import Container from "react-bootstrap/Container";
// import EditInvoiceComponent from "./components/Invoice/EditInvoice";
// import InvoiceForm from "./components/Invoice/InvoiceForm";
// import Error from "./components/Error/Error";
// import Signup from "./components/Login/Signup";
// import Login from './components/Login/Login';
// import Header from './components/Header/Header'
// import Navbar from './components/Navbar/Navbar';
// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="App d-flex flex-column align-items-center w-100">
//         <Container>
//           <Navbar/>
//           <Routes>
//             <Route path="/" element={<Header />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/create-invoice" element={<InvoiceForm />} />
//             <Route
//               path="/edit-invoice/:id"
//               element={<EditInvoiceComponent />}
//             />
//             <Route path="*" element={<Error />} />
//           </Routes>
//         </Container>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import EditInvoiceComponent from "./components/Invoice/EditInvoice";
import InvoiceForm from "./components/Invoice/InvoiceForm";
import Error from "./components/Error/Error";
import Signup from "./components/Login/Signup";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/About/AboutUs";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={ <AboutUs/>}/>
          <Route
            path="/login"
            element={<Login setLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={Home} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/create-invoice"
            element={
              <ProtectedRoute element={InvoiceForm} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/edit-invoice/:id"
            element={
              <ProtectedRoute
                element={EditInvoiceComponent}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
