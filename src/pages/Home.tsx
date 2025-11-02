import React, { useState } from "react";
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
  const [activeRole, setActiveRole] = useState<"admin" | "sales" | "skilled">(
    "admin"
  );

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SupportAI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/app/login')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/app/signup')}
                className="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by Gemini AI</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Wasting Hours on{' '}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ticket Assignment
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              AI-Powered Support Automation That Assigns, Solves, and Tracks Tickets in Seconds.
              Transform your SaaS support from chaos to clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => navigate('/app/signup')}
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-2xl transition-all font-semibold text-lg flex items-center space-x-2 group cursor-pointer"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/app/login')}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:shadow-lg transition-all font-semibold text-lg border-2 border-gray-200 cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Support Ticket Nightmare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manual ticket routing is killing your team's productivity and frustrating your customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl border border-red-100"
              >
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                  {problem.icon}
                </div>
                <p className="text-gray-700 font-medium pt-2">{problem.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-block bg-yellow-100 border border-yellow-300 rounded-xl px-6 py-4">
              <p className="text-lg font-semibold text-yellow-900">
                📊 73% of support delays happen at the assignment stage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 bg-linear-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">The Solution</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet SupportAI
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transform manual chaos into automated intelligence. Every ticket assigned, categorized, and solved in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Assignment</h3>
                  <p className="text-blue-100">Tickets are auto-assigned in seconds, not hours. Zero manual searching.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Perfect Match Every Time</h3>
                  <p className="text-blue-100">AI ensures tickets go to experts with the right skills and availability.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Balanced Workload</h3>
                  <p className="text-blue-100">Automatically distributes tickets to prevent agent burnout.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ready-Made Solutions</h3>
                  <p className="text-blue-100">Gemini AI generates troubleshooting steps instantly for faster resolution.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="bg-white rounded-xl p-6 text-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">BEFORE vs AFTER</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Avg. Assignment Time</span>
                    <div className="text-right">
                      <div className="text-red-500 line-through text-sm">45 mins</div>
                      <div className="text-green-600 font-bold">30 secs</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Assignment Accuracy</span>
                    <div className="text-right">
                      <div className="text-red-500 line-through text-sm">65%</div>
                      <div className="text-green-600 font-bold">95%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Resolution Time</span>
                    <div className="text-right">
                      <div className="text-red-500 line-through text-sm">8 hours</div>
                      <div className="text-green-600 font-bold">3.2 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features That Transform Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to automate and optimize your support operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-xl flex items-center justify-center text-${feature.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How SupportAI Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ticket creation to resolution in 4 automated steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-6xl font-bold text-blue-100 mb-4">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Dashboards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every Role in Your Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Customized dashboards with role-specific features and permissions
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex justify-center space-x-4 mb-12">
            {(['admin', 'sales', 'skilled'] as Array<"admin" | "sales" | "skilled">).map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeRole === role
                  ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {role === 'admin' ? '👑 Admin' : role === 'sales' ? '💼 Sales' : '🎯 Support Agent'}
              </button>
            ))}
          </div>

          {/* Role Content */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
                  {activeRole} Dashboard
                </h3>
                <div className="space-y-4">
                  {dashboardFeatures[activeRole].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-gray-700 font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      {activeRole === 'admin' ? <Shield className="w-6 h-6 text-white" /> :
                        activeRole === 'sales' ? <MessageSquare className="w-6 h-6 text-white" /> :
                          <Target className="w-6 h-6 text-white" />}
                    </div>
                    <span className="font-semibold text-gray-900 capitalize">{activeRole} View</span>
                  </div>
                  <Eye className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-24 bg-linear-to-br from-blue-100 to-indigo-100 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-linear-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Support?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join innovative SaaS companies using AI to deliver lightning-fast support
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/app/signup')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl transition-all font-semibold text-lg flex items-center space-x-2 group cursor-pointer"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/app/login')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-semibold text-lg cursor-pointer"
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SupportAI</span>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered support automation for modern SaaS teams
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SupportAI. All rights reserved. Powered by Gemini AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
