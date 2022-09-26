import { useState, useEffect } from 'react'
import './App.css'
import { FaGithub , FaLinkedin, FaTwitter} from 'react-icons/fa'
import Question from './Question'
import { nanoid } from 'nanoid'

function App() {

  const [start, setStart] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)

  useEffect(()=>{
    if(start===true){
      fetch("https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=5&region=NG&difficulty=medium")
    .then(res=>res.json())
    .then(data=>setQuestions(data.map(quest=>{
      return ({
        question: quest.question,
        selectedAnswer: undefined,
        correctAnswer: quest.correctAnswer,
        id: quest.id,
        options: quest.incorrectAnswers.concat([quest.correctAnswer]).sort(()=>Math.random()-0.5).map(item=>(
          {value: item, selected: false, id: nanoid()}
        ))    
      })
    })))
    }
  },[start])

  function startGame(){
    setStart(true)
  }

  function selectAnswer(questId, optionId){
    setQuestions(prevArray=>{
      let optionsArray = undefined;
      for(let i = 0; i <prevArray.length; i++){
        if(prevArray[i].id===questId){
          optionsArray = prevArray[i].options
        }
      }
      const allFalse = optionsArray.every(item=>item.selected===false)

      if(allFalse){
        return prevArray.map(quest=>{
          if(quest.id === questId){
            return {...quest, options: quest.options.map(option=>{
              if(option.id===optionId){
                return {...option, selected: !option.selected}
              } else {
                return option
              }
            })}
          }else {
            return quest
          }
        })
      }else {
        prevArray = prevArray.map(quest=>{
          if(quest.id===questId){
            return {
              ...quest,
              options: quest.options.map(option=>{
                return {
                  ...option,
                  selected: false
                }
              })
            }
          }else {
            return quest
          }
       })
        return prevArray.map(quest=>{
          if(quest.id === questId){
            return {...quest, options: quest.options.map(option=>{
              if(option.id===optionId){
                return {...option, selected: !option.selected}
              } else {
                return option
              }
            })}
          }else {
            return quest
          }
        })
      }
    })
  }

  function checkAnswers(){
    setIsChecked(true)
    
  }

  function playAgain(){
    setStart(false)
    setIsChecked(false)
    setQuestions([])
  }

  const Questions = questions.map(quest=>{
    return <Question 
      questionTitle={quest.question}
      options={quest.options}
      key={quest.id}
      selectAnswer={selectAnswer}
      id={quest.id}
    />
  })

  const mainStyle={
    height : start ? "100%" : "80vh",
  }

  return (
   <>
    <main style={mainStyle}>
      {start ? 
        <div className='secondPage'>
          {Questions}
          { isChecked && 
            <div className='play-again'>
              <p>You scored {score}/5 correct answers</p>
              <button onClick={playAgain}>Play again</button>
            </div>
          }
          { !isChecked && 
            <button className='checkAnswers' onClick={checkAnswers}>Check Answers</button> 
          }
        </div> :
        
        <div className='firstPage'>
          <h1>Quizzical</h1>
          <p>Fun trivia Game on the go</p>
          <button onClick={startGame}>Start Quiz</button>
        </div>
        }
    </main>
    <footer>
        <h3>Spandor's Work</h3>
        <div className='icons'>
          <a href='https://github.com/Ay7ot' className='icon-tags'><FaGithub /></a>
          <a href='https://twitter.com/Spandor_7nr' className='icon-tags'><FaTwitter /></a>
          <a href='https://www.linkedin.com/in/ayomide-ibiteye-b124b823b/' className='icon-tags'><FaLinkedin/></a>
        </div>
      </footer>
   </>
  )
}

export default App
