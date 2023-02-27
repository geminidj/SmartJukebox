export class Song {
  id: number = 0;
  songID: number = 0;
  artist: string = '';
  title: string = '';
  ID: number = 0; //Unique identifier for the song in Songs table.
  date_played: string = Date.prototype.toString();
  ETA: string = Date.prototype.toString();
  soft_enabled: boolean = true;
  votes: number = 0;
}
