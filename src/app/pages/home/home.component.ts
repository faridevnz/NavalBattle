import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface boxState {
  busy: boolean,
  destroyed: boolean,
  alignQueue: string[]
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() gameCode: string = null
  // router queryparams
  gameID: string = null
  playerID: string = null

  defaultBoxState: boxState = {
    busy: true,
    destroyed: false,
    alignQueue: []
  }
  pieces = {
    1: 5,
    2: 3,
    3: 2,
    4: 2,
    5: 1
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('init')
    this.route.queryParams.subscribe(params => {
      this.gameID = params['gameID']
      this.playerID = params['playerID']
    })
  }

}
