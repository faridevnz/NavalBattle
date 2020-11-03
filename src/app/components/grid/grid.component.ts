import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { threadId } from 'worker_threads';

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
    if (this.type === 'opposite') {
      // emissione dell evento per attaccare l'avversario
      this.onOppositClick.emit(index)
    }
    if (this.type === 'my') {
      // se la griglia non e cliccabile allora non faccio nulla
      if (this.disableClick) return
      // altrimenti
      if (!this.board[index].busy) this.onBoxAdded.emit(1)
      else this.onBoxAdded.emit(-1)
      this.board[index].busy = !this.board[index].busy
    }
  }

  neighborsCheck(index: number): void {
    // conditionally adding center
    if (!this.board[index].alignQueue.includes('center'))
      this.board[index].alignQueue.push('center')
    // top check
    if (index > 9 && this.board[index - 10].busy && !this.board[index].alignQueue.includes('top'))
      this.board[index].alignQueue.push('top')
    // right check
    if ((index - 1) % 10 !== 0 && this.board[index + 1].busy && !this.board[index].alignQueue.includes('right'))
      this.board[index].alignQueue.push('right')
    // bottom check
    if (index < 49 && this.board[index + 10].busy && !this.board[index].alignQueue.includes('bottom'))
      this.board[index].alignQueue.push('bottom')
    // left check
    if (index % 10 !== 0 && this.board[index - 1].busy && !this.board[index].alignQueue.includes('left'))
      this.board[index].alignQueue.push('left')
    // horizontal line check
    if (!this.board[index].alignQueue.includes('line-horizontal'))
      this.board[index].alignQueue.push('line-horizontal')
    if (!this.board[index].alignQueue.includes('line-vertical'))
      this.board[index].alignQueue.push('line-vertical')
  }

}
