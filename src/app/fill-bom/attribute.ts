export class Attribute
{
  constructor(public id: number, public code: string, public description: string, public mandatory: boolean,
   public maxlength: number, public spmatId: number, public forcedMandatory: boolean, public disabled: boolean){}
}
