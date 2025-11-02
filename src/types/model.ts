// src/types/models.ts
import{ type Dispatch, type SetStateAction } from "react";
export interface User {
  id:  null | undefined;
  _id: string;
  email: string;
  password?: string; // optional since not needed on frontend
  name: string;
  role: "admin" | "sales" | "skilled";
  status: "active" | "pending" | "rejected";
  skills: string[];
  createdAt: string;
}

export interface Ticket {
  id: string;
  _id: string;
  title: string;
  description: string;
  customerEmail: string;
  customerName: string;
  category: string;
  priority: string;
  sentiment: string;
  status: "open" | "in-progress" | "resolved";
  assignedTo: string | null;
  assignedToName?: string;
  createdBy: string;
  createdByName?: string;
  createdAt: string;
  troubleshootSteps: string[];
  comments: string[];
  escalationRisk: "high" | "low";
}

export type TicketForm = Pick<Ticket, "title" | "description" | "category" | "priority"> & {
  customerEmail?: string;
  customerName?: string;
};

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
