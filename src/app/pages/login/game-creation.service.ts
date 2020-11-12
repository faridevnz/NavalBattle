import { Injectable } from '@angular/core';
import { generateRandomString } from '../../services/utils';
import { AngularFirestore } from '@angular/fire/firestore';
import { gameSettings } from '../../services/gameConfig';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameCreationService {

  defaultBoard: boolean[][] = Array(10).fill( Array(10) )

  constructor(private firestore: AngularFirestore) {
    // default array initialization
    this.defaultBoard.forEach(i => {
      i.forEach(j => {
        j = false
      })
    });
  }


  // game creation function
  async createGame(): Promise<void> {
    //generiamo il codice del Gioco
    gameSettings.gameID = generateRandomString(5)
    gameSettings.playerID = 1
    // scriviamo su firebase
    this.firestore.collection('games')
      .doc(gameSettings.gameID)
      .set(
        {
          'index': null,
          'last': null,
          'outcome': null,
          'turn': gameSettings.playerID,
          'winner': null
        }
      )
      .catch( err => console.log(err) );
  }

  // get of all games
  allGames(): Observable<any> {
    return this.firestore.collection('games')
      .get()
  }

}
