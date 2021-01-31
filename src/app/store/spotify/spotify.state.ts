import { Artist } from '../../shared/models/artist.model';
import { Album } from '../../shared/models/album.model';
import { AlbumDetails } from '../../shared/models/album-details.model';

export interface History {
  artists: Artist[];
}

export interface SpotifyState {
  artists: Artist[];
  artist: Album[] | [] | null;
  album: AlbumDetails | null;
  error: Error | null;
  fetching: boolean;
  history: Artist[];
  routes: string[];
}

export const INITIAL_STATE: SpotifyState = {
  artists: [],
  artist: [],
  album: null,
  error: null,
  fetching: false,
  history: [],
  routes: []
};
