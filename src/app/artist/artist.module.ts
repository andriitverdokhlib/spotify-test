import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistComponent } from './components/artist/artist.component';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ArtistComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    MatButtonModule,
  ]
})
export class ArtistModule { }
