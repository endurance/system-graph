import { useState } from 'react'
import './App.css'
import {runSomeCode} from "./scratchpad.ts";

function App() {

  return (
    <>
      <div>
        <button onClick={() => {runSomeCode()}}>
            Push the button and look in the console.
        </button>
      </div>
    </>
  )
}

export default App
