import { useState } from "react";
import logo from "../../assets/Images/molla_logo.png";
import { useUserLoginMutation } from "../../redux/api/api";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await userLogin({ email, password }).unwrap();
      if (!response) {
        return;
      }
      // console.log(response);
      if (response.success && !isLoading) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login successful!",
        }).then(() => {
          window.location.href = "/";
        });
      }

      // Handle success, e.g., save token to local storage or navigate
      localStorage.setItem("token", response.token);
      // alert("Login successful!");

      // window.location.href = "/";
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(error.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-4xl rounded-md shadow-lg border overflow-hidden">
        {/* Welcome Part */}
        <div className="flex flex-col items-center justify-center w-1/2 bg-pink-600 text-gray-50 p-6">
          <div className="mb-6">
            <img src={logo} alt="Logo" className="" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center text-sm">
            Experience the best tools to manage your account effectively.
          </p>
        </div>

        {/* Form Part */}
        <div className="flex flex-col w-1/2 bg-gray-50 dark:bg-gray-50 dark:text-gray-800 p-6 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <p className="text-sm dark:text-gray-600">
              Sign in to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs hover:underline dark:text-gray-600"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
              <p className="px-6 text-sm text-center dark:text-gray-600">
                Don't have an account yet?{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline dark:text-violet-600"
                >
                  Sign up
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
