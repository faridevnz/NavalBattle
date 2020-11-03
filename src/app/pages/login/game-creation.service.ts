import { Injectable } from '@angular/core';
import { generateRandomString } from '../../services/utils';
import { AngularFirestore } from '@angular/fire/firestore';
import { gameSettings } from '../../services/gameConfig';

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
    this.firestore.collection(gameSettings.gameID)
      .doc('last')
      .set(
        {
          'value': null,
          'turn': gameSettings.playerID
        }
      )
      .catch( err => console.log(err) );
    this.firestore.collection(gameSettings.gameID)
      .doc('outcome')
      .set(
        {
          'index': null,
          'value': null
        }
      )
      .catch( err => console.log(err) );
  }

  async getAllGames(joinCode: string): Promise<any> {
    this.firestore.collection(joinCode).doc('last').set(
      { 
        'turn': 1
      },
      { merge: true }
    )
    .catch((error) => console.log(error))
  }

}
