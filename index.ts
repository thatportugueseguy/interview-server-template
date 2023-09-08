import http from 'http';
import { type AddressInfo } from 'net';

import app from './app';
import { DEFAULT_PORT } from './constants';

// parse the environment port or use the default one
// slight types hack to keep the code short
const envPort = parseInt(process.env.PORT!, 10);
let port = isNaN(envPort) ? DEFAULT_PORT : process.env.PORT;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${(server.address()! as AddressInfo).port}`);
});
