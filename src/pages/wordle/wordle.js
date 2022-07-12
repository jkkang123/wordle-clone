import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import moment from 'moment'

import {WordleHeader, WordleTitle, WordleBody, WordleBoardContainer, WordleBoard, WordleBoardColumn, WordleTile} from './styles'
import { saveWord, resetWord, setAnswer } from '../../redux/Actions'
import { wordList } from '../../core/constants/wordlist'
import { columnNum, rowNum, toastMessage } from '../../core/constants/strings'
import { makeAnswer } from '../../core/util'

import Toast from '../../components/toast/toast'
import Kyeboard from '../../components/keyboard/kyeboard'
import Popup from '../../components/popup/popup'

function Wordle() {
  const savedWordle = useSelector(state => state.wordle)

  const [wordData, setWordData] = useState(savedWordle.word)
  const [currentWord, setCurrentWord] = useState('')
  const [answerWord, setAnswerWord] = useState(savedWordle.answer)
  const [rowIndex, setRowIndex] = useState(0)
  const [isToast, setIsToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('')
  const [isPopup, setIsPopup] = useState(false)
  const [canKeyClick, setCanKeyClick] = useState(true)
  const dispatch = useDispatch()
  
  const getRowIndex = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (!data[i][0].text) {
        return i
      }
    }
  }

  const isValidWord = (str) => {
    const lowerStr = str.toLowerCase()
    if (wordList.includes(lowerStr)) {
      return true
    } 
    return false
  }

  const isGameOver = (data) => {
    for (let i = 0; i < data.length; i++) {
      let count = 0
      for (let j = 0; j < data[i].length; j++) {
        const target = data[i][j]
        if (target.status === 'green') {
          count += 1
        }
        if (count === rowNum) {
          return true
        }
        if (!target.text) {
          return false
        }
      }
    }
    return true
  }

  const changeCurrentWord = (str, type) => {
    if (!canKeyClick) return
    updateWordData(str, type)
    if (type === 'enter' && isValidWord(str)) {
      setCurrentWord('')
    } else {
      setCurrentWord(str)
    }
  }

  const updateWordData = (str, type) => {
    let tempData = wordData.map(v=> v.map(i => Object.assign({}, i)))
    if (type === 'enter') {
      const lowerStr = str.toLowerCase()
      if (lowerStr.length < 5) {
        setIsToast(true)
        setToastMsg(toastMessage.notEnough)
        return
      }
      if (isValidWord(lowerStr)) {
        for (let i = 0; i < rowNum; i++) {
          if (lowerStr[i] === answerWord[i]) {
            tempData[rowIndex][i].status = 'green'
          } else if (answerWord.includes(lowerStr[i])) {
            tempData[rowIndex][i].status = 'yellow'
          } else {
            tempData[rowIndex][i].status = 'gray'
          }
        }
        dispatch(saveWord(tempData))
      } else {
        setIsToast(true)
        setToastMsg(toastMessage.inValidWord)
      }
    } else {
      for (let i = 0; i < rowNum; i++) {
        tempData[rowIndex][i].text = str[i] || ''
      }
      setWordData(tempData)
    }
  }

  const shareResult = () => {
    let result = []
    let firstLine = 'Wordle '
    firstLine += moment().format('YYYY-MM-DD HH:mm:ss')
    const [greenSq,yellowSq,graySq] = ['🟩', '🟨', '⬛']
    const arr = []

    for (let i = 0; i < wordData.length; i++) {
      let count = 0
      let str = ''
      for (let j = 0; j < wordData[i].length; j++) {
        const item = wordData[i][j]
        if (item.text) {
          if (item.status === 'green') {
            str += greenSq
            count += 1
          } else if (item.status === 'yellow') {
            str += yellowSq
          } else {
            str += graySq
          }
        }
      }
      arr.push(str)
      if (count === rowNum || i === columnNum - 1) {
        firstLine += ` ${i + 1}/${columnNum}`
        result.push(firstLine)
        result.push(arr.join('\n'))
        break
      }
    }
    navigator.clipboard.writeText(result.join('\n')).then(() => {
      setToastMsg(toastMessage.copyOnClipboard)
      setIsToast(true)
    }).catch (() => {
      setToastMsg(toastMessage.failOnClipboard)
      setIsToast(true)
    })
    
  }

  const replayGame = () => {
    dispatch(resetWord())
    dispatch(setAnswer(makeAnswer()))
    setCanKeyClick(true)
  }

  useEffect(() => {
    setRowIndex(getRowIndex(savedWordle.word))
    setWordData(savedWordle.word)
    setAnswerWord(savedWordle.answer)
    if (isGameOver(savedWordle.word)) {
      setCanKeyClick(false)
      setIsPopup(true)
    }
  }, [savedWordle])
  

  return (
    <>
      <WordleHeader>
        <WordleTitle>Wordle</WordleTitle>
      </WordleHeader>
      <WordleBody>
        <WordleBoardContainer>
          <WordleBoard>
            {
              wordData.map((item,index) => {
                return (
                  <WordleBoardColumn key={index}>
                    {item.map((i,idx) => {
                      return (
                        <WordleTile key={idx} color={i.status}>{i.text}</WordleTile>
                      )
                    })}
                  </WordleBoardColumn>
                )
              })
            }
          </WordleBoard>
        </WordleBoardContainer>
        <Kyeboard curretString={currentWord} onChangeString={changeCurrentWord}/>
        <Toast isActive={isToast} setIsActive={setIsToast} message={toastMsg}></Toast>
        <Popup isActive={isPopup} setIsActive={setIsPopup} shareResult={shareResult} replayGame={replayGame}></Popup>
      </WordleBody>
    </>
  )
}

export default Wordle