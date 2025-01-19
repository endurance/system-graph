import {Conductor} from "./Conductor.ts";


// A Connector is essentially the vertex of a graph with more data associated.
//TODO: Connectors should be able to just exist with a known pin count. This will limit how many conductors can be added, and when adding a conductor it has to go to a pin.
export class Connector{
    partNumber: string = "No Part Number Assigned";
    partName: string = "No Name Assigned";
    conductorList : Conductor[] = []

    constructor(inArg : string | Connector){
        if (typeof inArg === "string"){
            this.partName = inArg
        }
        else{
            this.partName = inArg.partName
            this.conductorList = inArg.conductorList
            this.partNumber = inArg.partNumber
        }
    }

    addNewConductorByName(name: string | string[]){
        if (Array.isArray(name)){
            name.map((condName) => this.conductorList.push(new Conductor(condName)))
        }
        else{
            this.conductorList.push(new Conductor(name))
        }
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
        for( const cond of this.conductorList){
            if (cond.getName() === name){
                return cond
            }
        }
        return undefined
    }
    getConductorNames() : string[] {
        return this.conductorList.map((cond) => cond.getName())
    }

}