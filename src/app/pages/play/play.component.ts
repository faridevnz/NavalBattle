import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { board, oppositeBoard, gameSettings } from '../../services/gameConfig';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  gameBoard = board
  oppositeBoard = oppositeBoard
  turn: number = 1
  playerID: number = gameSettings.playerID
  latest: number = null

  constructor(private firestore: AngularFirestore) { }

  async ngOnInit() {
    // observable dell'update della mossa avversaria
    // se non e il turno mio allora ascolto
    let index: number = null
    await this.firestore.collection(gameSettings.gameID).doc('last')
      .valueChanges()
      .subscribe(data => {
        index = data['value']
        this.turn = data['turn']
        if ( index !== null && this.turn !== gameSettings.playerID ) {
          this.gameBoard[index].bomb = true
          this.latest = index
          // update dell'esito su firestore
          this.updateOutcome(index)
        }
      })
    // observable dell'esito della mia mossa
    await this.firestore.collection(gameSettings.gameID).doc('outcome')
      .valueChanges()
      .subscribe(data => {
        let index: number = data['index']
        let value: boolean = data['value']
        // controllo se e il mio turno
        if ( index !== null && this.turn === gameSettings.playerID ) {
          // settiamo la bomba e l'esito sulla board avversaria locale
          this.oppositeBoard[index].bomb = true
          this.oppositeBoard[index].busy = value
        }
      })
  }

  updateOutcome(index: number) {
    this.firestore.collection(gameSettings.gameID).doc('outcome')
      .set(
        {
          'index': index,
          'value': this.gameBoard[index].busy
        },
        { merge: true }
      )
  }

  async attacks(index: number) {
    // recuperiamo il turno da firebase
    await this.firestore.collection(gameSettings.gameID).doc('last')
      .valueChanges()
      .subscribe(data => this.turn = data['turn'])
    // cambio il valore del turno
    this.turn = -this.turn
    // se non e il mio turno non faccio nulla
    if ( this.turn === gameSettings.playerID ) {

      // ESECUZIONE DELLA MOSSA
      // update del valore del turno su firebase
      this.firestore.collection(gameSettings.gameID).doc('last')
        .set(
          {
            'turn': this.turn,
            'value': index
          },
          { merge: true }
        )
        .catch(error => console.log(error))

    }
  }

}
