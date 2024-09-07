import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../../supabase/config";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in the fields");
        return;
      }

      const { data: { user, session }, error } = await login(
        emailRef.current.value,
        passwordRef.current.value
      );

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (user && session) {
        // Fetch the user role from the profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", user.id)
          .single();

        if (profileError || !profile) {
          setErrorMsg("Error fetching user role");
          return;
        }

        // Redirect based on user role
        if (profile.user_type === "employer") {
          navigate("/EmployerDashboard");
        } else if (profile.user_type === "job_seeker") {
          navigate("/jobPostings");
        } else {
          setErrorMsg("Invalid user role");
        }
      }
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="text-right mb-4">
            <Link to="/PasswordReset" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot Password?
            </Link>
          </div>
          {errorMsg && (
            <div className="mb-4">
              <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
                {errorMsg}
              </Alert>
            </div>
          )}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="w-full text-center mt-4">
          New User? <Link to="/register" className="text-indigo-600 hover:text-indigo-500">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
