import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chats from "./Pages/Chats";
import Post from "./Pages/Post";
import Loggedin from "./Pages/Loggedin";

function LayoutWrapper({children}){
  const location = useLocation();
  const noHeaderRoutes = ["/login", "/chats", "/post", "/loggedin", "/register"];

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
      <Route path="/chats" exact={true} element={<Chats />} />
      <Route path="/post" exact={true} element={<Post />} />
      <Route path="/loggedin" exact={true} element={<Loggedin />} />
      <Route path="/register" exact={true} element={<Register />} />
    </Routes>
    </LayoutWrapper>
    </BrowserRouter>
  );    
}
