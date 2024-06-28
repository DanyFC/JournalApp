/**
 * @jest-environment jsdom
*/
import { activeNoteState } from '../../fixtures/journal'
import { fireEvent, render, screen } from '@testing-library/react'
import Note from './Note'

/* eslint-disable no-undef */
const mockUseSelector = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => (fn) => fn(),
  useSelector: () => mockUseSelector()
}))

const mockStartDeleteNote = jest.fn()
const mockStartUpdateNote = jest.fn()
const mockStartUploadingFiles = jest.fn()

jest.mock('./../../store/journal/thunks', () => ({
  startDeleteNote: () => () => mockStartDeleteNote(),
  startUpdateNote: (formState) => () => mockStartUpdateNote(formState),
  startUploadingFiles: (formState, files) => () => mockStartUploadingFiles(formState, files)
}))

describe('Tests in <Note />', () => {

  beforeEach(() => jest.clearAllMocks())

  test.skip('Should call startUpdateNote when save button is clicked.', () => {
    mockUseSelector.mockReturnValue(activeNoteState)
    render(<Note />)

    const saveButton = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(saveButton)

    expect(mockStartUpdateNote).toHaveBeenCalledWith(activeNoteState.activeNote)
  })

  test.skip('Should call startDeleteNote when delete button is clicked.', () => {
    mockUseSelector.mockReturnValue(activeNoteState)
    render(<Note />)

    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    fireEvent.click(deleteButton)

    expect(mockStartDeleteNote).toHaveBeenCalled()
  })

  test('Should call startUploadingFiles when input file is changed.', () => {
    mockUseSelector.mockReturnValue(activeNoteState)
    render(<Note />)

    const buttonFile = screen.getByLabelText('file-btn')
    const files = [
      new File(['hello'], 'hello.png', { type: 'image/png' }),
      new File(['there'], 'there.png', { type: 'image/png' }),
    ]
    console.log("🚀 ~ test ~ files:", files)
    fireEvent.change(buttonFile, { target: { files } })

    expect(mockStartUploadingFiles).toHaveBeenCalledWith(activeNoteState.activeNote, files)
  })
})
/* eslint-enable no-undef */
