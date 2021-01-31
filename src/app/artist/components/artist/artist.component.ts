import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { Spotify } from '../../../store/spotify';
import { SetArtistRequest, SetPreviousRouteNavigate } from '../../../store/spotify/spotify.actions';
import { Album } from '../../../shared/models/album.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  @Select(Spotify.artist)
  albums$: Observable<Album[]>;

  @Select(Spotify.routes)
  routes$: Observable<string[]>;

  artistId: string;
  routes: string[];

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.artistId = paramMap.get('id');
        this.store.dispatch(new SetArtistRequest(this.artistId));
      }
    });

    this.routes$.subscribe((routes: string[]) => {
      this.routes = routes;
    });
  }

  goToAlbum(id: string): void {
    this.store.dispatch(new SetPreviousRouteNavigate(`artist/${this.artistId}`));
    this.store.dispatch(new Navigate([`album/${id}`]));
  }

  back(): void {
    if (this.routes.length > 0) {
      this.store.dispatch(new Navigate([this.routes[0]]));
    } else {
      this.store.dispatch(new Navigate(['/home']));
    }
  }
}


