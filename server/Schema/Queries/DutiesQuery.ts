import { GraphQLList } from 'graphql';

import { DutiesType } from '../TypeDef/DutiesType';
import connection from '../../Db';

export const GET_ALL_DUTIES = {
  type: new GraphQLList(DutiesType),
  async resolve() {
    try {
      const client = await connection.connect();
      const data = await client.query('SELECT * FROM duties ORDER BY createdat DESC;');
      return data.rows;
    } catch (error) {
      console.log('err', error);
      throw Error(error);
    }
  },
};
