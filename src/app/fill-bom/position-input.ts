import { BomPosition } from './bom-position';

export class PositionInput {
  public constructor(public bomPosition: BomPosition, public attributes: Array<string>, public attributesLocked: Array<boolean>) {}

  public tagError: boolean;
  public saved: boolean;
  public saveFailed: boolean;
  public errorMessage: string;
  public link: string;
}
