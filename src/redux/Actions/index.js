export const saveWord = word => ({
  type : "SAVE_WORD",
  payload: word
})

export const setAnswer = answer => ({
  type : "SET_ANSWER",
  payload : answer
})

export const resetWord = () => ({
  type : "RESET_WORD"
}) 

