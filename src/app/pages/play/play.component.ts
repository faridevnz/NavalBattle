import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { board, oppositeBoard, gameSettings } from '../../services/gameConfig'
import { Router } from '@angular/router'


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
  remainingBoxes: number = 30


  constructor(private firestore: AngularFirestore, private router: Router) { }

  async ngOnInit() {
    //se refresho la pagina redirect alla home
    if ( gameSettings.gameID === null ) this.router.navigate(['/'])
    
    // observable dell'update della mossa avversaria
    // se non e il turno mio allora ascolto

    await this.firestore.collection('games').doc(gameSettings.gameID)
      .valueChanges()
      .subscribe( data => {
        index = data[index]
        this.turn = data['turn']
        // TURNO MIO

        // TURNO AVVERSARIO

      })













    let index: number = null
    await this.firestore.collection('games').doc(gameSettings.gameID)
      .valueChanges()
      .subscribe(data => {
        // eseguo il codice solamente se non e il mio turno
        index = data['last']
        this.turn = data['turn']
        if (index !== null && this.turn !== gameSettings.playerID) {
          this.gameBoard[index].bomb = true
          this.latest = index
          // update dell'esito su firestore
          if (this.gameBoard[index].busy) this.remainingBoxes--
          this.updateOutcome(index)
        }
      })
    // observable dell'esito della mia mossa
    await this.firestore.collection('games').doc(gameSettings.gameID)
      .valueChanges()
      .subscribe(data => {
        let index: number = data['index']
        let value: boolean = data['outcome']
        let winner: number = data['winner']
        // se la partita e finita redirect alla pagina di fine
        if (winner !== null) this.router.navigate(['/end'], { queryParams: { winner: winner } })
        // controllo se e il mio turno
        if (index !== null && this.turn === gameSettings.playerID) {
          // settiamo la bomba e l'esito sulla board avversaria locale
          this.oppositeBoard[index].bomb = true
          this.oppositeBoard[index].busy = value
        }
      })
  }


  // FUNCTIONS

  updateOutcome(index: number) {
    this.firestore.collection('games').doc(gameSettings.gameID)
      .set(
        {
          'index': index,
          'outcome': this.gameBoard[index].busy,
          'winner': (this.remainingBoxes === 0) ? gameSettings.playerID : null
        },
        { merge: true }
      )
  }

  async attacks(index: number) {
    // recuperiamo il turno da firebase
    await this.firestore.collection('games').doc(gameSettings.gameID)
      .valueChanges()
      .subscribe(data => this.turn = data['turn'])
    // cambio il valore del turno
    this.turn = -this.turn
    // se non e il mio turno non faccio nulla
    if (this.turn === gameSettings.playerID) {

      // ESECUZIONE DELLA MOSSA
      // update del valore del turno su firebase
      this.firestore.collection('games').doc(gameSettings.gameID)
        .set(
          {
            'turn': this.turn,
            'last': index
          },
          { merge: true }
        )
        .catch(error => console.log(error))

    }
  }

}
