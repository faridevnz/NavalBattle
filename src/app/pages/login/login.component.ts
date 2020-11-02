import { Component, OnInit } from '@angular/core';
import { GameCreationService } from './game-creation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private gameCreation: GameCreationService, private route: Router) { }

  ngOnInit(): void {

  }

  createGame() {
    this.gameCreation.createGame()
    .then( game => {
      console.log(game)
      this.route.navigate(['/play'], {
        queryParams: game
      })
    })
  }

}
