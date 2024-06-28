/**
 * @jest-environment jsdom
*/
import { activeNoteState, demoNote, initialState, notes, photoUrls, updatedDemoNote } from './../../fixtures/journal'
import {
  journalSlice,
  addNewEmptyNote,
  clearState,
  deleteNoteById,
  setActiveNote,
  setPhotosToActiveNote,
  setNotes,
  setSaving,
  updateNote
} from './journalSlice';

/* eslint-disable no-undef */
describe('Tests for journalSlice', () => {

  test('Should return the initial state.', () => {
    const state = journalSlice.reducer(initialState, {})

    expect(state).toEqual(initialState)
  })

  test('Should add a empty note.', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(demoNote))

    expect(state.notes).toHaveLength(1)
    expect(state.notes).toContain(demoNote)
    expect(state.isSaving).toBeFalsy()
  })

  test('Should clear the state.', () => {
    const state = journalSlice.reducer(activeNoteState, clearState())

    expect(state).toEqual(initialState)
  })

  test('Should delete a note by id.', () => {
    const state = journalSlice.reducer(activeNoteState, deleteNoteById(demoNote.id))

    expect(state.notes).toHaveLength(activeNoteState.notes.length - 1)
    expect(state.notes).not.toContainEqual(demoNote)
    expect(state.savedMessage).toBe(`The note was successfully deleted.`)
    expect(state.isSaving).toBeFalsy()
  })

  test('Should set a active note.', () => {
    const state = journalSlice.reducer(activeNoteState, setActiveNote(demoNote))

    expect(state.activeNote).toEqual(demoNote)
  })

  test('Should more urls to active note.', () => {
    const state = journalSlice.reducer(activeNoteState, setPhotosToActiveNote(photoUrls))

    expect(state.activeNote.imageUrls.length).toBeGreaterThan(demoNote.imageUrls.length)
    photoUrls.forEach(url => expect(state.activeNote.imageUrls).toContain(url))
    expect(state.isSaving).toBeFalsy()
  })

  test('Should set the notes.', () => {
    const state = journalSlice.reducer(initialState, setNotes(notes))

    expect(state.notes).toEqual(notes)
    expect(state.isSaving).toBeFalsy()
  })

  test('Should change the saving state.', () => {
    const state = journalSlice.reducer(initialState, setSaving())

    expect(state.isSaving).toBeTruthy()
  })

  test('Should update a note.', () => {
    const state = journalSlice.reducer(activeNoteState, updateNote(updatedDemoNote))

    expect(state.notes).toHaveLength(activeNoteState.notes.length)
    expect(state.notes).toContainEqual(updatedDemoNote)
    expect(state.savedMessage).toBe(`The note "${updatedDemoNote.title}" was successfully updated.`)
    expect(state.isSaving).toBeFalsy()
  })

})
/* eslint-enable no-undef */
