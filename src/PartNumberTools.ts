/*
This is a way to generate part numbers during use.
This is not at all what it looks like in the real world.
Real PN generation logic requires more inputs and more checks, but this should ensure we can always pull a unique part number
when making new objects. Part number control is outside the scope of our application but we need to be able to use them.
 */



export class PartNumberFactory{
    existingPartNumbers: string[] = []
    generateNewPartNumber(): string{
        let prospectivePN;
        do {
            prospectivePN = this.generateNumberBasedOnRules();
        } while (!this.isNewPNValid(prospectivePN));
        this.existingPartNumbers.push(prospectivePN);
        return prospectivePN;
    }
    assignSpecifiedPartNumber(prospectivePartNumber:string): number{
        if (this.existingPartNumbers.indexOf(prospectivePartNumber) == -1)
        {
           this.existingPartNumbers.push(prospectivePartNumber);
           return 0
        }
        return 1
    }
    private generateNumberBasedOnRules():string{
        const num:number = this.existingPartNumbers.length;
        return `PN${num}`
    }
    private isNewPNValid(prospectivePN:string):boolean{
        return this.existingPartNumbers.indexOf(prospectivePN) === -1;
    }
}
