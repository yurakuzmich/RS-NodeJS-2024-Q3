import { envVars } from './core/config';
import * as http from 'http';

const hostname = '127.0.0.1';
const port = envVars.PORT;

const result = {
    hello: 'world',
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');


  if (req.url === '/api/users') {
    res.end(JSON.stringify(result));
    return;
  }

  res.statusCode = 404;
  res.end('We are sorry. It seems you\'ve entered incorrect URL');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});