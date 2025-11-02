// src/context/AppContext.tsx
import { createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction } from "react";
import type { User, Ticket, TicketForm } from "../types/model";

interface DBSnapshot {
  users: User[];
  tickets: Ticket[];
}

export interface AppContextType {
  dbSnapshot: DBSnapshot;
  setDbSnapshot: React.Dispatch<React.SetStateAction<DBSnapshot>>;
  refreshSnapshot: () => void;

  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;

  screen: "login" | "signup" | "app";
  setScreen: Dispatch<SetStateAction<"login" | "signup" | "app">>;

  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;

  error: string;
  setError: Dispatch<SetStateAction<string>>;

  success: string;
  setSuccess: Dispatch<SetStateAction<string>>;

  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignup: (payload: { name: string; email: string; password: string; role: string }) => Promise<void>;

  handleLogout: () => void;

  handleCreateTicket: (ticketForm: TicketForm) => Promise<void>;
  handleDeleteTicket: (ticketId: string) => Promise<void>;
  handleUpdateTicketStatus: (ticketId: string, status: string) => Promise<void>;
  handleReassignTicket: (ticketId: string, userId: string) => Promise<void>;

  handleApproveUser: (userId: string) => Promise<void>;
  handleRejectUser: (userId: string) => Promise<void>;
  handleAddSkill: (userId: string, skill: string) => Promise<void>;
  handleRemoveSkill: (userId: string, skill: string) => Promise<void>;

  API_BASE: string;
}


const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [dbSnapshot, setDbSnapshot] = useState<DBSnapshot>({ users: [], tickets: [] });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE =
    import.meta.env.REACT_APP_API_BASE || "http://localhost:5000/api";

  // Helper: fetch all data snapshot (users + tickets)
  const refreshSnapshot = async () => {
    try {
      const usersResp = await fetch(`${API_BASE}/users`);
      const usersJson = await usersResp.json();
      const ticketsResp = await fetch(`${API_BASE}/tickets`);
      const ticketsJson = await ticketsResp.json();
      setDbSnapshot({ users: usersJson.users, tickets: ticketsJson.tickets });
    } catch (err) {
      console.error(err);
    }
  };

  // 🧩 B: Refetch snapshot and reconcile user on app load
  useEffect(() => {
    const init = async () => {
      await refreshSnapshot();

      const saved = localStorage.getItem("currentUser");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const res = await fetch(`${API_BASE}/users/${parsed._id || parsed.id}`);
          if (res.ok) {
            const freshUser = await res.json();
            setCurrentUser(freshUser);
          } else {
            console.warn("⚠️ Could not fetch user on init");
          }
        } catch (err) {
          console.error("Failed to reconcile currentUser:", err);
        }
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore user from localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  // 🧩 A: Persist currentUser in localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } catch (err) {
        console.error("Failed to persist currentUser:", err);
      }
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const [screen, setScreen] = useState<"login" | "signup" | "app">(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? "app" : "login";
  });

  // ===============================
  // AUTH SECTION
  // ===============================
  const handleLogin = async (email: string, password: string) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "pending")
          setError("Your account is pending admin approval");
        else if (data.error === "rejected")
          setError("Your account has been rejected. Please contact admin.");
        else setError(data.error || "Login failed");
        return;
      }
      setCurrentUser(data.user);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      setScreen("app");
      setSuccess(`Welcome back, ${data.user.name}!`);
      setTimeout(() => setSuccess(""), 3000);
      refreshSnapshot();
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  const handleSignup = async (payload: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }
      setSuccess("Account created! Waiting for admin approval.");
      setTimeout(() => {
        setScreen("login");
        setSuccess("");
      }, 2000);
      refreshSnapshot();
    } catch (err) {
      console.error("InContext Signup error:", err);
      setError("Network error");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setScreen("login");
    setActiveTab("dashboard");
  };

  // ===============================
  // TICKET SECTION
  // ===============================
  const handleCreateTicket = async (ticketForm: TicketForm) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...ticketForm,
          createdBy: currentUser?._id || currentUser?.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create ticket");
        return;
      }
      setSuccess("Ticket created and auto-assigned with AI troubleshooting guide!");
      setTimeout(() => setSuccess(""), 3000);
      setActiveTab("tickets");
      refreshSnapshot();
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await fetch(`${API_BASE}/tickets/${ticketId}`, { method: "DELETE" });
      setSuccess("Ticket deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
      refreshSnapshot();
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  const handleReassignTicket = async (ticketId: string, newAgentId: string) => {
    try {
      await fetch(`${API_BASE}/tickets/${ticketId}/reassign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newAgentId }),
      });
      setSuccess("Ticket reassigned successfully");
      setTimeout(() => setSuccess(""), 3000);
      refreshSnapshot();
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  const handleUpdateTicketStatus = async (
    ticketId: string,
    newStatus: string
  ) => {
    try {
      await fetch(`${API_BASE}/tickets/${ticketId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setSuccess(`Ticket status updated to ${newStatus}`);
      setTimeout(() => setSuccess(""), 3000);
      refreshSnapshot();
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  // ===============================
  // USER MANAGEMENT (Approve/Reject/Skills)
  // ===============================
  const handleApproveUser = async (userId: string) => {
    await fetch(`${API_BASE}/users/${userId}/approve`, { method: "PATCH" });
    setSuccess("User approved successfully");
    setTimeout(() => setSuccess(""), 3000);
    refreshSnapshot();
  };

  const handleRejectUser = async (userId: string) => {
    await fetch(`${API_BASE}/users/${userId}/reject`, { method: "PATCH" });
    setSuccess("User rejected");
    setTimeout(() => setSuccess(""), 3000);
    refreshSnapshot();
  };

  const handleAddSkill = async (skill: string) => {
    if (!currentUser) return;
    try {
      const patch = await fetch(`${API_BASE}/users/${currentUser._id}/skills/add`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill }),
      });

      if (!patch.ok) {
        setError("Failed to add skill");
        return;
      }

      const res = await fetch(`${API_BASE}/users/${currentUser._id}`);
      const updatedUser = await res.json();
      setCurrentUser(updatedUser);
      setSuccess("Skill added successfully");
      setTimeout(() => setSuccess(""), 3000);
      refreshSnapshot();
    } catch (err) {
      console.error("❌ Error adding skill:", err);
      setError("Network error while adding skill");
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    if (!currentUser) return;
    try {
      const patch = await fetch(`${API_BASE}/users/${currentUser._id}/skills/remove`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill }),
      });

      if (!patch.ok) {
        setError("Failed to remove skill");
        return;
      }

      const res = await fetch(`${API_BASE}/users/${currentUser._id}`);
      const updatedUser = await res.json();
      setCurrentUser(updatedUser);
      setSuccess("Skill removed successfully");
      setTimeout(() => setSuccess(""), 3000);
      refreshSnapshot();
    } catch (err) {
      console.error("❌ Error removing skill:", err);
      setError("Network error while removing skill");
    }
  };

  // ===============================
  // CONTEXT VALUE
  // ===============================
  const value = {
    dbSnapshot,
    refreshSnapshot,
    setDbSnapshot,
    currentUser,
    setCurrentUser,
    screen,
    setScreen,
    activeTab,
    setActiveTab,
    error,
    setError,
    success,
    setSuccess,
    handleLogin,
    handleSignup,
    handleLogout,
    handleCreateTicket,
    handleDeleteTicket,
    handleUpdateTicketStatus,
    handleReassignTicket,
    handleApproveUser,
    handleRejectUser,
    handleAddSkill,
    handleRemoveSkill,
    API_BASE,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext used outside provider");
  return ctx;
};
