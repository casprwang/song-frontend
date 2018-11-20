import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  notes: [],
  editContent: '',
  isEditing: false,
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
  case 'START_EDIT':
    return {
      ...state,
      isEditing: true,
      editContent: action.payload
    }
  case 'EDIT_CHANGE':
    return {
      ...state,
      isEditing: true,
      editContent: action.payload
    }
  case 'EDIT_NOTE':
    return {
      ...state,
      isEditing: false,
      editContent: ''
    }
  case 'DELETE_NOTE':
    return {
      ...state
    }
  default:
    return state
  }
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunkMiddleware)
)

export default store
