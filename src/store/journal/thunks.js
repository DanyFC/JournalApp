import { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { fileUpload } from '../../helpers'
import { FirebaseDB } from '../../firebase/config'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: []
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const querySnapshot = await getDocs(collectionRef)
    const notes = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    dispatch(setNotes(notes))
  }
}

export const startUpdateNote = (note) => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    const noteToFirestore = { ...note }
    delete noteToFirestore.id
    await setDoc(noteRef, noteToFirestore, { merge: true })

    dispatch(updateNote(note))
  }
}

export const startUploadingFiles = (note, files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())

    const fileUploadPromises = []
    for (const file of files) fileUploadPromises.push(fileUpload(file))
    const photosUrls = await Promise.all(fileUploadPromises)

    dispatch(setActiveNote(note))
    dispatch(setPhotosToActiveNote(photosUrls))
  }
}

export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())
    const { uid } = getState().auth
    const { id } = getState().journal.activeNote
    const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`)
    await deleteDoc(noteRef)
    dispatch(deleteNoteById(id))
    dispatch(setActiveNote(null))
  }
}