import renderer from 'react-test-renderer';
import { HeaderWrapper, ButtonWrapper } from '../StyledWidgets';

describe('StyledWidgets', () => {
  it('renders HeaderWrapper correctly', () => {
    const tree = renderer
      .create(
        <div>
          <HeaderWrapper>Test</HeaderWrapper>
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ButtonWrapper correctly', () => {
    const tree = renderer
      .create(
        <div>
          <ButtonWrapper>Test</ButtonWrapper>
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
