import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navitation from "./components/Navigation/Navitation.tsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navitation />
        <Routes>
          <Route path="/" element={< Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
