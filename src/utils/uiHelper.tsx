// src/utils/uiHelpers.ts
import { Clock, AlertCircle, CheckCircle } from "lucide-react";

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-100";
    case "medium":
      return "text-yellow-600 bg-yellow-100";
    case "low":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <Clock className="w-4 h-4 text-blue-500" />;
    case "in-progress":
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    case "resolved":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

export const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800";
    case "sales":
      return "bg-blue-100 text-blue-800";
    case "skilled":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
