import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject}     from 'rxjs/Subject';

import { BomPosition }            from '../fill-bom/bom-position';
import { InsertPositionDetails }  from '../fill-bom/insert-position-details';
import { ProjectDiscipline }      from './project-discipline';
import { NodeTypeService }        from './node-type.service';
import { NodeType }               from './node-type';
import { NodePositionsUpdate }    from './node-positions-update';
import { CommodityGroup }         from '../fill-bom/commodity-group';
import { CommodityPart }          from '../fill-bom/commodity-part';
import { TreeNode }               from '../lazy-loaded-tree-view/tree-node';
import { TreeNodeService }        from './tree-node.service';

@Injectable()
export class UiStatusService
{
  private _insertPosition: Subject<InsertPositionDetails> = new Subject<InsertPositionDetails>();
  public insertPosition: Observable<InsertPositionDetails> = this._insertPosition.asObservable();
  private _editPositionSubject: Subject<BomPosition> = new Subject<BomPosition>();
  public editPositionObservable: Observable<BomPosition> = this._editPositionSubject.asObservable();
  public commodityGroup = new CommodityGroup(0, "", "");
  public tablesAndSizesVisible = false;
  public materialsVisible = false;
  public disciplineCode = "";
  public disciplineId = 0;
  public projectDisciplineId = 0;
  public projectId = 0;
  public projectCode = "";
  public projectDisciplines: ProjectDiscipline[]
  public nodeTypes: NodeType[];
  public GROUP_CODE = "C_GROUP";
  public PART_CODE = "C_PART";
  public commodityPart = new CommodityPart(0, "", "", "");
  public nodePath = "";
  public userCode: string;
  public userIsAdministrator: boolean;
  public projectDescription: string;
  public platformAuthenticatedUserName: string;
  public authToken: string;
  public nodeToBeCopied: TreeNode;

  private nodePositionsUpdateSubject = new Subject<NodePositionsUpdate>();
  public nodePositionsUpdate = this.nodePositionsUpdateSubject.asObservable();


  constructor(private nodeTypeService: NodeTypeService,
              private nodeService: TreeNodeService) {
                this.nodeService.nodePositionsUpdate.subscribe(n => this.nodePositionsUpdateSubject.next(n));
               }

  setInsertPosition(insertPositionVisible: boolean, insertTagPosition: boolean, hideTag: boolean)
  {
     var details: InsertPositionDetails  = new InsertPositionDetails();
     details.displayInsertPosition = insertPositionVisible;
     details.positionFromTag = insertTagPosition;
     details.hideTag = hideTag;
     this._insertPosition.next(details);

   }

   editPosition(positionToEdit: BomPosition)
   {
     this._editPositionSubject.next(positionToEdit);
   }

   selectProject(projectId: number)
   {
     this.nodeTypes = new Array<NodeType>();
     console.log("ui-status.service -- selectProject"); //TODO: remove
     this.nodeTypeService.getNodeTypes(projectId)
     .subscribe(nodes => {
      this.nodeTypes = nodes;
      console.log("ui-status.service -- selectProject - node types retrieved"); //TODO: remove
     });
   }

   updateNodePositions(id: number) {
    this.nodeService.updateNodePositions(id);
   }
 }
