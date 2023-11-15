import { useEffect } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';
import { useMutation } from '@apollo/client';

import { UPDATE_NEW_DUTY } from '@/graphql/Mutations';
import { GET_ALL_DUTIES } from '@/graphql/Queries';
import { Props, FieldType } from './types';

export default function EditDutyModal(props: Props) {
  const { editModal, editValues } = props;

  const [form] = Form.useForm();

  const [updateDuty, updateNewDutyMutations] = useMutation(UPDATE_NEW_DUTY, {
    refetchQueries: [GET_ALL_DUTIES, 'getAllDuties'],
    onCompleted: (data: any) => {
      console.log('data:', data);
    },
  });

  const onFinish = (values: FieldType) => {
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
    if (updateNewDutyMutations?.data?.updateDuty?.success) {
      notification.success({
        message: `Success`,
        description: updateNewDutyMutations.data?.updateDuty?.message,
        placement: 'bottomRight',
      });
    }

    if (updateNewDutyMutations?.error) {
      notification.error({
        message: `Notification`,
        description: 'Something went wrong. Please try again later. Thank you',
        placement: 'bottomRight',
      });
    }
  }, [updateNewDutyMutations?.data, updateNewDutyMutations?.error]);

  useEffect(() => {
    form.setFieldValue('name', editValues?.name);
    // eslint-disable-next-line
  }, [editValues]);

  return (
    <>
      <Modal title='Modal 1000px width' footer={[]} centered open={editModal.value} forceRender onCancel={() => editModal.setFalse()}>
        <Form
          form={form}
          name='editDuty'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            name: editValues?.name,
          }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item<FieldType> label='Duty name' name='name' rules={[{ required: true, message: 'Name of duty is required!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' disabled={updateNewDutyMutations?.loading} onClick={form.submit}>
              {updateNewDutyMutations.loading ? 'Loading...' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
