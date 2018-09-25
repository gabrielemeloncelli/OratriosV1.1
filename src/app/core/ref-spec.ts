import { RefSpecDto } from './ref-spec-dto';

export class RefSpec {
    dto: RefSpecDto;
    constructor (dto: RefSpecDto) {
        this.dto = dto;
    }

    get materialId(): number {
        return this.dto.materialId;
    }
    
    get commodityCode(): string {
        return this.dto.commodityCode;
    }

    get tag(): string {
        return this.dto.tag;
    }

    get refSpec(): string {
        return this.dto.refSpec;
    }
    
    set refSpec(value: string) {
        this.dto.refSpec = value;
    }
    
    get displayCommodity(): string {
        if(this.dto.materialId > 0) {
            return this.dto.commodityCode;
        } else {
            return this.dto.tag;
        }
    }












}