import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

export default function CreateTicket() {
  const { currentUser, handleCreateTicket, setError, setSuccess } = useAppContext();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const submitTicket = async () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    setLoading(true);
    await handleCreateTicket({ title });
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border rounded p-2 placeholder:text-gray-400 outline-blue-400"
          placeholder="Ticket title"
          disabled={loading}
        />
      </div>

      <button
        onClick={submitTicket}
        disabled={loading}
        className={`px-4 py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Generating with AI..." : "Create Ticket"}
      </button>
    </div>
  );
}
