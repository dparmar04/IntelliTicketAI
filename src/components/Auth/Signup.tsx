// // src/components/Auth/Signup.tsx
// import React from "react";
// import { Brain } from "lucide-react";
// import { useAppContext } from "../../context/AppContext";

// export default function Signup() {
//   const { error, success, handleSignup, setScreen } = useAppContext();
//   const [form, setForm] = React.useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "sales"
//   });

//   const submit = () => handleSignup(form);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <div className="flex items-center justify-center mb-6">
//           <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
//             <Brain className="w-7 h-7 text-white" />
//           </div>
//         </div>
//         <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">SupportAI</h1>
//         <p className="text-center text-gray-600 mb-6">Create Your Account</p>

//         {error && <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}
//         {success && <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">{success}</div>}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
//               placeholder="John Doe"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               value={form.email}
//               onChange={e => setForm({ ...form, email: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
//               placeholder="your@email.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               value={form.password}
//               onChange={e => setForm({ ...form, password: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
//               placeholder="••••••••"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//             <select
//               value={form.role}
//               onChange={e => setForm({ ...form, role: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 "
//             >
//               <option value="sales">Sales Person</option>
//               <option value="skilled">Skilled Agent</option>
//             </select>
//           </div>

//           <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
//             Sign Up
//           </button>
//           <p className="text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <button onClick={() => setScreen("login")} className="text-blue-600 hover:underline">
//               Login
//             </button>
//           </p>
//           <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
//             Your account will need admin approval before login.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Brain } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function Signup() {
  const { error, success, handleSignup, setScreen } = useAppContext();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });
  const [formError, setFormError] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
      valid = false;
    }
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setFormError(newErrors);
    return valid;
  };

  const submit = () => {
    if (validate()) handleSignup(form);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <Brain className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">SupportAI</h1>
        <p className="text-center text-gray-600 mb-6">Create Your Account</p>

        {error && <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}
        {success && <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">{success}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={`w-full px-4 py-2 border outline-none rounded-lg focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 ${formError.name ? "border-red-400" : ""
                }`}
              placeholder="John Doe"
            />
            {formError.name && <p className="text-red-500 text-xs mt-1">{formError.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={`w-full px-4 py-2 border outline-none rounded-lg focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 ${formError.email ? "border-red-400" : ""
                }`}
              placeholder="your@email.com"
            />
            {formError.email && <p className="text-red-500 text-xs mt-1">{formError.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className={`w-full px-4 py-2 border outline-none rounded-lg focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 ${formError.password ? "border-red-400" : ""
                }`}
              placeholder="••••••••"
            />
            {formError.password && <p className="text-red-500 text-xs mt-1">{formError.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2 border outline-none rounded-lg focus:ring-1 focus:ring-blue-500"
            >
              <option value="sales">Sales Person</option>
              <option value="skilled">Skilled Agent</option>
            </select>
          </div>

          <button
            onClick={submit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium transition-all duration-200 cursor-pointer">
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={() => setScreen("login")} className="text-blue-600 hover:underline cursor-pointer">
              Login
            </button>
          </p>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 mt-3">
            Your account will need admin approval before login.
          </div>
        </div>
      </div>
    </div>
  );
}
