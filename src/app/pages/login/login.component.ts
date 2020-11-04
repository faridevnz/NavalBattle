import { Component, OnInit } from '@angular/core';
import { GameCreationService } from './game-creation.service';
import { Router } from '@angular/router';
import { gameSettings } from '../../services/gameConfig';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  joinCode: string = null
  error: boolean = false


  constructor(private gameCreation: GameCreationService, private route: Router) { }

  ngOnInit(): void {
  
  }

  createGame() {
    this.gameCreation.createGame()
      .then(() => {
        this.route.navigate(['/settings'])
      })
  }

  updateJoinCode(event: any) {
    this.joinCode = event.target.value
  }

  async joinGame() {
    // creazione del codice utente
    gameSettings.playerID = -1
    this.gameCreation.getAllGames(this.joinCode)
    gameSettings.gameID = this.joinCode
    this.route.navigate(['/settings'])
  }

}
