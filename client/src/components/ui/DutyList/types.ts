import { Dispatch, SetStateAction } from 'react';

export interface DataType {
  id: number;
  name: string;
}

export type Props = {
  setEditValues: Dispatch<SetStateAction<{}>>;
  setOpenEditModal: () => void;
};
