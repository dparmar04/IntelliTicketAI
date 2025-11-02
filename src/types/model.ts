// src/types/models.ts

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

