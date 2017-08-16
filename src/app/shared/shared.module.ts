import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { TopBarComponent } from './top-bar.component';


@NgModule({
  imports: [ CommonModule,
              FormsModule ],
  declarations: [ LoginComponent,
                  TopBarComponent ],
  exports: [ LoginComponent,
              TopBarComponent ]
})

export class SharedModule {  }
