import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultBox } from '../../services/gameConfig';
import { gameSettings, board } from '../../services/gameConfig';


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

  pieces = {
    1: 5,
    2: 3,
    3: 2,
    4: 2,
    5: 1
  }

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.defaultBoxState.busy = true;
    // prendo il codice della partita ed il codice utente
    // this.route.queryParams.subscribe(params => {
    //   this.gameID = params['gameID']
    //   this.playerID = params['playerID']
    // })
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
