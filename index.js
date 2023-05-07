const express = require('express');
const app = express();
const path = require('path');

const root = path.join(__dirname, 'client/build');

app.use(express.static(root));

// Catch-all route to serve index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log('React server started');
});
