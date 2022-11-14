import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../redux/counter/counterSlice';

function Counter() {
  const countValue = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
        <h1>
            { countValue }
        </h1>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(increment())}>Increment</button>

        <br />
        <br />
        <input type="number" />
        <button onClick={() => dispatch(incrementByAmount(3))}>Increment by Amount</button>
    </div>
  )
}

export default Counter