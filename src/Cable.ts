/*
At its simplest, a cable needs only connectors (and can exist with as few as 1).
At its most complex, a cable may be made up of multiple other cables.
 */
import {Connector} from "./Connector.ts";
import {Conductor} from "./Conductor.ts";
import {ConductorConnection} from "./Connection.ts";



export class Cable {
    name: string
    connectorsAndRefDes: Map<string, Connector>
    //connectorsAndRefDes: { connector: Connector, refDes: string }[] = []
    internalConnections: ConductorConnection[]

    constructor(newName: string) {
        this.name = newName;
        this.connectorsAndRefDes = new Map<string, Connector>();
        this.internalConnections = []
    }
    makeConnection(...conductors: Conductor[]) {
        let connectionMade = false
        for (const connection of this.internalConnections){
            if (connection.connectedConductors.some(cond => conductors.includes(cond))) {
                const newlyConnectedConductors = conductors.filter(cond => !connection.connectedConductors.includes(cond));
                connection.connectedConductors.push(...newlyConnectedConductors);
                connectionMade = true
                break
            }
        }
        if (!connectionMade){
            this.internalConnections.push(new ConductorConnection(conductors))
        }
    }


    private duplicateRefDes(refdes : string) : boolean {
        return this.connectorsAndRefDes.has(refdes);
    }
    private nextrefDes():string {
        let i = 1
        while (this.duplicateRefDes(`P${i}`))
        {
            i++
        }
        return `P${i}`
    }
    addConnector(newConnector: Connector, refdes? :string): void {
        if ((refdes) !== undefined){
            if(!this.duplicateRefDes(refdes)){
                this.connectorsAndRefDes.set(refdes, new Connector(newConnector));
                //TODO: really need to settle on how we spit out errors.
            }
        }
        else{
            this.connectorsAndRefDes.set(this.nextrefDes(), new Connector(newConnector));
        }
    }
    getConnectors(): Map<string, Connector> {
        return this.connectorsAndRefDes
    }
    printCable(): void{
        console.log(this.name)
        for (const item of this.internalConnections){
            console.log("connection group:")
            for (const jtem of item.connectedConductors){
                console.log(`${jtem.name} on ${this.getRefdesFromConnector(jtem.connector)},` )
            }
        }
    }
    getRefdesFromConnector(conn : Connector):string{
        console.log(this.connectorsAndRefDes)
        for (const key of this.connectorsAndRefDes.keys()){
            console.log(conn)
            if (this.connectorsAndRefDes.get(key) == conn){
                return key
            }
        }//WHY WONT IT FIND THE CONNECTORS???? PICK UP HERE I GUESS IN 2 DAYS OR WHATEVER
        return "connector not found"
    }

}
