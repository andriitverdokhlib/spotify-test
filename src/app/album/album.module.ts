import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './components/album/album.component';
import { MaterialModule } from '../material/material.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule
  ]
})
export class AlbumModule { }
