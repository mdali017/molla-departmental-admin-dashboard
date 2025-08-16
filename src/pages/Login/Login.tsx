import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/Images/molla_logo.png";
import { useLoginMutation } from "../../redux/services/authApi/authApi";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  // const [isLoading, setIsLoading] = useState<boolean>(false);/
  const [loginType, setLoginType] = useState<"admin" | "manager">("admin");

  const [login, { isLoading: isAdminLoginLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(formData).unwrap();

      if (response.success) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(loginType === "admin" ? "/dashboard" : "/manager-dashboard");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.data?.message || "Invalid credentials",
      });
    }
  };

  const handleAdminLogin = async () => {
    try {
      const response = await login(formData);

      if (response?.data?.success) {
        // Success case
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in as admin",
          showConfirmButton: false,
          timer: 1500,
        });

        // Store token and navigate
        localStorage.setItem("authToken", response.data.data.token);
        navigate("/dashboard");
      } else {
        // API returned success: false
        await Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response?.data?.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during login. Please try again.",
      });
    }
  };

  const handleManagerLogin = () => {
    setLoginType("manager");
    setFormData({
      email: "",
      password: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl shadow-2xl rounded-3xl flex">
        {/* Login Form Section */}
        <div className="flex-1 max-w-md p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-400 mb-1">Login</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Login Buttons */}
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleAdminLogin}
                  disabled={isAdminLoginLoading}
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {isAdminLoginLoading ? "Processing..." : "Admin Login"}
                </button>

                <button
                  type="button"
                  onClick={handleManagerLogin}
                  className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                >
                  Manager Login
                </button>
              </div>
            </div>
          </form>

          {/* Additional Links */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
              type="button"
              onClick={handleAdminLogin}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login as an Admin
            </button>
            <button
              type="button"
              onClick={handleManagerLogin}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Log in to Webmail
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Forgot your password
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        {/* Logo Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center">
              <img src={logo} alt="Company Logo" />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Welcome to E-Commerce Solutions
              </h3>
              <p className="text-gray-500 max-w-md">
                Your trusted partner for e-commerce solutions and professional
                services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
