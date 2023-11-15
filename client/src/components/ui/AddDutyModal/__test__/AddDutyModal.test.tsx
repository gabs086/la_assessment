import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { UseBooleanOutput } from '@/hooks/useModal';
import AddDutyModal from '..';

jest.mock('../../../../graphql');
jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  const { Form } = antd;

  const { result } = renderHook(() => Form.useForm());

  return {
    ...antd,
    notification: {
      success: jest.fn(),
      error: jest.fn(),
    },
    Modal: jest.fn(),
    Form: {
      ...Form,
      useForm: () => [
        {
          ...result.current[0],
          scrollToField: jest.fn(),
          setFieldValue: jest.fn(),
        },
      ],
    },
  };
});
jest.mock('@apollo/client', () => ({
  gql: jest.fn(),
  useMutation: jest.fn().mockReturnValue([
    jest.fn(),
    {
      data: {
        createNewDuty: {
          success: true,
        },
      },
    },
  ]),
}));

jest.mock('react-dom', () => ({
  createPortal: jest.fn((element, _) => element),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('AddDutyModal', () => {
  it('renders correctly', () => {
    const addModal: UseBooleanOutput = {
      value: true,
      setValue: jest.fn(),
      setTrue: jest.fn(),
      setFalse: jest.fn(),
      toggle: jest.fn(),
    };

    const tree = renderer
      .create(
        <div>
          <AddDutyModal addModal={addModal} />
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
