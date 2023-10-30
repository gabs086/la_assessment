import { renderHook, act } from '@testing-library/react-hooks';
import { useModal } from '../useModal';

test('show state can be set to true and false', () => {
  const { result } = renderHook(() => useModal());

  //default state
  expect(result.current.value).toBe(false);
  // use the handleShow method
  act(() => {
    result.current.setTrue();
  });
  //state must ne change to true
  expect(result.current.value).toBe(true);
  // use the handleClose method
  act(() => {
    result.current.setFalse();
  });
  //state must be false again
  expect(result.current.value).toBe(false);
});
