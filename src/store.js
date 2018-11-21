import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  notes: [],
  editContent: '',
  isEditing: false,
  curEditId: '',
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
      curEditId: action.payload.id,
      isEditing: true,
      editContent: action.payload.content
    }
  case 'EDIT_CHANGE':
    return {
      ...state,
      isEditing: true,
      editContent: action.payload
    }
  case 'END_EDIT':
    return {
      ...state,
      curEditId: '',
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
