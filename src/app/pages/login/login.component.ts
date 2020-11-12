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

  joinCode: string = ''
  error: boolean = false


  constructor(private gameCreation: GameCreationService, private route: Router) { }

  ngOnInit(): void {
    this.gameCreation.allGames().subscribe(games => {
      games.forEach(game => {
        console.log(game.id)
      });
    })
  }

  createGame(): void {
    this.gameCreation.createGame()
      .then(() => {
        this.route.navigate(['/settings'])
      })
  }

  updateJoinCode(event: any): void {
    this.joinCode = event.target.value
  }

  joinGame(): void {
    this.existGame(this.joinCode)
      .then( result => {
        this.error = !result
        // valid code
        if ( result ) {
          // creazione del codice utente
          gameSettings.playerID = -1
          gameSettings.gameID = this.joinCode
          this.route.navigate(['/settings'])
        } 
      })
      .catch( error => console.log(error) )
  }

  async existGame(gameCode: string): Promise<boolean> {
    let exists = false
    await this.gameCreation.allGames().toPromise()
      .then(games => {
        games.forEach(game => {
          console.log('evaluing')
          if ( game.id == gameCode ) exists = true
        });
      })
      .catch( error => console.log(error) )
    return exists
  }

}
