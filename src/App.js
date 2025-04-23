import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import "./App.css";
import Login from "./Pages/Login";

function LayoutWrapper({children}){
  const location = useLocation();
  const noHeaderRoutes = ["/login"];

  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return(
    <>
    {showHeader && <Header />} 
    {children}
    </>
  );
}

export default function App(){
  return(
    <BrowserRouter>
    <LayoutWrapper>
    <Routes>
      <Route path="/" exact={true} element={<Home />} />
      <Route path="/login" exact={true} element={<Login />} />
    </Routes>
    </LayoutWrapper>
    </BrowserRouter>
  );
}
