import styled from 'styled-components'
import Key from './kye'
import { defaultKeyboardString, rowNum } from '../../core/constants/strings'
import { useSelector } from "react-redux"
import { useCallback, useEffect, useState } from 'react'

const KeyBoardContainer = styled.div`
  height: 200px;
  margin: 0 8px;
  user-select: none;
`

const KeyboardRow = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
`

function Kyeboard({onChangeString, curretString}) {
  const savedWordle = useSelector(state => state.wordle)
  const [keyboardString, setKeyboardString] = useState(defaultKeyboardString ? defaultKeyboardString : [])

  const handleChangeString = useCallback((str) => {
    let tempStr = curretString
    let type = 'write'
    if (str === 'BACKSPACE') {
      tempStr = tempStr.substring(0, tempStr.length - 1)
    } else if (str ==='ENTER') {
      type = 'enter'
    } else {
      tempStr += str
    }
    if (tempStr.length <= rowNum) {
      onChangeString(tempStr, type);
    }
  }, [curretString, onChangeString])

  const resetKeyboard = useCallback (() => {
    let tempKeyboard = keyboardString.map(v=> [...v])
    for (let i = 0; i < tempKeyboard.length; i++) {
      for (let j = 0; j < tempKeyboard[i].length; j++) {
        tempKeyboard[i][j][1] = ''
      }
    }
    return tempKeyboard
  }, [keyboardString])


  const changeKeyColor = useCallback ((data) => {
    let tempKeyboard = keyboardString.map(v=> [...v])
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j< data[i].length; j++) {
        const { text, status } = data[i][j]
        if (text) {
          for (let k = 0; k < keyboardString.length; k++) {
            for (let m = 0; m < keyboardString[k].length; m++) {
              let [ keyText, keyStatus] = keyboardString[k][m]
              if (text === keyText) {
                if (keyStatus !== 'green') {
                  tempKeyboard[k][m][1] = status
                }
              }
            }
          }
        } else if (!text && i === 0) {
          return resetKeyboard()
        }
      }
    }
    return tempKeyboard
  }, [resetKeyboard, keyboardString])

  
  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter') {
        handleChangeString('ENTER')
      } else if (e.code === 'Backspace') {
        handleChangeString('BACKSPACE')
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          handleChangeString(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [handleChangeString])

  useEffect(() => {
    setKeyboardString(changeKeyColor(savedWordle.word))
  },[savedWordle])
  
  return (
    <KeyBoardContainer>
      {
      keyboardString.length ?
      keyboardString.map((item,index) => {
        return (
          <KeyboardRow key={index}>
          {
            item.map(([text,status],idx) => {
              return(
                <Key onClick={(str) => handleChangeString(str)} label={text} color={status} key={idx}></Key>
              )
            })
          }
          </KeyboardRow>
          )
      }) : null}
    </KeyBoardContainer>
  )
}

export default Kyeboard