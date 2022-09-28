import React from 'react'

export default function Question({ questionTitle, options, selectAnswer, id, darkMode }) {

    const answers = options.map((ans)=>{

        const styles= darkMode ? 
        {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.5em",
            padding: "2% 3%",
            border: ans.selected ===true ? "1px solid #D6DBF5" : ans.isCorrect === true ? "1px solid #94D7A2" : ans.isCorrect === false ? "1px solid #F8BCBC" : ans.isCorrect === undefined ? "1px solid grey" : "1px solid #4D5B9E",
            backgroundColor: ans.selected === true ? "#D6DBF5" : ans.isCorrect === true ? "#94D7A2" : ans.isCorrect === false ? "#F8BCBC" : "transparent",
            color: ans.isCorrect===true ? "#293264" :  ans.isCorrect===false ? "grey"  :  ans.selected===false ? "#f5f5f5"  : ans.selected===true ? "#293264"  : "grey"
        } :
        {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.5em",
            padding: "2% 3%",
            border: ans.selected ===true ? "1px solid #D6DBF5" : ans.isCorrect === true ? "1px solid #94D7A2" : ans.isCorrect === false ? "1px solid #F8BCBC" : ans.isCorrect === undefined ? "1px solid grey" : "1px solid #4D5B9E",
            backgroundColor: ans.selected === true ? "#D6DBF5" : ans.isCorrect === true ? "#94D7A2" : ans.isCorrect === false ? "#F8BCBC" : "transparent",
            color: ans.isCorrect===true ? "#293264" :  ans.isCorrect===false ? "grey"  :  ans.selected===false ? "#293264"  : ans.selected===true ? "#293264"  : "grey"
        }

        return (
            <div style={styles} key={ans.id} onClick={()=>selectAnswer(id, ans.id)}>
                <p>{ans.value}</p>
            </div>
        )
    })

    return (
        <div className='question'>
            <p className={darkMode ? 'mainQuestion-dark' : 'mainQuestion'}>{questionTitle}</p>
            <div className='answers'>
                {answers}
            </div>
            <hr />
        </div>
    )
}
