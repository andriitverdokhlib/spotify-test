import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://api.spotify.com/v1';
  constructor(private http: HttpClient) {
  }

  searchArtist(searctText: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${searctText}&type=artist`);
  }

  getArtistDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/artists/${id}/albums`);
  }

  getAlbumDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/albums/${id}`);
  }
}
