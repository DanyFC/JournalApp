/**
 * @jest-environment jsdom
*/
import { fireEvent, render, screen } from '@testing-library/react'
import { updatedDemoNote } from './../../fixtures/journal'
import SidebarItem from './SidebarItem'

/* eslint-disable no-undef */
jest.mock('react-redux', () => ({
  useDispatch: () => (fn) => fn()
}))

const mockedSetActiveNote = jest.fn()

jest.mock('./../../store/journal/journalSlice', () => ({
  setActiveNote: (note) => () => mockedSetActiveNote(note)
}))

describe('Tests in <SidebarItem />', () => {

  test('Can be match with snapshot.', () => {
    const { container } = render(<SidebarItem {...updatedDemoNote} />)

    expect(container).toMatchSnapshot()
  })

  test('Should be call setActiveNote when item button is clicked.', () => {
    render(<SidebarItem {...updatedDemoNote} />)

    const itemButton = screen.getByRole('button')
    fireEvent.click(itemButton)

    expect(mockedSetActiveNote).toHaveBeenCalledWith(updatedDemoNote)
  })
})
/* eslint-enable no-undef */
