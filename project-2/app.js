const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Simple home page
app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 My DevOps Web App</h1>
    <p>This app was deployed automatically!</p>
    <p>Current time: ${new Date().toLocaleString()}</p>
  `);
});

// Health check (important for deployment)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});