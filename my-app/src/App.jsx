import "./App.css";
import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "@/pages/Home";
import Analysis from "@/pages/Analysis";
import Login from "@/pages/Login";
import Faq from "./pages/Faq";

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <AppContext.Provider
        value={{ user, setUser, token, setToken, isAuth, setIsAuth }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/analysis"
              element={isAuth ? <Analysis /> : <Navigate to="/" />}
            />
            <Route
              path="/faq"
              element={isAuth ? <Faq /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
