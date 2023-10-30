import renderer from 'react-test-renderer';
import { UseBooleanOutput } from '@/hooks/useModal';
import Header from '..';

jest.mock('../../../../graphql');
jest.mock('antd');

describe('Header', () => {
  it('renders correctly', () => {
    const addModal: UseBooleanOutput = {
      value: false,
      setValue: jest.fn(),
      setTrue: jest.fn(),
      setFalse: jest.fn(),
      toggle: jest.fn(),
    };

    const tree = renderer
      .create(
        <div>
          <Header addModal={addModal} />
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
