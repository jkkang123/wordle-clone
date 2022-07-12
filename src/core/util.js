import { rowNum, columnNum } from './constants/strings'
import { wordList } from './constants/wordlist'

export const makeTempArray = () => {
  return new Array(columnNum).fill('').map(() => 
  [...new Array(rowNum).fill({
    text: '',
    status: '',
  })])
}

export const makeAnswer = () => {
  return wordList[Math.floor(Math.random() * wordList.length)]
}