import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { Server } from 'socket.io';

import sockets from './sockets';
import createServer from './utils/createServer';

const app = createServer();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 4040;

server.listen(port, () => {
  console.log(`\n[server] runnning on http://localhost:${port}\n`);

  sockets({ io });
});
