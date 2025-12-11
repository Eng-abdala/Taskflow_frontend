import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/login", {
                email,
                password
            }, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000
                // withCredentials: true // remove unless you use httpOnly cookies
            });

            // save token returned by server (server returns { token, user })
            const token = res.data?.token;
            if (token) {
                localStorage.setItem('token', token);
                toast.success("Login successful — redirecting to Add Task");
                setTimeout(() => navigate("/addtask"), 800);
            } else {
                toast.error("No token from server");
            }
        } catch (error) {
            console.error('Login error', error);
            // show more useful message
            const msg =
              error.response?.data?.message ||
              (error.request ? 'Network error — server not reachable' : error.message);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
                <h1 className="text-xl font-bold mb-4">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default Login;