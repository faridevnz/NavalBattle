import { Pipe, PipeTransform } from '@angular/core';
import { BoxComponent } from 'src/app/components/baseComponents/box/box.component';

interface boxState {
  busy: boolean,
  bomb: boolean,
  alignQueue: string[],
  align: string
}


@Pipe({
  name: 'boxState',
  pure: true
})
export class BoxStatePipe implements PipeTransform {

  transform(value: boxState, ...args: string[]): boxState {
    let state = {...value}
    state.align = args[0]
    return state
  }

}
