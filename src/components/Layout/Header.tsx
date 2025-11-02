// src/components/Layout/Header.tsx
import { Brain, LogOut } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
// import { getRoleBadgeColor } from "../../utils/uiHelpers";

export default function Header() {
  const { currentUser, handleLogout } = useAppContext();
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SupportAI</h1>
            <p className="text-sm text-gray-500">AI-Powered Support Automation</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${currentUser?.role}`}>
              {currentUser?.role.toUpperCase()}
            </span>
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
