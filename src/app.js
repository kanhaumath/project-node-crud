const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const client = require('prom-client'); // Import prom-client

const app = express();
const PORT = 3000;

// Create a Registry to register the metrics
const register = new client.Registry();

// Collect default metrics
client.collectDefaultMetrics({ register });

// Custom Metrics
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5], // Buckets for response time from 0.1s to 5s
});

register.registerMetric(httpRequestDurationMicroseconds);

// Middleware to collect metrics
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.url, code: res.statusCode });
  });
  next();
});

// Middleware
app.use(bodyParser.json());
app.use('/api', itemRoutes);

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// MongoDB Connection
const MONGO_URL = 'mongodb://mongo:27017/crudDB';
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
