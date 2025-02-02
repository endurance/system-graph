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
    connections: ConductorConnection[]

    constructor(newName: string) {
        this.name = newName;
        this.connectorsAndRefDes = new Map<string, Connector>();
    }
    makeConnection(...conductors: Conductor[]) {
        const connections = new ConductorConnection(conductors)
        this.connections.push(connections)
    }

    private duplicateRefDes(refdes : string) : boolean{
            if (this.connectorsAndRefDes.has(refdes)){
                return true
            }
        return false
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
}
