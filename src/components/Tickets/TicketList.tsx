// src/components/Tickets/TicketList.tsx
import React from "react";
import { useAppContext } from "../../context/AppContext";
import TicketCard from "./TicketCard";
import { Ticket, Filter } from "lucide-react";

export default function TicketList() {
  const { dbSnapshot, currentUser } = useAppContext();

  const visibleTickets =
    currentUser.role === "admin"
      ? dbSnapshot?.tickets
      : currentUser.role === "sales"
        ? dbSnapshot?.tickets?.filter(t => t.createdBy === currentUser._id)
        : dbSnapshot?.tickets?.filter(t => t.assignedTo === currentUser._id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {currentUser.role === "sales"
            ? "My Created Tickets"
            : currentUser.role === "skilled"
              ? "Assigned To Me"
              : "All Tickets"}
        </h2>
        <Filter className="w-5 h-5 text-gray-400" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {visibleTickets?.length ? (
          visibleTickets?.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Ticket className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No tickets found</p>
          </div>
        )}
      </div>
    </div>
  );
}
