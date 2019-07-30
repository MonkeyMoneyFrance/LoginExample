import React from 'react'

export default function Progress(props){
  const score = props.score
  const colorArray = ['red','orange','green']
  const labelArray = ['Too Weak','Acceptable','Strong']

  return (
    <div className={'progress'}>
      <div className={'strenghBar'}>
        {colorArray.map((color,i) =>
          <div key={i} style={{backgroundColor:score-1 >= i ? colorArray[score-1]: 'grey'}} ></div>
        )}
      </div>
      <span>Strengh : {labelArray[score-1] || 'Invalid'}</span>
    </div>
  )
}
