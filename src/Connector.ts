import {Conductor} from "./Conductor.ts";


export class Connector{
    partNumber: string = "No Part Number Assigned";
    partName: string = "No Name Assigned";
    conductorList : Conductor[] = []

    //accepts a single string as the part number, or an object in order to duplicate it. A string name may optionally be provided, but it is ignored if an object is used in the parameters.
    constructor(inArg : string | Connector, inName?: string) {
        if (typeof inArg === "string"){
            this.partNumber = inArg
            this.partName = inName === undefined ? "No Name Assigned" : inName
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

export class ConnectorLibrary{
    static addFailedError : string = "Failed to add connector due to duplicate part number.";
    connectors : Record<string, Connector>
    addEntry(connector : Connector) :boolean{
        if(this.connectors === undefined){
            this.connectors = {}
            this.connectors[connector.partNumber] = connector
            return true
            }
        if (!Object.keys(this.connectors).includes(connector.partNumber)){
            this.connectors[connector.partNumber] = connector
            return true
        }
        return false
    }

}