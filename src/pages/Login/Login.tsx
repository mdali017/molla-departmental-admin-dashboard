import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/Images/molla_logo.png";

// Type definitions
interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

// Logo Component

const Login: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_open, setOpen] = useState<boolean>(false);

  // login mutation
  // @ts-ignore
  // const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev: FormErrors) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = true;
      console.log(response);
      // @ts-ignore
      if (response.data && response.data.success) {
        // @ts-ignore
        const { user, token } = response.data.data;

        // Transform user data to match your slice interface
        // const transformedUser = {
        //   id: user._id,
        //   name: user.name,
        //   email: user.email,
        //   organizationId: user.organizationId,
        //   role: user.role[0], // Taking the first role as string
        // };

        // Dispatch the setCredentials action to store data in Redux

        Swal.fire({
          icon: "success",
          title: "Successfully logged in",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/dashboard");
      } else {
        // Handle error case
        Swal.fire({
          icon: "error",
          title: "Login failed",
          // @ts-ignore
          text: response.data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = (): void => {
    console.log("Sign up clicked");
    // Handle navigation to sign up page
  };

  const handleAdminLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    // Admin login logic - reusing the same login function
    await handleSubmit({ preventDefault: () => {} } as any);
  };

  const handleClientLogin = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-4xl  shadow-2xl rounded-3xl flex items-center gap-">
          {/* Login Section - Left Side */}
          <div className="flex-1 max-w-md">
            {/* Login Card */}
            <div className=" rounded-2xl p-8">
              {/* Header */}
              <div className=" mb-6">
                <h2 className="text-2xl font-bold text-gray-400 mb-1">Login</h2>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 ${
                        errors.email
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 ${
                        errors.password
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash
                          size={18}
                          className="text-gray-400 hover:text-gray-600"
                        />
                      ) : (
                        <FaEye
                          size={18}
                          className="text-gray-400 hover:text-gray-600"
                        />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Login Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={handleAdminLogin}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      "Admin Login"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleClientLogin}
                    className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Manager Login
                  </button>
                </div>

                {/* Additional Links */}
                <div className="flex justify-between items-center mt-4 text-sm">
                  <button
                    type="button"
                    onClick={() => console.log("Admin login clicked")}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Login as an Admin
                  </button>

                  <button
                    type="button"
                    onClick={handleClientLogin}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Log in to Webmail
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => console.log("Forgot password clicked")}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    Forgot your password
                  </button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={handleSignUp}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Logo Section - Right Side */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {/* <LegalLogo /> */}
              <div className="flex justify-center">
                <img src={logo} alt="" />
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
    </>
  );
};

export default Login;
