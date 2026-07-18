import { useState } from "react";
import { loginUser } from "../services/authService";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-[url('/bg-wall3.png')] bg-cover bg-center px-4">
      <div className="w-full md:w-[30vh] md:block  h-[300px] md:h-[90vh] hidden">
    <img
      src="/owner.png"
      alt="Owner"
      className="w-full h-full object-cover"
    />
  </div>

      <div className="bg-white w-[80vh] h-[80vh] max-w-md rounded-2xl shadow-xl p-8 flex flex-col item-center justify-center">
        <div className="w-full h-[45%]  flex item-center justify-center">
<img src="logo1.png" alt="logo" className="w-[75%] h-[100%]" />
        </div>
        

        <p className=" text-center text-2xl font-bold bg-gradient-to-r from-[#7A4E00] via-[#D4AF37] to-[#FFF4B8] bg-clip-text text-transparent">
          Admin Login
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          <div className="border rounded-lg flex items-center px-3">

            <User className="text-gray-500" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3 outline-none"
              onChange={handleChange}
              required
            />

          </div>

          <div className="border rounded-lg flex items-center px-3">

            <Lock className="text-gray-500" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 outline-none"
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>

          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#8C5A00] via-[#D4AF37] to-[#FFF3B0] cursor-pointer hover:bg-yellow-600 text-white py-3 rounded-lg"
          >
            {loading ? "Please Wait..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;