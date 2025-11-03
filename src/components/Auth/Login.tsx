// src/components/Auth/Login.tsx
import React from "react";
import { Brain } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function Login() {
  const { error, success, setScreen, handleLogin } = useAppContext();
  const [form, setForm] = React.useState({ email: "", password: "" });

  const submit = () => handleLogin(form.email, form.password);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" onKeyDown={handleKeyPress}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">SupportAI</h1>
        <p className="text-center text-gray-600 mb-6">AI-Powered Support Automation</p>

        {error && <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}
        {success && <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">{success}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border outline-none rounded-lg focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border outline-none rounded-lg focus:ring-1 focus:ring-blue-500
              placeholder:text-gray-400"
              placeholder="••••••••"
            />
          </div>
          <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium cursor-pointer">
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <button onClick={() => setScreen("signup")} className="text-blue-600 hover:underline cursor-pointer">
              Sign up
            </button>
          </p>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-medium text-blue-900 mb-2">Demo Accounts:</p>
          <p className="text-blue-800">Admin: admin@company.com / admin123</p>
          <p className="text-blue-800">Sales: john@gmail.com / john123</p>
          <p className="text-blue-800">Skilled: alice@gmail.com / alice123</p>
        </div>
      </div>
    </div>
  );
}
