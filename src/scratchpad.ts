import {Connector} from "./Connector.ts";
import {PartNumberFactory} from "./PartNumberTools.ts";
import {Conductor} from "./Conductor.ts";
import {ConductorConnection} from "./Connection.ts";
import {Cable} from "./Cable.ts";

const partNumberFactory = new PartNumberFactory();


//Make two connectors. One has 10 positions known by their index. One has 2 positions, A and B.
export function runSomeCode():Connector{
    const Conn1 = new Connector("Conn1")
    Conn1.getPartNumber(partNumberFactory.generateNewPartNumber())
    Conn1.addNumberedConductors(10)

    const Conn2 = new Connector("Conn2")
    Conn2.getPartNumber(partNumberFactory.generateNewPartNumber())
    Conn2.addConductor([new Conductor("A"), new Conductor("B")])

    const myCable = new Cable("My First Cable")

    myCable.addConnector(Conn1)
    myCable.addConnector(Conn2, "P2")


    //connect conductor 1 from connector 1 to conductor A of connector 2
    let myConductor1 :Conductor | undefined = Conn1.getConductorByName("1") //do I really have to do this? Surely there's a better way to handle the output of that function.

    let myConductor2 :Conductor | undefined = Conn2.getConductorByName("A") //i could make getConductorByName spit out a null looking Conductor and check its value as an alternative

    if (myConductor1 != undefined && myConductor2 != undefined) {
        const myFirstConnection  : ConductorConnection = new ConductorConnection([myConductor1, myConductor2])
    }
    else console.log("conductors not found.")

     myConductor1  = Conn1.getConductorByName("4") //do I really have to do this? Surely there's a better way to handle the output of that function.
     myConductor2  = Conn1.getConductorByName("3")
    if (myConductor1 != undefined && myConductor2 != undefined) {
        const mySecondConnection  : ConductorConnection = new ConductorConnection([myConductor1, myConductor2])
    }
    else console.log("conductors not found.")


    //-------------------------------------------------
    // Another use case. Given 2 connectors with named conductors, build the connections between conductors with the same name within a cable.
    //-------------------------------------------------
    const mySignalNamedConnector1 = new Connector("SignalNamedConnector1")
    mySignalNamedConnector1.addConductor(new Conductor("High_Voltage"))
    mySignalNamedConnector1.addConductor(new Conductor("Low_Voltage"))

    return mySignalNamedConnector1

}
