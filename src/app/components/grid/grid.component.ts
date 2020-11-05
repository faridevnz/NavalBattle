import { Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoxComponent } from '../baseComponents/box/box.component';

interface dropEvent {
  component: BoxComponent,
  event: DragEvent
}
interface boxState {
  busy: boolean,
  bomb: boolean,
  alignQueue: string[],
  align: string
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  // props
  @Input() disableClick: boolean = false
  @Input() board: boxState[] = null
  @Input() type: string // my or opposite
  @Input() latest: number = null
  // event emitter
  @Output() onOppositClick: EventEmitter<number> = new EventEmitter<number>()
  @Output() onBoatAdded: EventEmitter<number> = new EventEmitter<number>()
  @Output() onBoatDeleted: EventEmitter<number> = new EventEmitter<number>()

  @ViewChildren(BoxComponent) boxes: QueryList<BoxComponent>


  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // per ogni box della griglia
    this.boxes.forEach(box => {
      // sottoscrizione all'evento di drop
      box.onDrop.subscribe((drop: dropEvent) => {
        let index: number = this.boxes.toArray().indexOf(box)
        let length: number = parseInt( drop.event.dataTransfer.getData('text') )
        this.placeElement(index, length)
      })
      // sottoscrizione all'evento di click destro
      box.onRightClick.subscribe((click: dropEvent) => {
        let index: number = this.boxes.toArray().indexOf(box)
        // click su una casella vuota
        if ( !this.board[index].busy ) return
        // devo eliminare a destra e a sinistra
        let num: number = this.deleteBoat(index, 0, null)
        // emettiamo l'evento di cancellazione della barca
        this.onBoatDeleted.emit(num)
      })
      // sottoscrizione allévento di click sinistro
      box.onLeftClick.subscribe((click: dropEvent) => {
        let index: number = this.boxes.toArray().indexOf(box)
        //click su una casella vuota
        if ( !this.board[index].busy ) return
        // devo verificare se posso girare la barca
        if ( this.isPossibleSpin(index) ) this.spin(index)
      })
    })
  }

  // cancellazione ricorsiva dei blocchi della barca
  deleteBoat(index: number, num: number, direction: string): number {
    // casi base
    if ( !this.board[index].busy ) return num
    if ( this.board[index].align === 'center' ) {
      this.delete(index)
      return 1
    }
    if ( this.board[index].align === 'right' ) {
      this.delete(index)
      return this.deleteBoat(index+1, num+1, 'right')
    }
    if ( this.board[index].align === 'left' ) {
      this.delete(index)
      return this.deleteBoat(index-1, num+1, 'left')
    }
    this.delete(index)
    if ( direction === null ) return this.deleteBoat(index+1, num, 'right') + this.deleteBoat(index-1, num+1, 'left')
    else if ( direction === 'right' ) return this.deleteBoat(index+1, num+1, 'right')
    else return this.deleteBoat(index-1, num+1, 'left')
  }
  // elimina la barca
  delete(index) {
    this.board[index].busy = false
    this.board[index].align = null
  }

  // FUNCTIONS

  clicked(index: number): void {
    if (this.type === 'opposite') {
      // emissione dell evento per attaccare l'avversario
      this.onOppositClick.emit(index)
    }
  }

  placeElement(index: number, length: number): void {
    if ( !this.isPossiblePlace(index, length) ) return
    // caso singola barca
    if ( length === 1 ) {
      this.board[index].busy = true
      this.board[index].align = 'center'
    }
    // ELSE caso piu barche
    else {
      this.board.slice(index, index+length).forEach((box, index) => {
        box.busy = true
        box.align = 'line-horizontal'
        if ( index === 0 ) box.align = 'right'
        if ( index === length-1 ) box.align = 'left'
      })
    }
    //emissione dell'evento del posizionamento della barca
    this.onBoatAdded.emit(length)
  }

  isPossiblePlace(index: number, length: number): boolean {
    // controlliamo se usciamo dal bordo
    // se (index) e (index+length-1) appartengono alla stessa riga
    if ( Math.floor(index/10) !== Math.floor((index+length-1)/10) ) return false
    // controlliamo se le caselle sono tutte disponibili
    let allFalse: boolean = true;
    this.board.slice(index, index+length).forEach(box => {
      allFalse = allFalse && !box.busy
    })
    if ( !allFalse ) return false
    // altrimenti posso posizionare
    return true
  }

  isPossibleSpin(index: number): boolean {
    console.log('INDEX: ' + index)
    let neigh = this.boatLengthCalc(index)
    let isAllTrue: boolean = true
    // top
    if ( index-neigh.before*10 < 0 ) return false
    for ( let i = index-10; i >= index-neigh.before*10; i -= 10 ) {
      console.log('i: ' + i + ', busy: ' + this.board[i].busy)
      isAllTrue = isAllTrue && !this.board[i].busy
    }
    //bottom
    if ( index+neigh.after*10 > 99 ) return false
    for ( let i = index+10; i <= index+neigh.after*10; i += 10 ) {
      console.log('i: ' + i + ', busy: ' + this.board[i].busy)
      isAllTrue = isAllTrue && !this.board[i].busy
    }
    return isAllTrue
  }

  spin(index: number): void {
    let spinRules = {
      'bottom': 'left',
      'left': 'top',
      'top': 'right',
      'right': 'bottom',
      'line-vertical': 'line-horizontal',
      'line-horizontal': 'line-vertical',
      'center': 'center',

    }
    let neigh = this.boatLengthCalc(index)
    // top
    if ( index-neigh.before*10 < 0 ) return
    for ( let i = index-10; i >= index-neigh.before*10; i -= 10 ) {
      this.board[i].busy = true
      this.board[i].align = spinRules[this.board[index].align]
    }
    //bottom
    if ( index+neigh.after*10 > 99 ) return
    for ( let i = index+10; i <= index+neigh.after*10; i += 10 ) {
      this.board[i].busy = true
      this.board[i].align = spinRules[this.board[index].align]
    }
  }

  boatLengthCalc(index: number) {
    let neigh = {
      direction: 'horizontal',
      before: 0,
      after: 0
    }
    // controlli
    if ( this.board[index].align === 'center' ) return neigh
    // provo ad andare verso destra
    let i: number = index
    while ( this.board[i++].align !== 'left' ) neigh.after++
    // provo ad andare verso sinistra
    i = index
    while ( this.board[i--].align !== 'right' ) neigh.before++
    return neigh
  }

}
