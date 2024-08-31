import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/config";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const roleRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = (email, password) =>
    supabase.auth.signUp({ email, password });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value ||
      !roleRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords don't match");
      return;
    }

    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value
      );

      if (error) {
        setErrorMsg("Error in Creating Account");
      } else if (data) {
        // Create user profile in Supabase with selected role
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          user_type: roleRef.current.value,
          full_name: emailRef.current.value.split('@')[0], // Placeholder, you might want to add a full name field
          email: emailRef.current.value,
        });

        if (profileError) {
          setErrorMsg("Error creating profile");
        } else {
          setMsg(
            "Registration Successful. Check your email to confirm your account"
          );

          // Redirect based on role
          if (roleRef.current.value === "employer") {
            navigate("/employerJobPost");
          } else if (roleRef.current.value === "job_seeker") {
            navigate("/");
          }
        }
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
          <div className="mb-4">
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              ref={confirmPasswordRef}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Register as
            </label>
            <select
              id="role"
              ref={roleRef}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Role</option>
              <option value="employer">Employer</option>
              <option value="job_seeker">Job Seeker</option>
            </select>
          </div>
          {errorMsg && (
            <div className="mb-4">
              <Alert
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible
              >
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
              Register
            </button>
          </div>
        </form>
        <div className="w-full text-center mt-4">
          Already a user?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
