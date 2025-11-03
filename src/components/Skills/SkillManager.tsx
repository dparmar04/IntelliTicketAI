// src/components/Skills/SkillManager.tsx
import React from "react";
import { Plus, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import type { Ticket } from "../../types/model";
import toast from "react-hot-toast";

interface PerfCardProps {
  label: string;
  value: number | undefined;
  color: "blue" | "yellow" | "green" | string;
}

export default function SkillManager() {
  const { dbSnapshot, currentUser, handleAddSkill, handleRemoveSkill } = useAppContext();
  const [newSkill, setNewSkill] = React.useState("");

  const visibleTickets = dbSnapshot?.tickets?.filter((t: Ticket) => t.assignedTo === currentUser?._id);
  const addSkill = () => {
    if (!newSkill.trim() || !currentUser?._id) return toast.error("Please add skill");;
    handleAddSkill(currentUser._id, newSkill.toLowerCase());
    setNewSkill('');
  };

  const removeSkill = (skill: string) => {
    if (!currentUser?._id) return;
    handleRemoveSkill(currentUser._id, skill);
  };


  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Skills</h2>
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Current Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {currentUser?.skills.length ? (
            currentUser.skills.map((skill: string) => (
              <div key={skill} className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg">
                <span className="font-medium">{skill}</span>
                <button onClick={() => removeSkill(skill)} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No skills added yet.</p>
          )}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyPress={e => e.key === "Enter" && addSkill()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            placeholder="e.g., billing, technical"
          />
          <button onClick={addSkill} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Performance */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">My Performance</h3>
        <div className="grid grid-cols-3 text-center">
          <PerfCard label="Total Assigned" value={visibleTickets?.length} color="blue" />
          <PerfCard label="In Progress" value={visibleTickets?.filter((t: Ticket) => t.status === "in-progress").length} color="yellow" />
          <PerfCard label="Resolved" value={visibleTickets?.filter((t: Ticket) => t.status === "resolved").length} color="green" />
        </div>
      </div>
    </div>
  );
}

const PerfCard: React.FC<PerfCardProps> = ({ label, value, color }) => (
  <div>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);
