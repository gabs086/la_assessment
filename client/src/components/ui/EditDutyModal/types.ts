import { UseBooleanOutput } from '../../../hooks/useModal';

interface EditValues {
  id?: number;
  name?: string;
}
export type Props = {
  editModal: UseBooleanOutput;
  editValues: EditValues;
};

export type FieldType = {
  name: string;
};
