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

  async createGame() {
    //generiamo il codice del Gioco
    gameSettings.gameID = generateRandomString(5)
    gameSettings.playerID = 1
    // scriviamo su firebase
    this.firestore.collection('games')
      .doc(gameSettings.gameID)
      .set(
        {
          'last': null,
          'turn': gameSettings.playerID
        }
      )
      .catch( err => console.log(err) );
    this.firestore.collection('games')
      .doc(gameSettings.gameID)
      .set(
        {
          'index': null,
          'outcome': null,
          'winner': null
        }
      )
      .catch( err => console.log(err) );
  }

  async joinGame(joinCode: string): Promise<any> {
    this.firestore.collection('games').doc(joinCode).set(
      { 
        'turn': 1
      },
      { merge: true }
    )
    .catch((error) => console.log(error))
  }

  allGames(): Observable<any> {
    return this.firestore.collection('games')
      .get()
  }

}
