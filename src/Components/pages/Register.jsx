import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/register", {
                email,
                username,
                password,
                confirmPassword

            }, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000
            });

            if (res.status === 201) {
                toast.success("Registration successful. Redirecting to login...");
                setTimeout(() => navigate("/login"), 1200);
            } else {
                toast.error(res.data?.message || "Registration failed");
            }
        } catch (error) {
            console.error('Register request error:', error);
            const msg = error.response?.data?.message || error.message || "Registration failed. Try again.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleRegister}>
                <h1 className="text-xl font-bold mb-4">Register</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                   <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default Register;