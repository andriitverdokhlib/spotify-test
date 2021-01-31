export class AlbumDetails {
  id: string;
  name: string;
  artists: {name: string}[];
  images: {height: number, width: number, url: string}[];
  release_date: string;
  tracks: Track[];
}

export class Track {
  name: string;
}
