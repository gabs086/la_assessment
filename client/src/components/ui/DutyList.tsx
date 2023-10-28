import { Space, Table, notification, Button, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useQuery, useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { GET_ALL_DUTIES } from '../../graphql/Queries';
import { DELETE_DUTY } from '../../graphql/Mutations';

interface DataType {
  id: number;
  name: string;
}

type Props = {
  setEditValues: Dispatch<SetStateAction<{}>>;
  setOpenEditModal: () => void;
};

const DutyList = ({ setEditValues, setOpenEditModal }: Props) => {
  const duties = useQuery(GET_ALL_DUTIES);
  const [id, setId] = useState<number>(0);

  const [deleteDuty, { data, loading, error }] = useMutation(DELETE_DUTY, {
    refetchQueries: [GET_ALL_DUTIES, 'getAllDuties'],
  });

  const confirmDelete = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    deleteDuty({
      variables: {
        id,
      },
    });
  };

  const cancelDelete = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log(e);
  };

  const columns = (): ColumnsType<DataType> => [
    {
      title: 'Duty Id No,',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Duty Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            shape='round'
            onClick={() => {
              setEditValues(record);
              setOpenEditModal();
            }}
            icon={<EditOutlined />}
          />
          <Popconfirm title='Delete the task' description='Are you sure to delete this task?' onConfirm={confirmDelete} onCancel={cancelDelete} okText='Yes' cancelText='No'>
            <Button shape='round' onClick={() => setId(record?.id)} icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (duties?.error) {
      notification.error({
        message: `Notification`,
        description: 'Something went wrong. Please try again later. Thank you',
        placement: 'bottomRight',
      });
    }
  }, [duties?.error]);

  useEffect(() => {
    if (data?.deleteDuty?.success) {
      notification.info({
        message: `Notification`,
        description: data?.deleteDuty?.message,
        placement: 'bottomRight',
      });
    }
  }, [data]);

  return <Table columns={columns()} loading={duties?.loading} dataSource={duties?.data?.getAllDuties || []} />;
};

export default DutyList;
