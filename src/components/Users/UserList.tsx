// src/components/Users/UserList.tsx
import React from "react";
import { useAppContext } from "../../context/AppContext";
import { getRoleBadgeColor } from "../../utils/uiHelper";

export default function UserList() {
  const { dbSnapshot } = useAppContext();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">All Users</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {dbSnapshot?.users?.map(user => (
          <div key={user.id} className="p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-13">
                <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
                  {user.role.toUpperCase()}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${user.status === "active"
                    ? "bg-green-100 text-green-800"
                    : user.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  {user.status.toUpperCase()}
                </span>
                {user.role === "skilled" && user.skills.length > 0 && (
                  <span className="text-xs text-gray-600">
                    Skills: {user.skills.join(", ")}
                  </span>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-500 text-right">
              {user.role === "skilled" && (
                <p>
                  Assigned:{" "}
                  {
                    dbSnapshot.tickets.filter(
                      t => t.assignedTo === user.id && t.status !== "resolved"
                    ).length
                  }{" "}
                  tickets
                </p>
              )}
              {user.role === "sales" && (
                <p>
                  Created:{" "}
                  {dbSnapshot.tickets.filter(t => t.createdbSnapshoty === user.id).length} tickets
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
