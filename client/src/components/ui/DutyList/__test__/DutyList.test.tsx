import renderer from 'react-test-renderer';
import DutyList from '..';

jest.mock('../../../../graphql');
jest.mock('antd');
jest.mock('@apollo/client', () => ({
  gql: jest.fn(),
  useQuery: jest.fn().mockReturnValue({
    data: {
      getAllDuties: [1, 2, 3],
    },
    loading: false,
  }),
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

describe('DutyList', () => {
  it('renders correctly', () => {
    const setEditValues = jest.fn();
    const setOpenEditModal = jest.fn();

    const tree = renderer
      .create(
        <div>
          <DutyList setEditValues={setEditValues} setOpenEditModal={setOpenEditModal} />
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
