import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../redux/counter/counterSlice'

function Counter() {
  const countValue = useSelector((state) => state.counter.value);

  return (
    <div>
        <h1>
            { countValue }
        </h1>
    </div>
  )
}

export default Counter