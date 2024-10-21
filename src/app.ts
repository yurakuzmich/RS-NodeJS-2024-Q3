import { envVars } from './core/config';
import * as http from 'http';
import { UsersService } from './services/users-service';
import { ERROR_MESSAGES } from './models/error-codes';

const hostname = '127.0.0.1';
const port = envVars.PORT;

const userService = new UsersService();

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const urlSegments = req.url?.split('/');
  const urlParams = urlSegments?.slice(3);
  console.log('urlSegments', urlSegments);

  if (!urlSegments || urlSegments[1] !== 'api' || urlSegments[2] !== 'users') {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'We are sorry. It seems you\'ve entered incorrect URL' }));
    return;
  }

  let apiData = null;

  if (urlParams && urlParams.length > 0) {
    const id = urlParams[0];

    switch (req.method) {
      case 'GET':
        try {
          apiData = userService.getUserById(id);
          res.end(JSON.stringify(apiData));
        } catch (error: unknown) {
          res.statusCode = 500;
          if (error instanceof Error) {
            if (error.name === ERROR_MESSAGES.INVALID_ID) {
              res.statusCode = 400;
            } else if (error.name === ERROR_MESSAGES.USER_NOT_EXIST) {
              res.statusCode = 404;
            }
            res.end(JSON.stringify({ error: error.message }));
          }
        }
        break;

      case 'PUT':
        let putData = '';
        req.on('data', chunk => {
          putData += chunk;
        });

        req.on('end', () => {
          try {
            const userData = JSON.parse(putData);
            apiData = userService.updateUser(id, userData);
            res.end(JSON.stringify(apiData));
          } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid data format' }));
          }
        });
        return;

      case 'DELETE':
        apiData = userService.deleteUser(id);
        res.end(JSON.stringify(apiData));
        break;

      default:
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        break;
    }
  } else {
    switch (req.method) {
      case 'GET':
        apiData = userService.getUsers();
        res.end(JSON.stringify(apiData));
        break;

      case 'POST':
        let postData = '';
        req.on('data', chunk => {
          postData += chunk;
        });

        req.on('end', () => {
          try {
            const newUser = JSON.parse(postData);
            apiData = userService.createUser(newUser);
            res.end(JSON.stringify(apiData));
          } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid data format' }));
          }
        });
        return;

      default:
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        break;
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
