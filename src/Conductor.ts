import {Connector} from "./Connector.ts";
import {ConductorConnection} from "./Connection.ts";

export class Conductor {
    readonly name: string;
    connections: Conductor[] // set by ConductorConnections class. Feels like my classes are too intermingled.
    connector?: Connector;

    static Connect(cond1 : Conductor, cond2: Conductor){
        if (!cond2.connections.includes(cond1)){
            cond2.connections.push(cond1)
        }
        if (!cond1.connections.includes(cond2)){
            cond1.connections.push(cond2)
        }
    }
    constructor(name: string){
        this.name = name;
        this.connections = []
    }
    setConnector(connector : Connector){
        this.connector = connector;
    }
    getName(): string {
        return this.name;
    }
}
