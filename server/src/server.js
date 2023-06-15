// Thinking: server連線跟 app 功能做分開，對於後面需要做即時資訊交換的功能可以更清楚。

const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})