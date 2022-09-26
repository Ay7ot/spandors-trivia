import { useState, useEffect } from 'react'
import './App.css'
import { FaGithub , FaLinkedin, FaTwitter} from 'react-icons/fa'
import Question from './Question'
import { nanoid } from 'nanoid'

function App() {

  const [start, setStart] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [questions, setQuestions] = useState([])

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

  console.log(questions)

  function startGame(){
    setStart(true)
  }

  function checkAnswers(){
    setIsChecked(true)
  }

  function playAgain(){
    setStart(false)
    setIsChecked(false)
    setQuestions([])
  }

  function selectAnswer(id){
    setQuestions(prevArray=>{
      //make it possible to select an answer
      return prevArray
    })
  }

  const Questions = questions.map(quest=>{
    return <Question 
      questionTitle={quest.question}
      options={quest.options}
      key={quest.id}
      selectAnswer={selectAnswer}
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
              <p>You scored 3/5 correct answers</p>
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
