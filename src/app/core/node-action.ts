import { NodeDTO } from "../lazy-loaded-tree-view/nodeDTO";

export class NodeAction {
    constructor(public name: string, public url: string, public node: NodeDTO) {}
}