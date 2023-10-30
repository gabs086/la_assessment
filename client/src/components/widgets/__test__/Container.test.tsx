import renderer from 'react-test-renderer';
import Container from '../Container';

jest.mock('antd');

describe('Container', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <div>
          <Container>Test</Container>
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
