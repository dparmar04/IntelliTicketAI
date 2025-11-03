// // src/components/Layout/Navbar.tsx
// import React from "react";
// import { useAppContext } from "../../context/AppContext";
// import { BarChart3, Ticket, Plus, Users, Settings } from "lucide-react";


// interface User {
//   _id: string;
//   name?: string;
//   email?: string;
//   role: "admin" | "sales" | "skilled" | string;
//   status?: "pending" | "active" | string;
// }


// export default function Navbar() {
//   const { activeTab, setActiveTab, currentUser, dbSnapshot } = useAppContext();
//   const pendingUsers = dbSnapshot?.users?.filter((u: User) => u.status === "pending");

//   const btn = (id: string, label: string, icon: React.ReactNode) => (
//     <button
//       onClick={() => setActiveTab(id)}
//       className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm ${activeTab === id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
//         }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   );

//   return (
//     <nav className="bg-white border-b border-gray-200 px-6">
//       <div className="flex space-x-8">
//         {btn("dashboard", "Dashboard", <BarChart3 className="w-4 h-4" />)}
//         {btn("tickets", "Tickets", <Ticket className="w-4 h-4" />)}
//         {(currentUser?.role === "admin" || currentUser?.role === "sales") &&
//           btn("create", "Create Ticket", <Plus className="w-4 h-4" />)}
//         {currentUser?.role === "skilled" &&
//           btn("skills", "My Skills", <Settings className="w-4 h-4" />)}
//         {currentUser?.role === "admin" &&
//           btn("users", "Users", (
//             <div className="flex items-center space-x-1">
//               <Users className="w-4 h-4" />
//               {pendingUsers?.length > 0 && (
//                 <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {pendingUsers.length}
//                 </span>
//               )}
//             </div>
//           ))}
//       </div>
//     </nav>
//   );
// }
// src/components/Layout/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { BarChart3, Ticket, Plus, Users, Settings } from "lucide-react";

interface User {
  _id: string;
  name?: string;
  email?: string;
  role: "admin" | "sales" | "skilled" | string;
  status?: "pending" | "active" | string;
}

export default function Navbar() {
  const { currentUser, dbSnapshot } = useAppContext();
  const pendingUsers = dbSnapshot?.users?.filter(
    (u: User) => u.status === "pending"
  );

  const link = (to: string, label: string, icon: React.ReactNode) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm ${isActive
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );

  return (
    <nav className="bg-white border-b border-gray-200 px-6">
      <div className="flex space-x-8">
        {link("/app/dashboard", "Dashboard", <BarChart3 className="w-4 h-4" />)}
        {link("/app/tickets", "Tickets", <Ticket className="w-4 h-4" />)}

        {(currentUser?.role === "admin" || currentUser?.role === "sales") &&
          link("/app/create", "Create Ticket", <Plus className="w-4 h-4" />)}

        {currentUser?.role === "skilled" &&
          link("/app/skills", "My Skills", <Settings className="w-4 h-4" />)}

        {currentUser?.role === "admin" &&
          link(
            "/app/users",
            "Users",
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              {pendingUsers?.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingUsers.length}
                </span>
              )}
            </div>
          )}
      </div>
    </nav>
  );
}
