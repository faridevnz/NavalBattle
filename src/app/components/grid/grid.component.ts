import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Neighbors {
  top: boolean,
  right: boolean,
  bottom: boolean,
  left: boolean
}
interface boxState {
  busy: boolean,
  destroyed: boolean,
  align: string,
  alignQueue: string[]
}


// Component
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  boxes = [];
  alignes = [];
  

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    for ( let i = 0; i < 100; i++ ) {
      // setting default values
      let value: boxState = {
        busy: false,
        destroyed: false,
        align: null,
        alignQueue: []
      }
      this.boxes.push(value)
      this.alignes.push('center')
    }
  }

  clicked(index: number): void {
    // conditional initialization
    this.neighborsCheck(index);
    // TODO: aggiungere possibilita di eliminare una barca
    this.boxes[index].busy = true

    let first: string = this.boxes[index].alignQueue.shift()
    this.boxes[index].alignQueue.push(first)
    //console.log(this.boxes[index].alignQueue)
    switch ( this.boxes[index].alignQueue[0] ) {
      case 'top':
        this.alignes[index] = "top"
        break;
      case 'right':
        this.alignes[index] = "right"
        break;
      case 'bottom':
        this.alignes[index] = "bottom"
        break;
      case 'left':
        this.alignes[index] = "left"
        break;
      case 'line-horizontal':
        this.alignes[index] = "line-horizontal"
        break;
        case 'line-vertical':
          this.alignes[index] = "line-vertical"
          break;
      default:
        this.alignes[index] = "center"
        break;
    }
  }

  neighborsCheck(index: number): void {
    // conditionally adding center
    if ( !this.boxes[index].alignQueue.includes('center') )
      this.boxes[index].alignQueue.push('center')
    // top check
    if ( index > 9 && this.boxes[index-10].busy && !this.boxes[index].alignQueue.includes('top') ) 
      this.boxes[index].alignQueue.push('top')
    // right check
    if ( (index-1)%10 !== 0 && this.boxes[index+1].busy && !this.boxes[index].alignQueue.includes('right') ) 
      this.boxes[index].alignQueue.push('right')
    // bottom check
    if ( index < 49 && this.boxes[index+10].busy && !this.boxes[index].alignQueue.includes('bottom') ) 
      this.boxes[index].alignQueue.push('bottom')
    // left check
    if ( index%10 !== 0 && this.boxes[index-1].busy && !this.boxes[index].alignQueue.includes('left') ) 
      this.boxes[index].alignQueue.push('left')
    // horizontal line check
    if ( !this.boxes[index].alignQueue.includes('line-horizontal') )
      this.boxes[index].alignQueue.push('line-horizontal')
    if ( !this.boxes[index].alignQueue.includes('line-vertical') )
      this.boxes[index].alignQueue.push('line-vertical')
  }

}
