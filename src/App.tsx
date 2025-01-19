import { useState } from 'react'
import './App.css'
import {runSomeCode} from "./scratchpad.ts";
import {PinNumberInputComponent, ConnectorDisplayComponent} from './ConnectorCreationElements.tsx';
import {Connector} from "./Connector.ts";

//let testConnector : Connector =  runSomeCode()


function App() {
    const [testConnector, updateTestConnector] = useState<Connector>(new Connector("doot"))
    console.log(testConnector)
    console.log({...testConnector})
  return (
    <>
      <div>
        <button onClick={() => {
            testConnector.addNewConductorByName("string")
            updateTestConnector(new Connector(testConnector))
            }
        }>
            Add a conductor
        </button>
          <ConnectorDisplayComponent conn = {testConnector}></ConnectorDisplayComponent>
          <PinNumberInputComponent></PinNumberInputComponent>


      </div>
      <div>
      <button onClick={() => {runSomeCode()}}>
          Create a new cable
      </button>
    </div>
    </>
  )
}

export default App
