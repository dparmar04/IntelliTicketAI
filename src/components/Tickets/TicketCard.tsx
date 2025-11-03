// src/components/Tickets/TicketCard.tsx
import { useState } from 'react'
import { Brain, Trash2 } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { getStatusIcon, getPriorityColor } from "../../utils/uiHelper"
import Markdown from "react-markdown";
import type { Ticket, User } from "../../types/model";
import toast from "react-hot-toast";


export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const {
    handleUpdateTicketStatus,
    handleDeleteTicket,
    handleReassignTicket,
    currentUser,
    dbSnapshot
  } = useAppContext();


  const [tempAgent, setTempAgent] = useState<{ [key: string]: string }>({});
  const skilledUsers = dbSnapshot?.users?.filter((u: User) => u.role === "skilled" && u.status === "active");

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {getStatusIcon(ticket.status)}
            <h3 className="font-medium text-gray-900">{ticket.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
          </div>
          <p className="text-gray-600 mb-3"><Markdown>{ticket.description}</Markdown></p>
          <div className="text-sm mb-3 space-x-4 text-gray-500">
            <span>Category: <b>{ticket.category}</b></span>
            <span>Assigned to: <b>{ticket.assignedToName}</b></span>
            <span>Created by: <b>{ticket.createdByName}</b></span>
            <span className={ticket.escalationRisk === "high" ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
              Escalation: {ticket.escalationRisk}
            </span>
          </div>

          {/* AI Steps */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center">
              <Brain className="w-4 h-4 mr-2" /> AI Troubleshooting Steps
            </h4>
            <ul className="list-disc p-3 space-y-1 text-sm text-blue-800">
              {ticket.troubleshootSteps.map((step, i) => (
                <li key={i}>
                  <Markdown>{step}</Markdown></li>
              ))}
            </ul>
          </div>

          {/* Skilled Person Actions */}
          {currentUser?.role === "skilled" && ticket.status !== "resolved" && (
            <div className="mt-4 flex space-x-2">
              {ticket.status === "open" && (
                <button
                  onClick={() => handleUpdateTicketStatus(ticket._id || ticket.id, "in-progress")}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 cursor-pointer"
                >
                  Start Working
                </button>
              )}
              {ticket.status === "in-progress" && (
                <button
                  onClick={() => handleUpdateTicketStatus(ticket._id || ticket.id, "resolved")}
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          )}

          {/* Admin Reassignment */}
          {currentUser?.role === "admin" && (
            <div className="mt-4 flex items-center space-x-2">
              <select
                value={tempAgent[ticket._id] || ""}
                onChange={(e) =>
                  setTempAgent((prev) => ({ ...prev, [ticket._id]: e.target.value }))
                }
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="">Select agent...</option>
                {skilledUsers.map((u: User) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.skills.join(", ")})
                  </option>
                ))}
              </select>

              <button
                onClick={async () => {
                  const selectedAgentId = tempAgent[ticket._id];
                  if (!selectedAgentId) {
                    toast.error("⚠️ Please select an agent before reassigning.");
                    return;
                  }
                  try {
                    await handleReassignTicket(ticket._id, selectedAgentId);
                    toast.success("✅ Ticket reassigned successfully!");
                  } catch (error) {
                    toast.error("❌ Failed to reassign ticket. Try again.");
                  }
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm transition-all duration-300 cursor-pointer"
              >
                Reassign
              </button>
            </div>
          )}


        </div>

        <div className="flex flex-col items-end space-y-2">
          <p className="text-sm text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</p>
          {
            (currentUser?.role === "admin" ||
              (currentUser?.role === "sales" && ticket.createdBy === (currentUser?.id ?? ""))) && (
              <button onClick={() => handleDeleteTicket(ticket._id || ticket.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
