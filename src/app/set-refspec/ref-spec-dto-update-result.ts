import { RefSpecDto } from '../core/ref-spec-dto';

export class RefSpecDtoUpdateResult {
    constructor(public dto: RefSpecDto, public errorMessage: string) {}
}