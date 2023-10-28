"use strict";
// import { Pool } from 'pg';
// import * as dotenv from 'dotenv';
// import connection from 'server/Db';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_graphql_1 = require("express-graphql");
const Schema_1 = require("server/Schema");
const app = (0, express_1.default)();
const PORT = 5000;
const corsConfig = {
    origin: process.env.CLIENT_BASE_URL,
};
app.use((0, cors_1.default)(corsConfig));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: Schema_1.schema,
    graphiql: true,
}));
app.listen(PORT, () => console.log(`App running in port ${PORT}`));
//# sourceMappingURL=index.js.map