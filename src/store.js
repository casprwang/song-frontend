import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  notes: [],
  draft: {
    content: ''
  }
}


const rootReducer = (state, action) => {
  switch (action.type) {
  case 'LOAD_NOTES':
    return {
      ...state,
      notes: [...action.payload]
    }
  case 'DRAFT_CHANGE':
    return {
      ...state,
      notes: [...state.notes],
      draft: {
        content: action.payload
      }
    }
  case 'ADD_NOTE':
    return {
      ...state,
      draft: {
        content: ''
      },
      notes: [...state.notes, action.payload]
    }
  case 'DELETE_NOTE':
    return {
      ...state
    }
  default:
    return state
  }
}


const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware))

export default store
