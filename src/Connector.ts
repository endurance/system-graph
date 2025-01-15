import {Conductor} from "./Conductor.ts";


// A Connector is essentially the vertex of a graph with more data associated.
//TODO: Connectors should be able to just exist with a known pin count. This will limit how many conductors can be added, and when adding a conductor it has to go to a pin.
export class Connector{
    partNumber: string = "No Part Number Assigned";
    name: string = "No Name Assigned";
    conductorList : Conductor[]

    constructor(name: string){
        this.name = name;
        this.conductorList = []
    }
    addConductor(myConductor : Conductor | Conductor[]){
        if (Array.isArray(myConductor)){
            for (const item of myConductor){
                item.setConnector(this)
                this.conductorList.push(item)
            }
        }
        else{
            myConductor.setConnector(this)
            this.conductorList.push(myConductor);
        }
        //Todo: check for redundant conductors and do not add them if they are already in the connector.
    }
    getPartNumber(pn:string){
        this.partNumber = pn;
    }
    addNumberedConductors(num:number){
        for (let i = 1; i <= num; i++) {
            const iConductor = new Conductor(`${i}`)
            iConductor.setConnector(this)
            this.conductorList.push(iConductor)
        }
    }
    getConductorByName(name:string) : Conductor | undefined {
        console.log("entry")
        for( const cond of this.conductorList){
            if (cond.getName() === name){
                return cond
            }
        }
        return undefined
    }

}