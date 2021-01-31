import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Artist } from '../../../shared/models/artist.model';
import { Album } from '../../../shared/models/album.model';
import { AlbumDetails, Track } from '../../../shared/models/album-details.model';
import { ApiService } from '../api-service/api-service.service';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private apiService: ApiService) {}

  getSearchArtists(text: string): Observable<Artist[]> {
    return this.apiService.searchArtist(text).pipe(
      map(result => {
        const artists = result.artists.items;
        return artists.map(({ id, name, genres, images }) => {
          return { id, name, genres, images };
        });
      })
    );
  }

  getArtistDetails(artistId: string): Observable<Album[]> {
    return this.apiService.getArtistDetails(artistId).pipe(map(({items}) => {
      return items.map(({ id, name, images }) => {
        return { id, name, images };
      });
    }));
  }

  getAlbumDetails(albumId: string): Observable<AlbumDetails> {
    return this.apiService.getAlbumDetails(albumId).pipe(map((data: any) => {
      const tracks: Track[] = data.tracks.items.map(track => {
        return {name: track.name};
      }).sort((a, b) => a.name.localeCompare(b.name));
      return {
        id: data.id,
        name: data.name,
        release_date: data.release_date,
        images: data.images,
        artists: data.artists.map(a => a.name),
        tracks
      };
    }));
  }
}
