import { Routes, Route } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import TicketList from "../components/Tickets/TicketList";
import CreateTicket from "../components/Tickets/CreateTicket";
import SkillManager from "../components/Skills/SkillManager";
import UserList from "../components/Users/UserList";
import PendingApprovals from "../components/Users/PendingApprovals";

function AppContent() {
  const { screen } = useAppContext();

  if (screen === "login") return <Login />;
  if (screen === "signup") return <Signup />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      <main className="p-6">
        {/* {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "tickets" && <TicketList />}
        {activeTab === "create" && <CreateTicket />}
        {activeTab === "skills" && <SkillManager />}
        {activeTab === "users" && (
          <>
            <PendingApprovals />
            <UserList />
          </>
        )} */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/create" element={<CreateTicket />} />
          <Route path="/skills" element={<SkillManager />} />
          <Route
            path="/users"
            element={
              <>
                <PendingApprovals />
                <UserList />
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default function SupportAI() {
  return (
    <AppContent />
  );
}
