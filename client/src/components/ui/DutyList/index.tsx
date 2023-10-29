import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { Space, Table, notification, Button, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { GET_ALL_DUTIES } from '@/graphql/Queries';
import { DELETE_DUTY } from '@/graphql/Mutations';

import { DataType, Props } from './types';

const DutyList = ({ setEditValues, setOpenEditModal }: Props) => {
  const duties = useQuery(GET_ALL_DUTIES);
  const [id, setId] = useState<number>(0);

  const [deleteDuty, deleteDutyMutations] = useMutation(DELETE_DUTY, {
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
      key: 'id',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Tooltip title='Edit' color='blue'>
            <Button
              shape='round'
              onClick={() => {
                setEditValues(record);
                setOpenEditModal();
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm title='Delete the task' description='Are you sure to delete this task?' onConfirm={confirmDelete} onCancel={cancelDelete} okText='Yes' cancelText='No'>
            <Tooltip title='Delete' color='red'>
              <Button shape='round' onClick={() => setId(record?.id)} icon={<DeleteOutlined />} danger />
            </Tooltip>
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
    if (deleteDutyMutations?.data?.deleteDuty?.success) {
      notification.info({
        message: `Info`,
        description: deleteDutyMutations?.data?.deleteDuty?.message,
        placement: 'bottomRight',
      });
    }

    if (deleteDutyMutations?.error) {
      notification.error({
        message: `Notification`,
        description: 'Something went wrong. Please try again later. Thank you',
        placement: 'bottomRight',
      });
    }
  }, [deleteDutyMutations?.data, deleteDutyMutations?.error]);

  return <Table columns={columns()} loading={duties?.loading} rowKey='id' dataSource={duties?.data?.getAllDuties || []} />;
};

export default DutyList;
