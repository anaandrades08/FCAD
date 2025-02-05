import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FormProvider } from "./context/FormContext.js"; // Importe o FormProvider
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import Form from "./pages/Form.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import FormResult from "./components/FormResult.js"; // Importe o CadastroResultado
import "./css/App.css";

const App = () => {
  return (
    <FormProvider>
      {" "}
      {/* Envolve o Router com o FormProvider */}
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<Form />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/result" element={<FormResult />} />{" "}
              {/* Nova rota */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FormProvider>
  );
};

export default App;
