const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  role: { type: String, required: true },
  path: { type: String, required: true },
  name: { type: String, required: true },
  component: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
