import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BomPosition } from './bom-position';
import { PositionStoreService } from './position-store.service';
import { PositionErrorList } from './position-error-list';


@Injectable()
export class PositionService {
    private _positions: Subject<Array<BomPosition>> = new Subject<Array<BomPosition>>();
    public positions: Observable<Array<BomPosition>> = this._positions.asObservable();
    private _positionsCount: Subject<number> = new Subject<number>();
    public positionsCount = this._positionsCount.asObservable();

    private nodeId = 0;

    constructor(private _storeService: PositionStoreService) { }

    addPosition(newPosition: BomPosition): Observable<PositionErrorList> {
        return this._storeService.addPosition(newPosition);
    }

    addPositionList(newPositions: BomPosition[]): Observable<PositionErrorList> {
        return this._storeService.addPositionList(newPositions);
    }

    editPosition(modifiedPosition: BomPosition): Observable<BomPosition> {
        return this._storeService.editPosition(modifiedPosition);
    }

    editPositionList(modifiedPositions: BomPosition[]): Observable<PositionErrorList> {
        return this._storeService.editPositionList(modifiedPositions);
    }
    selectNode(nodeId: number) {
        this._positions.next(new Array<BomPosition>());
        this._storeService.selectNode(nodeId).subscribe(
            positionsCount => this._positionsCount.next(positionsCount)
        );
    }

    selectPage(nodeId: number, pageNumber: number, pageSize: number) {
        this._storeService.selectPage(nodeId, pageNumber, pageSize)
            .subscribe(positions => this._positions.next(positions));
    }

    getTag(tag: string, projectDisciplineId: number): Observable<BomPosition[]> {
        return this._storeService.getTag(tag, projectDisciplineId);
    }

    deletePosition(position: BomPosition): Observable<BomPosition> {
        const result = new Subject<BomPosition>();
        this._storeService.deletePosition(position).subscribe(
            deletedPosition => {
                result.next(deletedPosition);
            }
        );
        return result.asObservable();
    }

    clearNode(nodeId: number): Observable<null> {
        const result = new Subject<null>();
        this._storeService.clearNode(nodeId).subscribe(
            () => {
                result.next();
            }
        );
        return result.asObservable();
    }

    removeNodePositions(nodeId: number): Observable<null> {
        const result = new Subject<null>();
        this._storeService.removeNodePositions(nodeId).subscribe(
            () => {
                result.next();
            }
        );
        return result.asObservable();
    }

    pasteNode(sourceNodeId: number, targetNodeId: number): Observable<null> {
        const result = new Subject<null>();
        this._storeService.pasteNode(sourceNodeId, targetNodeId).subscribe(
            () => {
                result.next();
            }
        );
        return result.asObservable();
    }
}
