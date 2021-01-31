import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { AlbumDetails } from '../../../shared/models/album-details.model';
import { Spotify } from '../../../store/spotify';
import { SetAlbumDetailsRequest, SetPreviousRouteNavigate } from '../../../store/spotify/spotify.actions';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Select(Spotify.album)
  albumDetails$: Observable<AlbumDetails>;

  @Select(Spotify.routes)
  routes$: Observable<string[]>;

  albumId: string;
  routes: string[];
  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.albumId = paramMap.get('id');
        this.store.dispatch(new SetAlbumDetailsRequest(this.albumId));
      }
    });

    this.routes$.subscribe((routes: string[]) => {
      this.routes = routes;
    });
  }

  back(): void {
    if (this.routes.length > 0) {
      this.store.dispatch(new Navigate([this.routes[0]]));
    } else {
      this.store.dispatch(new Navigate(['home']));
    }
    this.store.dispatch(new SetPreviousRouteNavigate(`home`));
  }
}
