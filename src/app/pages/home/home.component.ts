import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultBox } from '../../services/gameConfig';
import { gameSettings, board, boatsNumber } from '../../services/gameConfig';


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
  defaultBoxState = defaultBox
  boxNumber: number = 0
  error: boolean = false

  pieces = boatsNumber

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.defaultBoxState.busy = true;
  }

  incrementBoxNumber(value: number): void {
    this.error = false;
    this.boxNumber += value
  }

  next(): void {
    // caso di errore
    if ( this.boxNumber != 30 ) this.error = true;
    // caso corretto
    else {
      this.router.navigate(['/play'])
    }
  }

}
