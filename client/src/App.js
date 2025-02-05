import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FormProvider } from "./context/FormContext"; // Importe o FormProvider
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Form from "./pages/Form";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FormResult from "./components/FormResult"; // Importe o CadastroResultado
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
