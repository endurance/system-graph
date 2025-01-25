import React, {ChangeEvent, useState} from 'react'
import {Connector, ConnectorLibrary} from "./Connector.ts";
import {Conductor} from "./Conductor.ts";
import {ComponentEntryFormProps} from "./ModelInputForms.tsx";


export function ConnectorDefinitionComponent({onClose, onSubmit, Library, connectorLibraryHandoff}): React.FC<ComponentEntryFormProps>
{
    const default_pin_quantity : number= 1
    const default_pin_names:string[] = ['1']
    const [connectorName, setconnectorName]= useState<string>("default")
    const [userInputStringToBecomeNumber, setPinInputNumber] = useState<number>(default_pin_quantity)
    const [pinInputArray, setpinInputArray] = useState<string[]>(default_pin_names)
    const [submissionError, setSubmissionError] = useState<string>("")
    const addConnectorToLibrary = () => {
        const myConn = new Connector(connectorName)
        myConn.addNewConductorByName(pinInputArray)
        const added : number = Library.addEntry(myConn)
        if (added){
            setSubmissionError("")
            connectorLibraryHandoff(Library)
            onSubmit()
        }
        else{
            console.log(Library)
            setSubmissionError(ConnectorLibrary.addFailedError)
            connectorLibraryHandoff(Library)
        }
    }
    const handleNewConnectorNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const desiredName = event.target.value
        setconnectorName(desiredName)
    }
    const handlePinNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
        //TODO: make this not throw away values when we change size
        const StringToBecomePinNumber = event.target.value
        const num = parseInt(StringToBecomePinNumber)
        console.log("change")
        if (!isNaN(num) && num >= 0) {
            setPinInputNumber(num)
            const myArray = Array.from({length : num}, (_, index) => `${index + 1}`)
            setpinInputArray(myArray)
        }
    }
    const updatePinNames = (index, value : string): void => {
        const updatedPinInputs = [...pinInputArray]
        updatedPinInputs[index] = value
        setpinInputArray(updatedPinInputs)
    }

    return (
        <>
            <div>
                Connector Part Number
                <input
                    type="text"
                    value={connectorName}
                    onChange={handleNewConnectorNameChange}
                />
            </div>
            <div>
                Number of pins
                <input
                    type="number"
                    value={userInputStringToBecomeNumber}
                    onChange={handlePinNumberChange}/>
            </div>
            {pinInputArray.map((value, index) => (
                <div key={index}>Pin {index+1}:
                <input
                    type = "text"
                    id = {`Pin ${index}`}
                    value = {`${value}`}
                    onChange = {(e) => updatePinNames(index, e.target.value)}
                />
                </div>))}
            <>
                <button onClick={() => {
                    addConnectorToLibrary()
                }}>
                    Generate Connector
                </button>
                <div>
                    {submissionError}
                </div>
                <button onClick={() => {
                    onClose()
                }}>
                    Cancel
                </button>
            </>
        </>


    )
}

interface ConnectorDisplayProps {
    conn: Connector
}

/*
export const ConnectorDisplayComponent: React.FC<ConnectorDisplayProps>=({conn})=>{
    const [myConnector, updateMyConnector] = useState<Connector>(conn)
        return (
        <>
            <h1>{myConnector.partName}</h1>
            <table>
                <tbody>
                {myConnector.getConductor}*/