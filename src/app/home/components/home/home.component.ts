import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';

import { Spotify } from '../../../store';
import { Artist } from '../../../shared/models/artist.model';
import { SetArtistsRequest, SetPreviousRouteNavigate } from '../../../store/spotify/spotify.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  @Select(Spotify.artists)
  artists$: Observable<Artist[]>;

  @Select(Spotify.history)
  history$: Observable<Artist[]>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.searchForm.get('search').valueChanges.pipe(debounceTime(600)).subscribe((text: string) => {
      this.searchArtists(text);
    });
  }

  initForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  searchArtists(text: string): void {
    this.store.dispatch(new SetArtistsRequest(text));
  }

  goToArtistpage(id: string): void {
    this.store.dispatch(new SetPreviousRouteNavigate(`home`));
    this.store.dispatch(new Navigate([`artist/${id}`])).subscribe();
  }
}
