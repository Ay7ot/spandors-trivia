import React from 'react'

export default function Question({ questionTitle, options, selectAnswer, id, correctAnswer, selectedAnswer }) {

    const answers = options.map((ans)=>{

        const styles={
            border: ans.selected ===true ? "1px solid #D6DBF5" : "1px solid #4D5B9E",
            color: "#293264",
            backgroundColor: ans.selected === true ? "#D6DBF5" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.5em",
            padding: "2% 3%",
            border: ans.selected ===true ? "1px solid #D6DBF5" : ans.isCorrect === true ? "1px solid #94D7A2" : ans.isCorrect === false ? "1px solid #F8BCBC" : "1px solid #4D5B9E",
            backgroundColor: ans.selected === true ? "#D6DBF5" : ans.isCorrect === true ? "#94D7A2" : ans.isCorrect === false ? "#F8BCBC" : "transparent",
        }

        return (
            <div style={styles} key={ans.id} onClick={()=>selectAnswer(id, ans.id)}>
                <p>{ans.value}</p>
            </div>
        )
    }) 

    return (
        <div className='question'>
            <p className='mainQuestion'>{questionTitle}</p>
            <div className='answers'>
                {answers}
            </div>
            <hr />
        </div>
    )
}
