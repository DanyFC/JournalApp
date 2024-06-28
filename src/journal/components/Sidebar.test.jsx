/**
 * @jest-environment jsdom
*/
import { activeNoteState } from '../../fixtures/journal'
import { authenticatedState } from '../../fixtures/auth'
import { authSlice } from '../../store/auth'
import { configureStore } from '@reduxjs/toolkit'
import { journalSlice } from '../../store/journal'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import Sidebar from './Sidebar'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer
  },
  preloadedState: {
    auth: authenticatedState,
    journal: activeNoteState
  }
})

/* eslint-disable no-undef */
describe('Tests in <Sidebar />', () => {

  test('Can be match with snapshot.', () => {
    const { container } = render(
      <Provider store={store}>
        <Sidebar drawerWidth={200} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })
})
/* eslint-enable no-undef */
