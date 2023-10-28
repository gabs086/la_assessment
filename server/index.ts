// import { Pool } from 'pg';
// import * as dotenv from 'dotenv';
// import connection from 'server/Db';

// dotenv.config();

// async function main() {
//   // const pool = new Pool({
//   //   user: process.env.DB_USERNAME,
//   //   host: process.env.DB_HOST,
//   //   database: process.env.DB_NAME,
//   //   password: process.env.DB_PASSWORD,
//   //   port: 5432,
//   // });

//   // the pool will emit an error on behalf of any idle clients
//   // it contains if a backend error or network partition happens
//   connection.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
//   });

//   const client = await connection.connect();
//   const res = await client.query('SELECT * FROM duties WHERE id = $1', [1]);
//   console.log(res.rows[0]);

//   client.release();
// }

// main().catch((error: Error) => console.log(error));

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import { schema } from 'server/Schema';
import loggerHelper from 'server/Helpers/logger';

const app = express();
const PORT = 5000;
console.log('process.env:', process.env.NODE_ENV);

const corsConfig = {
  origin: process.env.CLIENT_BASE_URL,
};

app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//*Log all incoming request in production
app.use((req: express.Request, res: express.Response, next) => {
  loggerHelper('info', req.body);
  next();
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`App running in port ${PORT}`));
