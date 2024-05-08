import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginSignUp from "./pages/LoginSignUp.jsx";
import ShopCategory from "./pages/ShopCategory.jsx";
import { AuthProvider } from "./context/authContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mac" element={<ShopCategory />} />
          <Route path="/ipad" element={<ShopCategory category="ipad" />} />
          <Route path="/iphone" element={<ShopCategory category="iphone" />} />
          <Route path="/watch" element={<ShopCategory category="watch" />} />
          <Route
            path="/airpods"
            element={<ShopCategory category="airpods" />}
          />
          <Route
            path="/accessories"
            element={<ShopCategory category="accessories" />}
          />
          <Route path="/promo" element={<ShopCategory category="promo" />} />
          <Route path="/signUp" element={<LoginSignUp />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
