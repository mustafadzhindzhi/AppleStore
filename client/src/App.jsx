import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navitation from "./components/Navigation/Navitation.tsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navitation />
        <Routes>
          <Route path="/" element={< Home/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
