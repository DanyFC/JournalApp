/**
 * @jest-environment jsdom
*/
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from './Navbar';

/* eslint-disable no-undef */
const mockedStartLogout = jest.fn()

jest.mock('./../../store/auth/thunks', () => ({
  startLogout: () => mockedStartLogout
}))

jest.mock('react-redux', () => ({
  useDispatch: () => (fn) => fn()
}))

describe('Tests in <Navbar />', () => {

  test('Can be match with snapshot. ', () => {
    const { container } = render(<Navbar drawerWidth={200} />)

    expect(container).toMatchSnapshot()
  })

  test('Should call startLogout when logout button is clicked.', () => {
    render(<Navbar />)

    const logoutButton = screen.getByLabelText('logout-btn')
    fireEvent.click(logoutButton)

    expect(mockedStartLogout).toHaveBeenCalled()
  })
})
/* eslint-enable no-undef */
