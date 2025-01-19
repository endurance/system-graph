import React, {ChangeEvent, useState} from 'react'
import {Connector} from "./Connector.ts";
import {Conductor} from "./Conductor.ts";



export function PinNumberInputComponent(){
    const [inputNumberOfPins, setNumberOfPins] = useState<number | undefined>(undefined)
    const handleChange = (event :ChangeEvent<HTMLInputElement>) =>{
        const inputNumberOfPins = event.target.value
        const num = parseInt(inputNumberOfPins)
        if (!isNaN(num)) {
            setNumberOfPins(num)
        }
    }
    return (
        <>
        <p>How many pins does this connector have?</p>
        <p>
            <input
                type="number"
                value={inputNumberOfPins}>
            </input>

            </p>
        </>
    )
}
interface ConnectorDisplayProps {
    conn: Connector
}
export const ConnectorDisplayComponent: React.FC<ConnectorDisplayProps>=({conn})=>{
    const [myConnector, updateMyConnector] = useState<Connector>(conn)
        return (
        <>
            <h1>{myConnector.partName}</h1>
            <table>
                <tbody>
                {myConnector.getConductorNames().map((condName, index) => <tr><td key = {index}>{index+1}</td><td>{condName}</td></tr>)}
                </tbody>
            </table>
        </>
    )
}
