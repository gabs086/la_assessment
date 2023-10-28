import { GraphQLInt, GraphQLString } from 'graphql';
import dayjs from 'dayjs';

import connection from 'server/Db';
import { MessageType } from 'server/Schema/TypeDef';
import { successResponse } from 'server/Helpers/handlers';
import { CreateNewDuty, UpdateDuty, DeleteDuty } from 'server/Helpers/types';
import { CONTANTS } from 'server/Helpers/contants';
import loggerHelper from 'server/Helpers/logger';

const CREATE_NEW_DUTY = {
  type: MessageType,
  args: {
    name: {
      type: GraphQLString,
    },
  },
  async resolve(parent: any, args: CreateNewDuty) {
    try {
      const client = await connection.connect();
      const { name } = args;

      if (!name) {
        loggerHelper('error', CONTANTS.REQUIRED_DUTY_NAME);
        throw new Error(CONTANTS.REQUIRED_DUTY_NAME);
      }
      await client.query(`INSERT INTO duties (name) VALUES ('${name}');`);
      const response = successResponse(CONTANTS.SUCCESS_SAVED);
      loggerHelper('info', response);
      return response;
    } catch (error) {
      loggerHelper('error', error);
      throw new Error(error);
    }
  },
};

const UPDATE_NEW_DUTY = {
  type: MessageType,
  args: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
  async resolve(parent: any, args: UpdateDuty) {
    try {
      const { id, name } = args;
      const client = await connection.connect();
      const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

      if (!id && !name) {
        loggerHelper('error', CONTANTS.REQUIRED_DUTY_ID_NAME);
        throw Error(CONTANTS.REQUIRED_DUTY_ID_NAME);
      }

      const data = await client.query(`SELECT * FROM duties where id = ${id};`);

      if (data.rowCount < 1) {
        loggerHelper('error', CONTANTS.NO_ITEM_TO_PROCESS);

        throw Error(CONTANTS.NO_ITEM_TO_PROCESS);
      }

      await client.query(`UPDATE duties SET name = '${name}', updatedat = '${currentDate}' WHERE id = ${id};`);

      const response = successResponse(`Update duty with ID: ${id} Successfully`);
      loggerHelper('info', response);
      return response;
    } catch (error) {
      loggerHelper('error', error);
      throw Error(error);
    }
  },
};

const DELETE_DUTY = {
  type: MessageType,
  args: {
    id: { type: GraphQLInt },
  },
  async resolve(parent: any, args: DeleteDuty) {
    try {
      const { id } = args;
      const client = await connection.connect();

      if (!id) {
        loggerHelper('error', CONTANTS.REQUIRED_DUTY_ID);
        throw Error(CONTANTS.REQUIRED_DUTY_ID);
      }

      const data = await client.query(`SELECT * FROM duties where id = ${id};`);

      if (data.rowCount < 1) {
        loggerHelper('error', CONTANTS.NO_ITEM_TO_PROCESS);

        throw Error(CONTANTS.NO_ITEM_TO_PROCESS);
      }

      await client.query(`DELETE FROM duties where id = ${id}`);

      const response = successResponse(`Deleted duty with ID: ${id} Successfully`);
      loggerHelper('info', response);
      return response;
    } catch (error) {
      loggerHelper('error', error);
      throw Error(error);
    }
  },
};

export { CREATE_NEW_DUTY, UPDATE_NEW_DUTY, DELETE_DUTY };
