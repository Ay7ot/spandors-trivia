import { useState, useEffect } from 'react'
import './App.css'
import { FaGithub , FaLinkedin, FaTwitter, FaSun, FaMoon} from 'react-icons/fa'
import Question from './Question'
import { nanoid } from 'nanoid'

function App() {

  const [start, setStart] = useState(false)
  const [difficulty, setDifficulty] = useState("easy")
  const [categories, setCategories] = useState("general_knowledge")
  const [isChecked, setIsChecked] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(()=>{
    if(start===true){
      fetch(`https://the-trivia-api.com/api/questions?categories=${categories}&limit=10&region=NG&difficulty=${difficulty}`)
    .then(res=>res.json())
    .then(data=>setQuestions(data.map(quest=>{
      return ({
        question: quest.question,
        selectedAnswer: undefined,
        correctAnswer: quest.correctAnswer,
        id: quest.id,
        options: quest.incorrectAnswers.concat([quest.correctAnswer]).sort(()=>Math.random()-0.5).map(item=>(
          {value: item, selected: false, id: nanoid(), isCorrect: undefined}
        ))    
      })
    })))
    }
  },[start])

  useEffect(()=>{
    let count = 0;
    for(let i = 0; i < questions.length; i++){
      if(questions[i].selectedAnswer !== undefined){
        if(questions[i].selectedAnswer === questions[i].correctAnswer){
          count++
        }
      }
    }
    setScore(count)
  },[isChecked])

  console.log(categories)

  function startGame(){
    setStart(true)
  }

  function handleDifficulty(event){
    setDifficulty(event.target.value)
  }

  function handleCategories(event){
    setCategories(event.target.value)
  }


  function selectAnswer(questId, optionId){
    setQuestions(prevArray=>{
      let optionsArray = null;
      for(let i = 0; i <prevArray.length; i++){
        if(prevArray[i].id===questId){
          optionsArray = prevArray[i].options
        }
      }
      const allFalse = optionsArray.every(item=>item.selected===false)
      
      if(allFalse){
        return prevArray.map(quest=>{
          if(quest.id === questId){
            return {
              ...quest, 
              options: quest.options.map(option=>{
                if(option.id===optionId){
                  return {...option, selected: !option.selected}
                } else {
                  return option
                }
              }),
              selectedAnswer: quest.options.find(option=>option.id===optionId).value
            }
          }else {
            return quest
          }
        })
      } else {
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
            return {
              ...quest, 
              options: quest.options.map(option=>{
                if(option.id===optionId){
                  return {...option, selected: !option.selected}
                } else {
                  return option
                }
              }),
              selectedAnswer: quest.options.find(option=>option.id===optionId).value
            }

          }else {
            return quest
          }
        })
      }
    })
  }

  function checkAnswers(){
    const allDone = questions.every(quest=>quest.selectedAnswer !== undefined)
    if (allDone){
      setIsChecked(true)
      setQuestions(prevQuest=>{
        return prevQuest.map(quest=>{
          if(quest.selectedAnswer===quest.correctAnswer){
            return {
              ...quest,
              options: quest.options.map(option=>{
              if(option.value === quest.selectedAnswer){
                return {
                  ...option, isCorrect: true, selected: false
                }
              } else return {...option, selected:false}
              }) 
            }
          }else{
            const actuallyCorrect = quest.options.find(option=>option.value===quest.correctAnswer).value 
            return {
              ...quest,
              options: quest.options.map(option=>{ 
                if(option.value===quest.selectedAnswer){
                  return {
                    ...option, isCorrect: false, selected: false
                  }
                }else if(option.value===actuallyCorrect){
                  return {
                    ...option, isCorrect:true, selected:false
                  }
                }else return {...option, selected:false}
              })
            }
          }
          
        })
      })
    }else{
      setIsChecked(prevCheck=>prevCheck)
      setQuestions(prevQuestions=>prevQuestions)
    }
    
  }

  function playAgain(){
    setStart(false)
    setIsChecked(false)
    setQuestions([])
    setScore(0)
  }

  const Questions = questions.map(quest=>{
    return <Question 
      questionTitle={quest.question}
      options={quest.options}
      key={quest.id}
      selectAnswer={selectAnswer}
      id={quest.id}
      correctAnswer={quest.correctAnswer}
      selectedAnswer={quest.selectedAnswer}
      darkMode={darkMode}
    />
  })

  function toggleDarkMode(){
    setDarkMode(prevDarkMode=>!prevDarkMode)
  }

  const mainStyle={
    height : start ? "100%" : "80vh",
    background: darkMode ? "url(../background6.png) center" : "url(../background4.png) center",
    backgroundSize: "cover"
  }

  return (
   <>
    <main style={mainStyle}>
      <div className='toggler'>
        <p className={darkMode ? "toggler-item-dark" : 'toggler-item'}><FaSun /></p>
        <div onClick={toggleDarkMode} className={darkMode ? "color-toggler-dark" : "color-toggler"}>
          <div className={darkMode ? 'toggler-slider-dark' : 'toggler-slider'}></div>
        </div>
        <p className={darkMode ? "toggler-item-dark" : 'toggler-item'}><FaMoon /></p>
      </div>
      {start ? 
        <div className='secondPage'>
          {Questions}

          { isChecked && 
            <div className={darkMode ? 'play-again-dark' : 'play-again'}>
              <p>You scored {score}/10 correct answers</p>
              <button onClick={playAgain}>Play again</button>
            </div>
          }
          { !isChecked && 
            <button className={darkMode ? 'checkAnswers-dark' : 'checkAnswers'} onClick={checkAnswers}>Check Answers</button> 
          }

        </div> :
        
        <div className={darkMode ? 'firstPage-dark' : 'firstPage'}>
          <h1>Quizzical</h1>
          <p>Fun trivia Game on the go</p>

          <form>
            <div>
              <label htmlFor='categories'>Set Category </label>
              <select id='categories' onChange={handleCategories}>
                <option value='general_knowledge'>General Knowledge</option>
                <option value='arts_and_literature'>Arts &amp; Literature</option>
                <option value='film_and_tv'>Film and TV</option>
                <option value='food_and_drink'>Food and Drink</option>
                <option value='geography'>Geography</option>
                <option value='history'>History</option>
                <option value='music'>Music</option>
                <option value='science'>Science</option>
                <option value='society_and_culture'>Society &amp; Culture</option>
                <option value='sport_and_leisure'>Sport and Leisure</option>
              </select>
            </div>
           <div className='difficulty'>
              <label htmlFor='difficulty'>Set Difficulty </label>
              <select id='difficulty' onChange={handleDifficulty} className={darkMode ? "select-dark" : ""}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
           </div>
          </form>

          <button onClick={startGame}>Start Quiz</button>
        </div>
      }
    </main>
    <footer>
        <h3>Spandor's Work</h3>
        <div className='icons'>
          <a href='https://github.com/Ay7ot' className='icon-tags'><FaGithub /></a>
          <a href='https://twitter.com/Spandor_Jnr' className='icon-tags'><FaTwitter /></a>
          <a href='https://www.linkedin.com/in/ayomide-ibiteye-b124b823b/' className='icon-tags'><FaLinkedin/></a>
        </div>
      </footer>
   </>
  )
}

export default App
