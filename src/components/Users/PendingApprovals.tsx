// src/components/Users/PendingApprovals.tsx
import { AlertCircle, UserCheck, UserX } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { getRoleBadgeColor } from "../../utils/uiHelper";

interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function PendingApprovals() {
  const { dbSnapshot, handleApproveUser, handleRejectUser } = useAppContext() as {
    dbSnapshot: { users?: User[] };
    handleApproveUser: (id: string) => void;
    handleRejectUser: (id: string) => void;
  };

  const pending = dbSnapshot?.users?.filter((u: User) => u.status === "pending");

  if (!pending?.length) return null;

  return (
    <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mb-6">
      <h3 className="font-medium text-yellow-900 mb-4 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" /> Pending Approvals ({pending?.length})
      </h3>
      {pending?.map(user => (
        <div key={user.id} className="bg-white p-4 rounded-lg flex items-center justify-between mb-3">
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
              {user.role.toUpperCase()}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleApproveUser(user._id)}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center space-x-1"
            >
              <UserCheck className="w-4 h-4" /> <span>Approve</span>
            </button>
            <button
              onClick={() => handleRejectUser(user._id)}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center space-x-1"
            >
              <UserX className="w-4 h-4" /> <span>Reject</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
