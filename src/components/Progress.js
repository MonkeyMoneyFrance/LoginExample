import React from 'react'
import PropTypes from 'prop-types'
const labelArray = ['Too Weak','Acceptable','Strong'] // must be the same size of colors in scss

function Progress(props){
  const {score} = props
  return (
    <div className={'progress'}>
      <div className={'strenghBar'}>
        {labelArray.map((color,i) =>
          <div
            key={i}
            className={`score-${score-1} ${score-1 >= i ? 'active' : ''}`} // define active and score of each bar
            ></div>
        )}
      </div>
      <span>Strengh : {labelArray[score-1] || 'Invalid'}</span>
    </div>
  )
}
Progress.propTypes = {
  score : PropTypes.number,
};
export default Progress;
