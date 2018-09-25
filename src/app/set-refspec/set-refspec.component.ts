import { 
    Component,
    OnInit}
    from '@angular/core';

import { RefSpec } from '../core/ref-spec';

@Component({
    templateUrl: 'set-refspec.component.html',
    styleUrls: ['set-refspec.component.css'],
    selector: 'set-refspec'
  })  
  export class SetRefspecComponent implements OnInit {
    public commodityTemplate: string;
    public tagTemplate: string;
    public refspecs: RefSpec[];
    ngOnInit() {
      this.refspecs = [];
      
    }

    
  }