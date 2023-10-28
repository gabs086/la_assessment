//* Libraries
import { ApolloProvider, useMutation, ApolloClient, InMemoryCache } from '@apollo/client';
import { useEffect, useState } from 'react';

//*Antd
import { Button, Modal, Form, Input, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

//* Components
import DutyList from './components/ui/DutyList';
import Container from './components/widgets/Container';

import { useModal } from './hooks/useModal';

import { CREATE_NEW_DUTY, UPDATE_NEW_DUTY } from './graphql/Mutations';
import { GET_ALL_DUTIES } from './graphql/Queries';

type FieldType = {
  name: string;
};

interface EditValues {
  id?: number;
  name?: string;
}

function App() {
  const addModal = useModal(false);
  const editModal = useModal(false);
  const [editValues, setEditValues] = useState<EditValues>({});
  const [form] = Form.useForm();

  const [createNewDuty, createNewDutyMutations] = useMutation(CREATE_NEW_DUTY, {
    refetchQueries: [GET_ALL_DUTIES, 'getAllDuties'],
  });

  const [updateDuty, updateNewDutyMutations] = useMutation(UPDATE_NEW_DUTY, {
    refetchQueries: [GET_ALL_DUTIES, 'getAllDuties'],
  });

  const onFinish = (values: FieldType) => {
    const { name } = values;
    createNewDuty({
      variables: {
        name,
      },
    });

    addModal.setFalse();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishEdit = (values: FieldType) => {
    console.log('Success:', values);
    const { name } = values;
    const id = editValues?.id;
    updateDuty({
      variables: {
        id,
        name,
      },
    });

    editModal.setFalse();
  };

  useEffect(() => {
    if (createNewDutyMutations?.data?.createNewDuty?.success) {
      notification.info({
        message: `Notification`,
        description: createNewDutyMutations.data?.createNewDuty?.message,
        placement: 'bottomRight',
      });
    }
  }, [createNewDutyMutations?.data]);

  useEffect(() => {
    if (updateNewDutyMutations?.data?.updateDuty?.success) {
      notification.info({
        message: `Notification`,
        description: updateNewDutyMutations.data?.updateDuty?.message,
        placement: 'bottomRight',
      });
    }
  }, [updateNewDutyMutations?.data]);

  useEffect(() => {
    form.setFieldValue('name', editValues?.name);
  }, [editValues]);

  return (
    <>
      {/* Modal for Adding  */}
      <Modal title='Modal 1000px width' footer={[]} centered open={addModal.value} onCancel={() => addModal.setFalse()}>
        <Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
          <Form.Item<FieldType> label='Duty name' name='name' rules={[{ required: true, message: 'Name of duty is required!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Edit  */}

      <Modal title='Modal 1000px width' footer={[]} centered open={editModal.value} onCancel={() => editModal.setFalse()}>
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            name: editValues?.name,
          }}
          onFinish={onFinishEdit}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType> label='Duty name' name='name' rules={[{ required: true, message: 'Name of duty is required!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Container>
        <Button type='primary' onClick={() => addModal.setTrue()} icon={<PlusOutlined />}>
          Add
        </Button>
        <DutyList setEditValues={setEditValues} setOpenEditModal={editModal.setTrue} />
      </Container>
    </>
  );
}

export default App;
