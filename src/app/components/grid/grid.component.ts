import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  // props
  @Input() disableClick: boolean = false
  @Input() board = null
  @Input() type: string // my or opposite
  @Input() latest: number = null
  @Input() defaultAlign: string
  // event emitter
  @Output() onBoxAdded: EventEmitter<number> = new EventEmitter<number>()
  @Output() onOppositClick: EventEmitter<number> = new EventEmitter<number>()


  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  
  }

  // FUNCTIONS

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

}
