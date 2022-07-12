import produce from 'immer'
import {makeTempArray, makeAnswer} from '../../core/util'

const initialState = {
  word: makeTempArray(),
  answer: makeAnswer()
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_WORD':
      return produce(state, draft => {
        draft.word = action.payload
      })
    case 'SET_ANSWER':
      return produce(state, draft => {
        draft.answer = action.payload
      })
    default:
      return state
  }
}

export default reducer