import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './Schema';
import loggerHelper from './Helpers/logger';

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
