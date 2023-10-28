type SuccessHandler = {
  success: boolean;
  message: string;
};

type CreateNewDuty = {
  name: string;
};

type UpdateDuty = {
  id: number;
  name: string;
};

type DeleteDuty = {
  id: number;
};
export { SuccessHandler, CreateNewDuty, UpdateDuty, DeleteDuty };
