import React from 'react'

export default function Question({ questionTitle, options, selectAnswer, id }) {

    const answers = options.map((ans)=>{

        const styles={
            border: ans.selected ? "1px solid #D6DBF5" : "1px solid #4D5B9E",
            borderRadius: "0.5em",
            padding: "2% 3%",
            color: "#293264",
            backgroundColor: ans.selected ? "#D6DBF5" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
            fontWeight: 500
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
