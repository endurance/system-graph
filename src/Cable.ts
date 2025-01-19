/*
At its simplest, a cable needs only connectors (and can exist with as few as 1).
At its most complex, a cable may be made up of multiple other cables.
 */
import {Connector} from "./Connector.ts";

export class Cable {
    name: string
    connectorsAndRefDes: { connector: Connector, refDes: string }[] = []
    constructor(newName: string) {
        this.name = newName;
    }
    addConnector(newConnector: Connector, refdes? :string): void {
        if ((refdes) !== undefined){
            this.connectorsAndRefDes.push({connector: newConnector, refDes: refdes});
        }
        else{
            this.connectorsAndRefDes.push({connector: newConnector, refDes: "NOREFDES"});
        }

    }
    getConnectors(): { connector: Connector, refDes: string }[] {
        return this.connectorsAndRefDes
    }
    returnInternalConnections(){
        //TODO: make this not return redundant values
        for(const conn of this.connectorsAndRefDes){
            for( const conductor of conn.connector.conductorList){
                for (const connection of conductor.connections){
                    for (const otherConductor of connection.connectedConductors) {
                        if (!(conductor === otherConductor)) {
                            const [onCable, refDes ] = this.isConnectorOnThisCable(otherConductor.connector)
                            if (onCable) {
                                //can only enter if the potentially undefined field below is defined.
                                console.log(`${conn.connector.partName}, refdes ${conn.refDes}, pin ${conductor.name} is connected to ${otherConductor.connector.name}, refdes ${refDes}, ${otherConductor.name}`)
                            }
                        }
                    }
                }
            }
        }
    }
    /* I can check if the parent connector is on the cable and skip iterating over a bunch of conductors.
But I can't be sure that "otherconductor" is even on a connector, and the function takes connectors. So I need to handle that gracefully.
 */
    isConnectorOnThisCable(conn : Connector | undefined) : [boolean, string]{
        if (conn != undefined){
            for (const entry of this.connectorsAndRefDes){
                if (entry.connector === conn){
                    return [true, entry.refDes]
                }
            }
        }
        return [false, "Ref Des Not Found"]
    }
}