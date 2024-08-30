import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PasswordReset from "./pages/PasswordReset";
import UpdatePassword from "./pages/UpdatePassword";
import GuestRoute from "./components/GuestRoute";
import JobPostings from "./pages/jobPostings";
const App = () => {
  return (
    <>
      <div>
        <NavBar />
        <div>
          {/* Add padding-top to account for fixed NavBar */}

            {/* Subtract NavBar height */}
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<AuthRoute />}>
                  <Route path="/home" element={<Home />} />
                </Route>
                <Route element={<GuestRoute />}>
                  <Route path="/Register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/PasswordReset" element={<PasswordReset />} />
                <Route path="/UpdatePassword" element={<UpdatePassword />} />
                <Route path="/jobPostings" element={<JobPostings />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </div>
        </div>
      </div>
    </>
  );
};

export default App;