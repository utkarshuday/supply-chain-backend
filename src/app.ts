import express from 'express';
import router from './routes';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

const app = express();

const whitelist = ['http://localhost:5173', 'http://localhost:5174'];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(morgan('combined'));
app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

export default app;
