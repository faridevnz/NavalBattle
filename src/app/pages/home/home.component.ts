import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultBox } from '../../services/gameConfig';
import { gameSettings, board } from '../../services/gameConfig';

interface boxState {
  busy: boolean,
  bomb: boolean,
  alignQueue: string[],
  align: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() gameCode: string = null
  // router queryparams
  board = board
  gameID: string = gameSettings.gameID
  playerID: string = gameSettings.playerID
  defaultBoxState: boxState = defaultBox
  boxNumber: number = 0
  error: boolean = false
  pieces = {
    1: 5,
    2: 3,
    3: 2,
    4: 2,
    5: 1
  }


  constructor(private router: Router) { }

  ngOnInit(): void {
    // controllo sul refresh della pagina
    if ( gameSettings.gameID === null ) this.router.navigate(['/'])
    // altrimenti
    this.defaultBoxState.busy = true;
  }


  // FUNCTIONS
  next(): void {
    // caso di errore
    if ( this.boxNumber != 30 ) this.error = true;
    // caso corretto
    else {
      this.router.navigate(['/play'])
    }
  }

  decreasePieces(value: number): void {
    this.pieces[value]--
    this.boxNumber += value
  }
  increasePieces(value: number): void {
    this.pieces[value]++
    this.boxNumber -= value
  }

  dragStarted(event: DragEvent, boxesNumber: string) {
    event.dataTransfer.setData('text/plain', boxesNumber)
  }

  dragOver(event) {
    event.preventDefault()
  }

}
