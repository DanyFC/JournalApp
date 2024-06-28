export const initialState = {
  activeNote: null,
  isSaving: false,
  notes: [],
  savedMessage: null,
}

export const activeNoteState = {
  activeNote: {
    id: '123',
    title: 'Demo Note',
    body: 'This is a demo note',
    date: 1643723400,
    imageUrls: [],
  },
  isSaving: false,
  notes: [
    {
      id: '1',
      title: 'First note',
      body: 'This is a first note',
      date: 1643723400,
      imageUrls: ['url1', 'url2'],
    },
    {
      id: '123',
      title: 'Demo Note',
      body: 'This is a demo note',
      date: 1643723400,
      imageUrls: [],
    }
  ],
  savedMessage: null,
}

export const photoUrls = ['url1', 'url2', 'url3']

export const demoNote = {
  id: '123',
  title: 'Demo Note',
  body: 'This is a demo note',
  date: 1643723400,
  imageUrls: [],
}

export const updatedDemoNote = {
  id: '123',
  title: 'Demo Note Updated',
  body: 'This is a demo note updated',
  date: 1643723400,
  imageUrls: ['url1', 'url2'],
}

export const notes = [
  {
    id: '1',
    title: 'First note',
    body: 'This is a first note',
    date: 1643723400,
    imageUrls: ['url1', 'url2'],
  },
  {
    id: '123',
    title: 'Demo Note',
    body: 'This is a demo note',
    date: 1643723400,
    imageUrls: [],
  }
]