import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import {
  SetAlbumDetailsFailure,
  SetAlbumDetailsRequest,
  SetAlbumDetailsSuccess,
  SetArtistFailure,
  SetArtistRequest,
  SetArtistsFailure,
  SetArtistsRequest,
  SetArtistsSuccess,
  SetArtistSuccess,
  SetPreviousRouteNavigate
} from './spotify.actions';
import { Artist } from '../../shared/models/artist.model';
import { INITIAL_STATE, SpotifyState } from './spotify.state';
import { SpotifyService } from '../../core';
import { Album } from '../../shared/models/album.model';
import { AlbumDetails } from '../../shared/models/album-details.model';

@State<SpotifyState>({
  name: 'Spotify',
  defaults: {
    ...INITIAL_STATE
  },
})
@Injectable()
export class Spotify {

  @Selector()
  static artists(state: SpotifyState) {
    return state.artists;
  }

  @Selector()
  static artist(state: SpotifyState) {
    return state.artist;
  }

  @Selector()
  static album(state: SpotifyState) {
    return state.album;
  }

  @Selector()
  static history(state: SpotifyState) {
    return state.history;
  }

  @Selector()
  static routes(state: SpotifyState) {
    return state.routes;
  }

  constructor(
    private spotifyService: SpotifyService
  ) { }

  @Action(SetArtistsRequest)
  setArtistsRequest(context: StateContext<SpotifyState>, payload: SetArtistsRequest): void {
    const { setState, getState, dispatch } = context;
    setState({
      ...getState(),
      error: null,
      fetching: true,
    });
    this.spotifyService.getSearchArtists(payload.searchText)
      .subscribe(
        (artists: Artist[]) => dispatch(new SetArtistsSuccess(artists)),
        error => dispatch(new SetArtistsFailure(error))
      );
  }

  @Action(SetArtistsSuccess)
  setArtistsSuccess(context: StateContext<SpotifyState>, payload: SetArtistsSuccess): void {
    const { setState, getState } = context;
    const state = getState();
    let arr = state.history;
    if ((arr.length - payload.artists.length) > 19) {
      arr = [...state.history.slice(payload.artists.length, arr.length - 1), ...payload.artists];
    } else {
      arr = [...state.history, ...payload.artists];
    }

    setState({
      ...getState(),
      artists: payload.artists,
      history: [...arr],
      fetching: false,
      error: null,
    });
  }

  @Action(SetArtistsFailure)
  setArtistsFailure(context: StateContext<SpotifyState>, payload: SetArtistsFailure): void {
    const { setState, getState } = context;

    setState({
      ...getState(),
      artists: [],
      error: payload.error,
      fetching: false,
    });
  }

  @Action(SetArtistRequest)
  setArtistRequest(context: StateContext<SpotifyState>, payload: SetArtistRequest): void {
    const { setState, getState, dispatch } = context;
    setState({
      ...getState(),
      artist: null,
      error: null,
      fetching: true,
    });
    this.spotifyService.getArtistDetails(payload.id)
      .subscribe(
        (artist: Album[]) => {
            dispatch(new SetArtistSuccess(artist));
        },
        error => dispatch(new SetArtistFailure(error))
      );
  }

  @Action(SetArtistSuccess)
  setArtistSuccess(context: StateContext<SpotifyState>, payload: SetArtistSuccess): void {
    const { setState, getState } = context;
    setState({
      ...getState(),
      artist: payload.artist,
      fetching: false,
      error: null,
    });
  }

  @Action(SetArtistFailure)
  setArtistFailure(context: StateContext<SpotifyState>, payload: SetArtistFailure): void {
    const { setState, getState } = context;
    setState({
      ...getState(),
      artist: null,
      error: payload.error,
      fetching: false,
    });
  }

  @Action(SetAlbumDetailsRequest)
  setAlbumDetailsRequest(context: StateContext<SpotifyState>, payload: SetAlbumDetailsRequest): void {
    const { setState, getState, dispatch } = context;
    setState({
      ...getState(),
      error: null,
      fetching: true,
    });
    this.spotifyService.getAlbumDetails(payload.id)
      .subscribe(
        (albumDetails: AlbumDetails) => dispatch(new SetAlbumDetailsSuccess(albumDetails)),
        error => dispatch(new SetAlbumDetailsFailure(error))
      );
  }

  @Action(SetAlbumDetailsSuccess)
  setAlbumDetailsSuccess(context: StateContext<SpotifyState>, payload: SetAlbumDetailsSuccess): void {
    const { setState, getState } = context;
    setState({
      ...getState(),
      album: payload.album,
      fetching: false,
      error: null,
    });
  }

  @Action(SetAlbumDetailsFailure)
  setAlbumDetailsFailure(context: StateContext<SpotifyState>, payload: SetAlbumDetailsFailure): void {
    const { setState, getState } = context;
    setState({
      ...getState(),
      album: null,
      error: payload.error,
      fetching: false,
    });
  }

  @Action(SetPreviousRouteNavigate)
  setRouteNavigate(context: StateContext<SpotifyState>, payload: SetPreviousRouteNavigate): void {
    const { setState, getState } = context;
    setState({
      ...getState(),
      routes: [payload.route]
    });
  }
}
