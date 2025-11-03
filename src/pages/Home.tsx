import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Zap,
  Target,
  BarChart3,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Eye,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type DashboardFeatures = {
  admin: string[];
  sales: string[];
  skilled: string[];
};

type Stat = {
  number: string;
  label: string;
};

type Problem = {
  icon: React.ReactNode;
  text: string;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeRole, setActiveRole] = useState<"admin" | "sales" | "skilled">(
    "admin"
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features: Feature[] = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Classification",
      description:
        "Automatically categorizes tickets into billing, technical, or account issues with 95% accuracy",
      color: "blue",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Assignment Engine",
      description:
        "Matches tickets with the perfect agent based on skills, expertise, and current workload",
      color: "purple",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Instant AI Solutions",
      description:
        "Gemini AI generates step-by-step troubleshooting guides for every ticket automatically",
      color: "green",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Role-Based Access",
      description:
        "Separate dashboards for Admin, Sales, and Support teams with custom permissions",
      color: "orange",
    },
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Sales Creates Ticket",
      description: "Customer issue is logged with all relevant details",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      number: "02",
      title: "AI Analyzes & Categories",
      description: "System classifies issue type, priority, and sentiment instantly",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      number: "03",
      title: "Auto-Assigns to Expert",
      description: "Ticket routes to the best-fit agent with matching skills",
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: "04",
      title: "AI Generates Solution",
      description: "Gemini creates custom troubleshooting steps immediately",
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  const dashboardFeatures: DashboardFeatures = {
    admin: [
      "View all tickets across entire system",
      "Manage users and approve registrations",
      "Reassign tickets to any agent",
      "Access real-time analytics and insights",
      "Delete and override any ticket",
      "System-wide performance monitoring",
    ],
    sales: [
      "Create tickets for customer issues",
      "Track all tickets you've created",
      "View ticket status updates in real-time",
      "Add customer details and context",
      "Delete your own tickets if needed",
      "Simple, focused dashboard for efficiency",
    ],
    skilled: [
      "View only tickets assigned to you",
      "Update ticket status (open/in-progress/resolved)",
      "See AI-generated troubleshooting steps",
      "Manage your skills and expertise",
      "Track your performance metrics",
      "Add resolution notes and comments",
    ],
  };

  const stats: Stat[] = [
    { number: "60%", label: "Faster Resolution" },
    { number: "95%", label: "Assignment Accuracy" },
    { number: "24/7", label: "AI Availability" },
    { number: "0", label: "Manual Routing" },
  ];

  const problems: Problem[] = [
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Hours wasted searching for the right person to handle tickets",
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: "Unbalanced workload causing agent burnout and inefficiency",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      text: "Tickets assigned to wrong experts leading to delays and escalations",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      text: "Agents spending time researching solutions for common issues",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SupportAI
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <button
                onClick={() => navigate('/app/login')}
                className="px-4 lg:px-6 py-2 text-white/90 hover:text-white font-medium transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/app/signup')}
                className="px-4 lg:px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-medium shadow-lg hover:shadow-xl cursor-pointer"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <button
                onClick={() => {
                  navigate('/app/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-white font-medium text-left hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate('/app/signup');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg cursor-pointer"
              >
                Start Free Trial
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-lg">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium">Powered by Gemini AI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Stop Wasting Hours on{' '}
              <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Ticket Assignment
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed px-4">
              AI-Powered Support Automation That Assigns, Solves, and Tracks Tickets in Seconds.
              Transform your SaaS support from chaos to clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
              <button
                onClick={() => navigate('/app/signup')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold text-base sm:text-lg shadow-lg cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-xs sm:text-sm text-white/70 px-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20 max-w-5xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all shadow-lg">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-white/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              The Support Ticket Nightmare
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Manual ticket routing is killing your team's productivity and frustrating your customers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-red-500/10 backdrop-blur-xl rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-all shadow-lg"
              >
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 backdrop-blur-xl">
                  {problem.icon}
                </div>
                <p className="text-white/90 font-medium pt-1 sm:pt-2 text-sm sm:text-base">{problem.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 px-4">
            <div className="inline-block bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-yellow-300">
                📊 73% of support delays happen at the assignment stage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              <span className="font-medium text-sm sm:text-base">The Solution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Meet SupportAI
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Transform manual chaos into automated intelligence. Every ticket assigned, categorized, and solved in seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Instant Assignment", desc: "Tickets are auto-assigned in seconds, not hours. Zero manual searching.", color: "yellow" },
                { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Perfect Match Every Time", desc: "AI ensures tickets go to experts with the right skills and availability.", color: "green" },
                { icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Balanced Workload", desc: "Automatically distributes tickets to prevent agent burnout.", color: "purple" },
                { icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Ready-Made Solutions", desc: "Gemini AI generates troubleshooting steps instantly for faster resolution.", color: "pink" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-${item.color}-500/20 backdrop-blur-xl rounded-xl flex items-center justify-center text-${item.color}-400 border border-${item.color}-500/20`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm font-medium text-white/60">BEFORE vs AFTER</span>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { label: "Avg. Assignment Time", before: "45 mins", after: "30 secs" },
                    { label: "Assignment Accuracy", before: "65%", after: "95%" },
                    { label: "Resolution Time", before: "8 hours", after: "3.2 hours" }
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 sm:pb-4 border-b border-white/10">
                      <span className="text-white/80 text-sm sm:text-base">{metric.label}</span>
                      <div className="text-right">
                        <div className="text-red-400 line-through text-xs sm:text-sm">{metric.before}</div>
                        <div className="text-green-400 font-bold text-sm sm:text-base">{metric.after}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Powerful Features That Transform Support
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Everything you need to automate and optimize your support operations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-2xl"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              How SupportAI Works
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
              From ticket creation to resolution in 4 automated steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-2xl">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/10 mb-3 sm:mb-4">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-white/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Dashboards */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Built for Every Role in Your Team
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Customized dashboards with role-specific features and permissions
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
            {['admin', 'sales', 'skilled'].map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all cursor-pointer text-sm sm:text-base ${activeRole === role
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 hover:bg-white/10'
                  }`}
              >
                {role === 'admin' ? '👑 Admin' : role === 'sales' ? '💼 Sales' : '🎯 Support Agent'}
              </button>
            ))}
          </div>

          {/* Role Content */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 capitalize">
                  {activeRole} Dashboard
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {dashboardFeatures[activeRole].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-white/90 font-medium text-sm sm:text-base">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                      {activeRole === 'admin' ? <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-white" /> :
                        activeRole === 'sales' ? <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-white" /> :
                          <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />}
                    </div>
                    <span className="font-semibold text-sm sm:text-base capitalize">{activeRole} View</span>
                  </div>
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="h-3 sm:h-4 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="h-3 sm:h-4 bg-white/10 rounded-full animate-pulse w-3/4"></div>
                  <div className="h-20 sm:h-24 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl backdrop-blur-xl border border-white/10"></div>
                  <div className="h-3 sm:h-4 bg-white/10 rounded-full animate-pulse w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Transform Your Support?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 px-4">
              Join innovative SaaS companies using AI to deliver lightning-fast support
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button
                onClick={() => navigate('/app/signup')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/app/login')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold text-base sm:text-lg shadow-lg cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-xs sm:text-sm text-white/60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/20 backdrop-blur-xl border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                  <Brain className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">SupportAI</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60">
                AI-powered support automation for modern SaaS teams
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/60">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/60">
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-white/40">
            <p>&copy; 2024 SupportAI. All rights reserved. Powered by Gemini AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
