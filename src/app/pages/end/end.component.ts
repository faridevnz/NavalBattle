import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { gameSettings } from '../../services/gameConfig'

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  outcome: boolean 


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let winner = params['winner']
      this.outcome = winner == gameSettings.playerID
    })
  }

}
