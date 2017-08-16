import { Component } from '@angular/core';
import { Validators,
            FormGroup,
            FormControl } from '@angular/forms';

import { UiStatusService } from '../core/ui-status.service';


@Component({
  selector: 'mbe-top-bar',
  templateUrl: 'top-bar.component.html',
  styleUrls: [ 'top-bar.component.css' ]
})
export class TopBarComponent {

  constructor(private uiStatusService: UiStatusService) {}

}
