import { useState } from 'react'
import './App.css'
import {runSomeCode} from "./scratchpad.ts";
import { ConnectorDefinitionComponent} from './ConnectorCreationElements.tsx';
import {Connector, ConnectorLibrary} from "./Connector.ts";

//let testConnector : Connector =  runSomeCode()

function App() {
    const [isConnectorCreationDialogShown, setIsConnectorCreationDialogShown] = useState<boolean>(false);
    const [isInputDialogActive, setisInputDialogActive] = useState<boolean>(false);
    const [theConnectorLibrary, setTheConnectorLibrary] = useState<ConnectorLibrary>(new ConnectorLibrary());
    return (
    <>

    {!isInputDialogActive &&
    <div>
        <button onClick={() => {
            setIsConnectorCreationDialogShown(true)
            setisInputDialogActive(true)
            console.log(isConnectorCreationDialogShown);
            }
        }>
            Create a new connector
        </button>
    </div>}
        <div>
          {isConnectorCreationDialogShown &&
              <ConnectorDefinitionComponent
                  onClose={() => {setisInputDialogActive(false)
                      setIsConnectorCreationDialogShown(false)}}
                  onSubmit={() => {setisInputDialogActive(false)
                  setIsConnectorCreationDialogShown(false)}}
                  Library={theConnectorLibrary}
              /> }
      </div>
        {!isInputDialogActive &&
            <div>
      <button onClick={() => {runSomeCode()}}>
          Run the app that does stuff
      </button>
    </div>}
    </>
  )
}

export default App
