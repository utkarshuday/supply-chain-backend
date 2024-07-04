import http from 'http';
import app from './app';
import env from './types/env';

const PORT = env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
