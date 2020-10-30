import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
    }
  }

  clicked(index: number): void {
    // conditional initialization
    if ( this.boxes[index].alignQueue.length === 0 ) {
      this.boxes[index].alignQueue = this.neighborsCheck(index);
      this.boxes[index].busy = true
    }
    let first: string = this.boxes[index].alignQueue.shift()
    this.boxes[index].alignQueue.push(first)
    console.log(this.boxes[index].alignQueue)
    switch ( this.boxes[index].alignQueue[0] ) {
      case 'top':
        this.boxes[index].align = "top"
        this.boxes[index-10].align = "bottom"
        break;
      case 'right':
        this.boxes[index].align = "right"
        this.boxes[index+1].align = "left"
        break;
      case 'bottom':
        this.boxes[index].align = "bottom"
        this.boxes[index+10].align = "top"
        break;
      case 'left':
        this.boxes[index].align = "left"
        this.boxes[index-1].align = "right"
        break;
      default:
        this.boxes[index]["align"] = "center"
        break;
    }
  }

  neighborsCheck(index: number): string[] {
    let queue: string[] = []
    // top check
    if ( index > 9 && this.boxes[index-10].busy ) queue.push('top')
    // right check
    if ( index%9 !== 0 && this.boxes[index+1].busy ) queue.push('right')
    //bottom check
    if ( index < 49 && this.boxes[index+10].busy ) queue.push('bottom')
    // left check
    if ( index%10 !== 0 && this.boxes[index-1].busy ) queue.push('left')
    queue.concat('center')
    return queue;
  }

}
