import { Attribute } from './attribute';

export class PositionAttributeValue {
  constructor(public attribute: Attribute, public value: string, public locked: boolean) {}
}
