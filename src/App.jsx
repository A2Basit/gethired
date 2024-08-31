import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PasswordReset from "./pages/PasswordReset";
import UpdatePassword from "./pages/UpdatePassword";
import GuestRoute from "./components/GuestRoute";
const App = () => {
  return (
    <>
      <NavBar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Routes>
            
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<GuestRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/UpdatePassword" element={<UpdatePassword />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </Container>
    </>
  );
};

export default App;