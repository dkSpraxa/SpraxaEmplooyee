import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginParent } from "./components/Login";
import { RegisterParent } from "./components/Register";
import ProtectRoute from "./ProtectedRoutes";
import User from "./components/User";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";

const App = () => {
 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginParent />} />
        <Route path="/signup" element={<RegisterParent />} />
        <Route
          path="/home"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
