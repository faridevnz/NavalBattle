import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { board, gameSettings, oppositeBoard } from '../../services/gameConfig';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  gameBoard = board
  oppositeBoard = oppositeBoard
  turn: number = 1


  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

  async attacks(index: number) {
    // recuperiamo il turno da firebase
    await this.firestore.collection(gameSettings.gameID).doc('last')
      .valueChanges()
      .subscribe(data => this.turn = data['turn'])
    // cambio il valore del turno
    this.turn = -this.turn
    // se non e il mio turno non faccio nulla
    if (this.turn === gameSettings.playerID) {

      // ESECUZIONE DELLA MOSSA
      // settiamo la bomba sulla board avversaria locale
      this.oppositeBoard[index].bomb = true
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
