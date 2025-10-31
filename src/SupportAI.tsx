import React, { useState, useEffect } from 'react';
import {
  Ticket, Users, Brain, TrendingUp, AlertCircle, CheckCircle,
  Clock, Send, Plus, Filter, BarChart3, Zap, LogOut, Settings,
  UserPlus, UserCheck, UserX, Shield, Edit2, Trash2, X, Save
} from 'lucide-react';


const SupportAI = () => {
  const [db, setDb] = useState(initializeDatabase());
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Forms state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    email: '', password: '', name: '', role: 'sales'
  });
  const [ticketForm, setTicketForm] = useState({
    title: '', description: '', customerEmail: '', customerName: ''
  });
  const [editingSkills, setEditingSkills] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Save to localStorage whenever db changes
  useEffect(() => {
    localStorage.setItem('supportAI_db', JSON.stringify(db));
  }, [db]);

  // AI Classification Engine
  const classifyTicket = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();

    let category = 'general';
    if (text.includes('payment') || text.includes('billing') || text.includes('invoice') || text.includes('paid') || text.includes('subscription')) {
      category = 'billing';
    } else if (text.includes('login') || text.includes('password') || text.includes('technical') || text.includes('bug') || text.includes('error') || text.includes('crash')) {
      category = 'technical';
    } else if (text.includes('account') || text.includes('profile') || text.includes('settings')) {
      category = 'account';
    }

    let priority = 'medium';
    if (text.includes('urgent') || text.includes('emergency') || text.includes('critical') || text.includes('down') || text.includes('asap')) {
      priority = 'high';
    } else if (text.includes('when you can') || text.includes('no rush') || text.includes('minor')) {
      priority = 'low';
    }

    let sentiment = 'neutral';
    const negativeWords = ['frustrated', 'angry', 'terrible', 'awful', 'horrible', 'disappointed', 'urgent', 'upset'];
    const positiveWords = ['thanks', 'appreciate', 'great', 'excellent', 'wonderful'];

    if (negativeWords.some(word => text.includes(word))) {
      sentiment = 'negative';
    } else if (positiveWords.some(word => text.includes(word))) {
      sentiment = 'positive';
    }

    return { category, priority, sentiment };
  };

  // Generate AI Troubleshooting Steps
  const generateTroubleshootSteps = (category, title, description) => {
    const steps = {
      billing: [
        "Verify payment transaction in payment gateway",
        "Check user subscription status in database",
        "Review account billing history for discrepancies",
        "Ensure payment webhook processed correctly",
        "Contact payment processor if needed"
      ],
      technical: [
        "Ask user to clear browser cache and cookies",
        "Check system logs for error messages",
        "Verify user's browser and device compatibility",
        "Test in incognito/private browsing mode",
        "Check for recent system updates that may conflict"
      ],
      account: [
        "Verify user email and account details",
        "Check account status and permissions",
        "Review recent account activity logs",
        "Ensure email verification is complete",
        "Reset account credentials if necessary"
      ],
      general: [
        "Gather detailed information about the issue",
        "Ask user to provide screenshots if possible",
        "Check knowledge base for similar issues",
        "Try reproducing the issue in test environment",
        "Escalate to specialized team if needed"
      ]
    };
    return steps[category] || steps.general;
  };

  // Smart Agent Assignment
  const assignBestAgent = (category) => {
    const skilledUsers = db.users.filter(u =>
      u.role === 'skilled' &&
      u.status === 'active' &&
      (u.skills.includes(category) || u.skills.includes('general'))
    );

    if (skilledUsers.length === 0) {
      // Fallback to any skilled user
      const fallback = db.users.find(u => u.role === 'skilled' && u.status === 'active');
      return fallback || null;
    }

    // Calculate workload
    const workloads = skilledUsers.map(user => ({
      user,
      workload: db.tickets.filter(t => t.assignedTo === user.id && t.status !== 'resolved').length
    }));

    // Sort by workload (ascending)
    workloads.sort((a, b) => a.workload - b.workload);
    return workloads[0].user;
  };

  // Authentication
  const handleLogin = () => {
    setError('');
    const user = db.users.find(u =>
      u.email === loginForm.email && u.password === loginForm.password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    if (user.status === 'pending') {
      setError('Your account is pending admin approval');
      return;
    }

    if (user.status === 'rejected') {
      setError('Your account has been rejected. Please contact admin.');
      return;
    }

    setCurrentUser(user);
    setScreen('app');
    setLoginForm({ email: '', password: '' });
    setSuccess(`Welcome back, ${user.name}!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSignup = () => {
    setError('');

    if (!signupForm.email || !signupForm.password || !signupForm.name) {
      setError('All fields are required');
      return;
    }

    if (db.users.find(u => u.email === signupForm.email)) {
      setError('Email already registered');
      return;
    }

    const newUser = {
      id: db.nextUserId,
      ...signupForm,
      status: 'pending',
      skills: signupForm.role === 'skilled' ? [] : [],
      createdAt: new Date().toISOString()
    };

    setDb(prev => ({
      ...prev,
      users: [...prev.users, newUser],
      nextUserId: prev.nextUserId + 1
    }));

    setSuccess('Account created! Waiting for admin approval.');
    setTimeout(() => {
      setScreen('login');
      setSuccess('');
    }, 2000);
    setSignupForm({ email: '', password: '', name: '', role: 'sales' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('login');
    setActiveTab('dashboard');
  };

  // Ticket Operations
  const handleCreateTicket = () => {
    setError('');

    if (!ticketForm.title || !ticketForm.description) {
      setError('Title and description are required');
      return;
    }

    const aiAnalysis = classifyTicket(ticketForm.title, ticketForm.description);
    const assignedAgent = assignBestAgent(aiAnalysis.category);

    if (!assignedAgent) {
      setError('No skilled agents available. Please contact admin.');
      return;
    }

    const troubleshootSteps = generateTroubleshootSteps(
      aiAnalysis.category,
      ticketForm.title,
      ticketForm.description
    );

    const newTicket = {
      id: db.nextTicketId,
      ...ticketForm,
      ...aiAnalysis,
      status: 'open',
      assignedTo: assignedAgent.id,
      assignedToName: assignedAgent.name,
      createdBy: currentUser.id,
      createdByName: currentUser.name,
      createdAt: new Date().toISOString(),
      troubleshootSteps,
      comments: [],
      escalationRisk: aiAnalysis.sentiment === 'negative' ? 'high' : 'low'
    };

    setDb(prev => ({
      ...prev,
      tickets: [newTicket, ...prev.tickets],
      nextTicketId: prev.nextTicketId + 1
    }));

    setSuccess('Ticket created and auto-assigned with AI troubleshooting guide!');
    setTimeout(() => setSuccess(''), 3000);
    setTicketForm({ title: '', description: '', customerEmail: '', customerName: '' });
    setActiveTab('tickets');
  };

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      setDb(prev => ({
        ...prev,
        tickets: prev.tickets.filter(t => t.id !== ticketId)
      }));
      setSuccess('Ticket deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleReassignTicket = (ticketId, newAgentId) => {
    const newAgent = db.users.find(u => u.id === newAgentId);
    setDb(prev => ({
      ...prev,
      tickets: prev.tickets.map(t =>
        t.id === ticketId
          ? { ...t, assignedTo: newAgentId, assignedToName: newAgent.name }
          : t
      )
    }));
    setSuccess('Ticket reassigned successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUpdateTicketStatus = (ticketId, newStatus) => {
    setDb(prev => ({
      ...prev,
      tickets: prev.tickets.map(t =>
        t.id === ticketId ? { ...t, status: newStatus } : t
      )
    }));
    setSuccess(`Ticket status updated to ${newStatus}`);
    setTimeout(() => setSuccess(''), 3000);
  };

  // User Management (Admin only)
  const handleApproveUser = (userId) => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u =>
        u.id === userId ? { ...u, status: 'active' } : u
      )
    }));
    setSuccess('User approved successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleRejectUser = (userId) => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u =>
        u.id === userId ? { ...u, status: 'rejected' } : u
      )
    }));
    setSuccess('User rejected');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Skills Management (Skilled Person only)
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    setDb(prev => ({
      ...prev,
      users: prev.users.map(u =>
        u.id === currentUser.id
          ? { ...u, skills: [...u.skills, newSkill.toLowerCase()] }
          : u
      )
    }));

    setCurrentUser(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.toLowerCase()]
    }));

    setNewSkill('');
    setSuccess('Skill added successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleRemoveSkill = (skill) => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u =>
        u.id === currentUser.id
          ? { ...u, skills: u.skills.filter(s => s !== skill) }
          : u
      )
    }));

    setCurrentUser(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));

    setSuccess('Skill removed successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Get filtered tickets based on role
  const getVisibleTickets = () => {
    if (!currentUser) return [];

    if (currentUser.role === 'admin') {
      return db.tickets;
    } else if (currentUser.role === 'sales') {
      return db.tickets.filter(t => t.createdBy === currentUser.id);
    } else if (currentUser.role === 'skilled') {
      return db.tickets.filter(t => t.assignedTo === currentUser.id);
    }
    return [];
  };

  // UI Helper Functions
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'sales': return 'bg-blue-100 text-blue-800';
      case 'skilled': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Statistics
  const getStats = () => {
    const visibleTickets = getVisibleTickets();
    return {
      total: visibleTickets.length,
      open: visibleTickets.filter(t => t.status === 'open').length,
      inProgress: visibleTickets.filter(t => t.status === 'in-progress').length,
      resolved: visibleTickets.filter(t => t.status === 'resolved').length
    };
  };

  // LOGIN/SIGNUP SCREEN
  if (screen === 'login' || screen === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">SupportAI</h1>
          <p className="text-center text-gray-600 mb-6">AI-Powered Support Automation</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          {screen === 'login' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Login
              </button>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={() => setScreen('signup')} className="text-blue-600 hover:underline">
                  Sign up
                </button>
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
                <p className="font-medium text-blue-900 mb-2">Demo Accounts:</p>
                <p className="text-blue-800">Admin: admin@company.com / admin123</p>
                <p className="text-blue-800">Sales: sales@company.com / sales123</p>
                <p className="text-blue-800">Skilled: skilled@company.com / skilled123</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={signupForm.role}
                  onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="sales">Sales Person (Ticket Creator)</option>
                  <option value="skilled">Skilled Person (Support Agent)</option>
                </select>
              </div>
              <button
                onClick={handleSignup}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Sign Up
              </button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => setScreen('login')} className="text-blue-600 hover:underline">
                  Login
                </button>
              </p>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                Your account will need admin approval before you can login.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // MAIN APPLICATION
  const stats = getStats();
  const visibleTickets = getVisibleTickets();
  const pendingUsers = db.users.filter(u => u.status === 'pending');
  const skilledUsers = db.users.filter(u => u.role === 'skilled' && u.status === 'active');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SupportAI</h1>
              <p className="text-sm text-gray-500">AI-Powered Support Automation</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(currentUser.role)}`}>
                {currentUser.role.toUpperCase()}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {success && (
        <div className="bg-green-50 border-b border-green-200 px-6 py-3 text-green-700">
          {success}
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm ${activeTab === 'dashboard'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm ${activeTab === 'tickets'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Tickets</span>
          </button>

          {currentUser.role === 'sales' && (
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm ${activeTab === 'create'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <Plus className="w-4 h-4" />
              <span>Create Ticket</span>
            </button>
          )}

          {currentUser.role === 'skilled' && (
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm ${activeTab === 'skills'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <Settings className="w-4 h-4" />
              <span>My Skills</span>
            </button>
          )}

          {currentUser.role === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm ${activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Users className="w-4 h-4" />
                <span>Users</span>
                {pendingUsers.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingUsers.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm ${activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Plus className="w-4 h-4" />
                <span>Create Ticket</span>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Ticket className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-500" />
                AI System Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Auto-Assignment Active</h4>
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">All tickets automatically assigned based on skills and workload</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">AI Troubleshooting</h4>
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Gemini-powered solutions generated for every ticket</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Tickets</h3>
              <div className="space-y-3">
                {visibleTickets.slice(0, 5).map(ticket => (
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
                {visibleTickets.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No tickets yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TICKETS TAB */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentUser.role === 'sales' ? 'My Created Tickets' :
                  currentUser.role === 'skilled' ? 'Assigned To Me' :
                    'All Tickets'}
              </h2>
              <Filter className="w-5 h-5 text-gray-400" />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {visibleTickets.map(ticket => (
                  <div key={ticket.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(ticket.status)}
                          <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>

                        {/* Customer Info */}
                        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Customer:</strong> {ticket.customerName || 'N/A'} ({ticket.customerEmail || 'N/A'})
                          </p>
                        </div>

                        <div className="flex items-center flex-wrap gap-4 text-sm mb-3">
                          <span className="text-gray-500">Category: <span className="font-medium">{ticket.category}</span></span>
                          <span className="text-gray-500">Assigned to: <span className="font-medium">{ticket.assignedToName}</span></span>
                          <span className="text-gray-500">Created by: <span className="font-medium">{ticket.createdByName}</span></span>
                          <span className={ticket.escalationRisk === 'high' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                            Escalation: {ticket.escalationRisk}
                          </span>
                        </div>

                        {/* AI Generated Troubleshooting Steps */}
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                            <Brain className="w-4 h-4 mr-2" />
                            AI-Generated Troubleshooting Steps
                          </h4>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                            {ticket.troubleshootSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        {/* Status Actions (Skilled Person) */}
                        {currentUser.role === 'skilled' && ticket.status !== 'resolved' && (
                          <div className="mt-4 flex space-x-2">
                            {ticket.status === 'open' && (
                              <button
                                onClick={() => handleUpdateTicketStatus(ticket.id, 'in-progress')}
                                className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                              >
                                Start Working
                              </button>
                            )}
                            {ticket.status === 'in-progress' && (
                              <button
                                onClick={() => handleUpdateTicketStatus(ticket.id, 'resolved')}
                                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                              >
                                Mark Resolved
                              </button>
                            )}
                          </div>
                        )}

                        {/* Admin Reassignment */}
                        {currentUser.role === 'admin' && (
                          <div className="mt-4 flex items-center space-x-2">
                            <select
                              onChange={(e) => handleReassignTicket(ticket.id, parseInt(e.target.value))}
                              defaultValue={ticket.assignedTo}
                              className="px-3 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="">Reassign to...</option>
                              {skilledUsers.map(user => (
                                <option key={user.id} value={user.id}>
                                  {user.name} ({user.skills.join(', ')})
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <p className="text-sm text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</p>

                        {/* Delete Button */}
                        {(currentUser.role === 'admin' ||
                          (currentUser.role === 'sales' && ticket.createdBy === currentUser.id)) && (
                            <button
                              onClick={() => handleDeleteTicket(ticket.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
                {visibleTickets.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    <Ticket className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No tickets found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CREATE TICKET TAB (Admin & Sales) */}
        {activeTab === 'create' && (currentUser.role === 'admin' || currentUser.role === 'sales') && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Support Ticket</h2>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <input
                      type="text"
                      value={ticketForm.customerName}
                      onChange={(e) => setTicketForm({ ...ticketForm, customerName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                    <input
                      type="email"
                      value={ticketForm.customerEmail}
                      onChange={(e) => setTicketForm({ ...ticketForm, customerEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title *</label>
                  <input
                    type="text"
                    value={ticketForm.title}
                    onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Description *</label>
                  <textarea
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed description of the customer's issue..."
                  />
                </div>

                <button
                  onClick={handleCreateTicket}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2 font-medium"
                >
                  <Zap className="w-5 h-5" />
                  <span>Create & Auto-Assign with AI</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-3 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                What happens when you create a ticket?
              </h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">1</div>
                  <p><strong>AI Classification:</strong> Automatically categorizes issue (billing/technical/account)</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">2</div>
                  <p><strong>Priority Detection:</strong> Analyzes urgency from your description</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">3</div>
                  <p><strong>Smart Assignment:</strong> Matches with best-fit skilled agent based on expertise and workload</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">4</div>
                  <p><strong>Troubleshooting Guide:</strong> Gemini AI generates step-by-step solution guidance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS MANAGEMENT TAB (Skilled Person) */}
        {activeTab === 'skills' && currentUser.role === 'skilled' && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Skills</h2>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Current Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills.length > 0 ? (
                    currentUser.skills.map(skill => (
                      <div key={skill} className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg">
                        <span className="font-medium">{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No skills added yet. Add your expertise below!</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Add New Skill</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., billing, technical, account management"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Pro Tip:</strong> Adding relevant skills helps the AI assign you tickets that match your expertise!
                </p>
              </div>
            </div>

            {/* Workload Stats */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">My Performance</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{visibleTickets.length}</p>
                  <p className="text-sm text-gray-600">Total Assigned</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {visibleTickets.filter(t => t.status === 'in-progress').length}
                  </p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {visibleTickets.filter(t => t.status === 'resolved').length}
                  </p>
                  <p className="text-sm text-gray-600">Resolved</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USER MANAGEMENT TAB (Admin Only) */}
        {activeTab === 'users' && currentUser.role === 'admin' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>

            {/* Pending Approvals */}
            {pendingUsers.length > 0 && (
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="font-medium text-yellow-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Pending Approvals ({pendingUsers.length})
                </h3>
                <div className="space-y-3">
                  {pendingUsers.map(user => (
                    <div key={user.id} className="bg-white p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveUser(user.id)}
                          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center space-x-1"
                        >
                          <UserCheck className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRejectUser(user.id)}
                          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center space-x-1"
                        >
                          <UserX className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Users */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">All Users</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {db.users.map(user => (
                  <div key={user.id} className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-13">
                        <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                          user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {user.status.toUpperCase()}
                        </span>
                        {user.role === 'skilled' && user.skills.length > 0 && (
                          <span className="text-xs text-gray-600">
                            Skills: {user.skills.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.role === 'skilled' && (
                        <p>Assigned: {db.tickets.filter(t => t.assignedTo === user.id && t.status !== 'resolved').length} tickets</p>
                      )}
                      {user.role === 'sales' && (
                        <p>Created: {db.tickets.filter(t => t.createdBy === user.id).length} tickets</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SupportAI;