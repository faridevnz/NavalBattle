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
  winner: number = null


  constructor(private firestore: AngularFirestore, private router: Router) { }

  async ngOnInit() {
    //se refresho la pagina redirect alla home
    if ( gameSettings.gameID === null ) this.router.navigate(['/'])
    // observable dell'update della mossa avversaria
    // se non e il turno mio allora ascolto
    await this.firestore.collection('games').doc(gameSettings.gameID)
      .valueChanges()
      .subscribe( data => {
        let index: number = data['last']
        this.turn = data['turn']
        // TURNO MIO
        if ( this.turn === gameSettings.playerID ) {
          // VERIFICA VITTORIA AVERSARIO
          let winner: number = data['winner']
          // se la partita e finita redirect alla pagina di fine
          if (winner !== null) this.router.navigate(['/end'], { queryParams: { winner: winner } })
          // ALTRIMENTI
          // devo vedere dove ha sparato l'avversario e devo comunicare l'esito dello sparo
          if ( index === null ) return
          this.latest = index
          this.gameBoard[index].bomb = true 
          // se mi ha colpito decremento il numero di box mancanti
          if ( this.gameBoard[index].busy ) this.remainingBoxes--
          // update dell'esito su firestore
          if ( this.winnerCheck() ) this.winner = gameSettings.playerID
          this.updateOutcome(index)
        }
        // TURNO AVVERSARIO
        else {
          if ( index === null ) return
          // devo vedere quale e l'esito dello sparo e se l'avversario ha vinto
          let value: boolean = data['outcome']
          let winner: number = data['winner']
          // se la partita e finita redirect alla pagina di fine
          if (winner !== null) this.router.navigate(['/end'], { queryParams: { winner: winner } })
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
          'outcome': this.gameBoard[index].busy,
          'winner': (this.winnerCheck()) ? gameSettings.playerID : null
        },
        { merge: true }
      )
  }

  async attacks(index: number) {
    // se ho gia attaccato quell'indice non faccio nulla
    if ( this.oppositeBoard[index].bomb ) return
    // cambio il valore del turno
    // se non e il mio turno non faccio nulla
    if (this.turn === gameSettings.playerID) {
      // ESECUZIONE DELLA MOSSA
      // update del valore del turno su firebase
      this.firestore.collection('games').doc(gameSettings.gameID)
        .set(
          {
            'turn': -this.turn,
            'last': index
          },
          { merge: true }
        )
        .catch(error => console.log(error))
    }
  }

  winnerCheck(): boolean {
    return this.gameBoard.filter((box) => {
      return box.busy
    }).reduce((accumulator, box) => {
      return accumulator && box.bomb
    }, true)
  }

}
