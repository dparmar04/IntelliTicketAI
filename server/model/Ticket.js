// server/models/Ticket.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: String,
  description: String,
  customerEmail: String,
  customerName: String,
  category: String,
  priority: String,
  sentiment: String,
  status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  assignedToName: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdByName: String,
  createdAt: { type: Date, default: Date.now },
  troubleshootSteps: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  escalationRisk: { type: String, enum: ['high', 'low'], default: 'low' }
});

module.exports = mongoose.model('Ticket', TicketSchema);
