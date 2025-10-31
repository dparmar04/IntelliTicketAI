// src/components/Dashboard/Dashboard.tsx
import { useAppContext } from "../../context/AppContext";
import { Brain, Ticket, Clock, AlertCircle, CheckCircle, Zap } from "lucide-react";
import { getStatusIcon, getPriorityColor } from "../../utils/uiHelper";

export default function Dashboard() {
  const { dbSnapshot, currentUser } = useAppContext();

  const visibleTickets =
    currentUser.role === "admin"
      ? dbSnapshot?.tickets
      : currentUser.role === "sales"
        ? dbSnapshot?.tickets?.filter(t => t.createdBy === currentUser._id)
        : dbSnapshot?.tickets?.filter(t => t.assignedTo === currentUser._id);

  const stats = {
    total: visibleTickets?.length,
    open: visibleTickets?.filter(t => t.status === "open").length,
    inProgress: visibleTickets?.filter(t => t.status === "in-progress").length,
    resolved: visibleTickets?.filter(t => t.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Tickets" value={stats.total} icon={<Ticket className="w-8 h-8 text-blue-500" />} />
        <StatCard label="Open Tickets" value={stats.open} icon={<Clock className="w-8 h-8 text-yellow-500" />} />
        <StatCard label="In Progress" value={stats.inProgress} icon={<AlertCircle className="w-8 h-8 text-orange-500" />} />
        <StatCard label="Resolved" value={stats.resolved} icon={<CheckCircle className="w-8 h-8 text-green-500" />} />
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-500" /> AI System Status
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-gray-900 flex items-center justify-between mb-2">
              Auto-Assignment Active <Zap className="w-5 h-5 text-green-600" />
            </h4>
            <p className="text-sm text-gray-600">
              Tickets are auto-assigned based on skills & workload
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 flex items-center justify-between mb-2">
              AI Troubleshooting <Brain className="w-5 h-5 text-blue-600" />
            </h4>
            <p className="text-sm text-gray-600">
              AI-generated solutions are created for each ticket
            </p>
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Tickets</h3>
        <div className="space-y-3">
          {visibleTickets?.slice(0, 5).map(ticket => (
            <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(ticket.status)}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{ticket.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            </div>
          ))}
          {visibleTickets?.length === 0 && (
            <p className="text-center text-gray-500 py-4">No tickets yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      {icon}
    </div>
  );
}
