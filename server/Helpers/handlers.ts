import { SuccessHandler } from './types';

const successResponse = (message: string): SuccessHandler => {
  return {
    success: true,
    message,
  };
};

export { successResponse };
