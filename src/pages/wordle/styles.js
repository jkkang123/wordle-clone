import styled, {css} from 'styled-components'

const WordleHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 16px;
  height: 50px;
  color: #000000;
  border-bottom: 1px solid #d3d6da;;
`
const WordleTitle = styled.div`
  font-weight: 700;
  font-size: 37px;
  line-height: 100%;
  letter-spacing: 0.01em;
  text-align: center;
  left: 0;
  right: 0;
  pointer-events: none;
  position: relative;
`

const WordleBody = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
`

const WordleBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 600px;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`

const WordleBoard = styled.div`
  width: 350px;
  height: 420px;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
`

const WordleBoardColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`

const WordleTile = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  color:  ${props => !props.color ? css`#000000;` : css`#ffffff;`}
  vertical-align: middle;
  box-sizing: border-box;
  border: ${props => !props.color ? css`2px solid #d3d6da;` : css`none;`}
  background-color: ${props => props.theme[props.color]};
  text-transform: uppercase;
`

export {WordleHeader, WordleTitle, WordleBody, WordleBoardContainer, WordleBoard, WordleBoardColumn, WordleTile}