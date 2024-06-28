import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    savedMessage: null,
    notes: [],
    activeNote: null // INFO: {id: string, title: string, body: string, date: Date, imageUrls: array}
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    clearState: (state) => {
      state.isSaving = false
      state.savedMessage = null
      state.notes = []
      state.activeNote = null
    },
    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
      state.savedMessage = `The note was successfully deleted.`
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload
    },
    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload]
      state.isSaving = false
    },
    setNotes: (state, action) => {
      state.notes = action.payload
      state.isSaving = false
    },
    setSaving: (state) => {
      state.isSaving = true
      state.savedMessage = null
    },
    updateNote: (state, action) => {
      const { id, title, body, imageUrls } = action.payload
      state.notes = state.notes.map(note => {
        if (note.id === id) return { ...note, title, body, imageUrls }
        return note
      })
      state.savedMessage = `The note "${title}" was successfully updated.`
      state.isSaving = false
    }
  },
})

export const {
  addNewEmptyNote,
  clearState,
  deleteNoteById,
  setActiveNote,
  setPhotosToActiveNote,
  setNotes,
  setSaving,
  updateNote
} = journalSlice.actions