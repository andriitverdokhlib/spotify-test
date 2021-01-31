import { Artist } from '../../shared/models/artist.model';
import { Album } from '../../shared/models/album.model';
import { AlbumDetails } from '../../shared/models/album-details.model';

export class SetArtistsRequest {
  static readonly type = '[Spotify] Set Artists Request';
  constructor(
    public searchText: string,
  ) {}
}

export class SetArtistsSuccess {
  static readonly type = '[Spotify] Set Artists Success';
  constructor(
    public artists: Artist[]
  ) {}
}

export class SetArtistsFailure {
  static readonly type = '[Spotify] Set Artists Failure';
  constructor(
    public error: Error
  ) {}
}

export class SetArtistRequest {
  static readonly type = '[Spotify] Set Artist Request';
  constructor(
    public id: string,
  ) {}
}

export class SetArtistSuccess {
  static readonly type = '[Spotify] Set Artist Success';
  constructor(
    public artist: Album[]
  ) {}
}

export class SetArtistFailure {
  static readonly type = '[Spotify] Set Artist Failure';
  constructor(
    public error: Error
  ) {}
}

export class SetAlbumDetailsRequest {
  static readonly type = '[Spotify] Set Album Details Request';
  constructor(
    public id: string,
  ) {}
}

export class SetAlbumDetailsSuccess {
  static readonly type = '[Spotify] Set Album Details Success';
  constructor(
    public album: AlbumDetails
  ) {}
}

export class SetAlbumDetailsFailure {
  static readonly type = '[Spotify] Set Album Details Failure';
  constructor(
    public error: Error
  ) {}
}

export class SetPreviousRouteNavigate {
  static readonly type = '[Spotify] Set Previous Route Navigate';
  constructor(
    public route: string
  ) {}
}
