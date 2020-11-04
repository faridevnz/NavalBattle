import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { boatsNumber } from 'src/app/services/gameConfig';

interface Neighbors {
  top: boolean,
  right: boolean,
  bottom: boolean,
  left: boolean
}
interface boxState {
  busy: boolean,
  destroyed: boolean,
  alignQueue: string[]
}


// Component
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() disableClick: boolean = false
  @Input() board = null
  @Output() onBoxAdded: EventEmitter<number> = new EventEmitter<number>()
  @Output() onOppositClick: EventEmitter<number> = new EventEmitter<number>()
  @Input() type: string // my or opposite
  alignes = [];


  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      if ( this.type === 'my' )  this.alignes.push('center')
      else this.alignes.push(null) 
    }
  }

  clicked(index: number): void {
    // OPPOSITE BOARD
    if (this.type === 'opposite') {
      // emissione dell evento per attaccare l'avversario
      this.onOppositClick.emit(index)
    }
    // MY BOARD
    if (this.type === 'my') {
      // se la griglia non e cliccabile allora non faccio nulla
      if (this.disableClick) return
      // altrimenti
      // scelta di come gestire le barche
      this.boatsHandle(index)
    }
  }

  boatsHandle(index): void {
    // prendiamo l'array dei vicini della cella selezionata
    let neight: string[] = this.neighborsCheck(index)
    // CASO NON BUSY
    if ( !this.board[index].busy ) {
      // emissione evento
      this.onBoxAdded.emit(1)
      // caso di nessun vicino (+1)
      if ( !neight.length && boatsNumber[1] > 0 ) {
        this.board[index].busy = !this.board[index].busy
        boatsNumber[1]--
      }
      // caso di un solo vicino (+1)
      if ( neight.length === 1 ) {
        switch ( neight[0] ) {
          case 'top':
            if ( this.board[index-10].neight )
            break;
          case 'right':
            break;
          case 'bottom':
            break;
          case 'left':
            break;
        }
      }
    }
    // CASO BUSY
    else {
      // emissione evento
      this.onBoxAdded.emit(-1)
      // caso di nessun vicino (-1)
      if ( !neight.length )  {
        this.board[index].busy = !this.board[index].busy
        boatsNumber[1]++
      }
    }
  }

  neighborsCheck(index: number): string[] {
    
    let neigh: string[] = []
    // top check
    if (index > 9 && this.board[index - 10].busy)
      neigh.push('top')
    // right check
    if ((index+1)%10 !== 0 && this.board[index + 1].busy)
      neigh.push('right')
    // bottom check
    if (index < 90 && this.board[index + 10].busy)
      neigh.push('bottom')
    // left check
    if (index%10 !== 0 && this.board[index - 1].busy)
      neigh.push('left')
    
    return neigh

  }

}
