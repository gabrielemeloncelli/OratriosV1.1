export class NodePositionsUpdate {
    constructor(public id: number, public hasPositions: boolean, public refreshNode: boolean, public lockedWbs: string) {}
}
