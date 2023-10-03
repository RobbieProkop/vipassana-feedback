import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const App = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const closeNav = () => {
    if (navOpen) setNavOpen(false);
  };

  console.log("navOpen :>> ", navOpen);
  return (
    <>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <main onClick={closeNav}>
        <Outlet />
        <ToastContainer />
      </main>
      <Footer navOpen={navOpen} setNavOpen={setNavOpen} />
    </>
  );
};

export default App;
