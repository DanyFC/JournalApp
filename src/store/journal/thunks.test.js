/**
 * @jest-environment jsdom
*/
import { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { startLoadingNotes, startNewNote, startUpdateNote } from './thunks'

/* eslint-disable no-undef */
describe('Tests for thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const uid = 'TEST-UID'

  beforeEach(async () => {
    jest.clearAllMocks()

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)

    const deletePromises = []
    docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
    await Promise.all(deletePromises)
  })


  test('startNewNote must create a new blank note.', async () => {
    getState.mockReturnValue({ auth: { uid } })

    await startNewNote()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(setSaving())
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
      title: '',
      body: '',
      date: expect.any(Number),
      id: expect.any(String),
      imageUrls: []
    }))
    expect(dispatch).toHaveBeenCalledWith(setActiveNote({
      title: '',
      body: '',
      date: expect.any(Number),
      id: expect.any(String),
      imageUrls: []
    }))
  })

  test('startLoadingNotes must load notes from firebase.', async () => {
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: []
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id

    getState.mockReturnValue({ auth: { uid } })

    await startLoadingNotes()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(setNotes([newNote]))
  }, 10000)

  test('startUpdateNote must update a note.', async () => {
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: []
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id

    const updatedNote = { ...newNote, title: 'updated', body: 'this is a new body' }

    getState.mockReturnValue({ auth: { uid } })

    await startUpdateNote(updatedNote)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(setSaving())
    expect(dispatch).toHaveBeenCalledWith(updateNote(updatedNote))
  }, 10000)
})
/* eslint-enable no-undef */
