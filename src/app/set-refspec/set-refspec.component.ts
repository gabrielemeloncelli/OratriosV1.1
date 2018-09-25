import { 
    Component,
    OnInit}
    from '@angular/core';

@Component({
    templateUrl: 'set-refspec.component.html',
    styleUrls: ['set-refspec.component.css'],
    selector: 'set-refspec'
  })  
  export class SetRefspecComponent implements OnInit {
    public commodityTemplate: string;
    public tagTemplate: string;
    ngOnInit() {
    }
  }