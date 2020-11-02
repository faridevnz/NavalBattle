import { Injectable } from '@angular/core';
import { generateRandomString } from '../../services/utils';
import { AngularFirestore } from '@angular/fire/firestore';


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
    const gameSettings = {
      gameID: await generateRandomString(5),
      playerID: await generateRandomString(5)
    }
    // scriviamo su firebase
    await this.firestore.collection(gameSettings.gameID).doc(gameSettings.playerID).set({'last': ''})
      .then( res => console.log(res) )
      .catch( err => console.log(err) );

    return gameSettings;
  }

}
