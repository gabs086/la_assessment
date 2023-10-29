import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { HeaderWrapper, ButtonWrapper } from '@/components/widgets/StyledWidgets';
import { Props } from './types';

export default function Header(props: Props) {
  const { addModal } = props;
  return (
    <>
      <HeaderWrapper>
        <Typography.Title level={2}>CRUD Web Application</Typography.Title>
      </HeaderWrapper>

      <ButtonWrapper>
        <Button type='primary' onClick={() => addModal.setTrue()} icon={<PlusOutlined />}>
          Add
        </Button>
      </ButtonWrapper>
    </>
  );
}
