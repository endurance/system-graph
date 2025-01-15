import {Connector} from "./Connector.ts";
import {ConductorConnection} from "./Connection.ts";

export class Conductor {
    readonly name: string;
    connections: ConductorConnection[] // set by ConductorConnections class. Feels like my classes are too intermingled.
    connector?: Connector;

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
