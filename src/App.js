import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import "./App.css";

export default function App(){
  return(
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" exact={true} element={<Home />} />
    </Routes>
    </BrowserRouter>
  );
}