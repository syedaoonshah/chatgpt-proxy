const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 80;

// Main page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>ChatGPT Proxy</title></head>
      <body style="font-family: Arial; text-align: center; margin: 50px;">
        <h1>🤖 ChatGPT Proxy</h1>
        <p>✅ Server is running on Railway!</p>
        <a href="/chatgpt" style="background: #10a37f; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px;">Access ChatGPT</a>
        <br><br>
        <a href="/test">Test</a> | <a href="/health">Health</a>
      </body>
    </html>
  `);
});

// Test endpoint
app.get('/test', (req, res) => {
  res.send('Node.js proxy is working!\nTime: ' + new Date().toISOString());
});

// Health endpoint  
app.get('/health', (req, res) => {
  res.send('OK');
});

// ChatGPT proxy
app.use('/chatgpt', createProxyMiddleware({
  target: 'https://chatgpt.com',
  changeOrigin: true,
  pathRewrite: {
    '^/chatgpt': '', // Remove /chatgpt prefix
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Host', 'chatgpt.com');
  }
}));

app.listen(PORT, () => {
  console.log(`ChatGPT Proxy running on port ${PORT}`);
});
