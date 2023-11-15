import { useEffect } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';
import { useMutation } from '@apollo/client';

import { CREATE_NEW_DUTY } from '@/graphql/Mutations';
import { GET_ALL_DUTIES } from '@/graphql/Queries';

import { Props, FieldType } from './types';

export default function AddDutyModal(props: Props) {
  const { addModal } = props;

  const [createNewDuty, createNewDutyMutations] = useMutation(CREATE_NEW_DUTY, {
    refetchQueries: [GET_ALL_DUTIES, 'getAllDuties'],
    onCompleted: (data) => {
      console.log('data:', data);
    },
  });

  const [form] = Form.useForm();

  const onFinish = (values: FieldType) => {
    const { name } = values;
    createNewDuty({
      variables: {
        name,
      },
    });

    addModal.setFalse();
    form.resetFields();
  };

  useEffect(() => {
    if (createNewDutyMutations?.data?.createNewDuty?.success) {
      notification.success({
        message: `Success`,
        description: createNewDutyMutations.data?.createNewDuty?.message,
        placement: 'bottomRight',
      });
    }

    if (createNewDutyMutations?.error) {
      notification.error({
        message: `Notification`,
        description: 'Something went wrong. Please try again later. Thank you',
        placement: 'bottomRight',
      });
    }
  }, [createNewDutyMutations?.data, createNewDutyMutations?.error]);

  return (
    <>
      <Modal title='Modal 1000px width' footer={[]} centered open={addModal.value} forceRender onCancel={() => addModal.setFalse()}>
        <Form form={form} name='addDuty' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{}} onFinish={onFinish} autoComplete='off'>
          <Form.Item<FieldType> label='Duty name' name='name' rules={[{ required: true, message: 'Name of duty is required!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' disabled={createNewDutyMutations.loading} onClick={form.submit}>
              {createNewDutyMutations.loading ? 'Loading...' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
