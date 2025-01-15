
//a Connection is an edge of a graph. There are many types, and they may also be able to do useful operations for us.

import {Conductor} from "./Conductor.ts";

export class ConductorConnection {

    connectedConductors: Conductor[]

    constructor(conductor: Conductor[] | Conductor) {
        this.connectedConductors = []
        if (conductor != null) {
            if (Array.isArray(conductor)) {
                for (const cond of conductor){
                    this.connectedConductors.push(cond)
                    cond.connections.push(this)
                }

            }
            else {
                this.connectedConductors.push(conductor);
            }
        }

    }
}