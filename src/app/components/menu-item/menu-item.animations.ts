import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';

const TRANSITION_DURATION = 300;

export const openCloseAnimation = trigger('openClose', [
  state('true', style({ height: AUTO_STYLE,visibility:AUTO_STYLE })),
  state('false', style({ height: 0,visibility:"hidden" })),
  transition('false <=> true', animate(`${TRANSITION_DURATION}ms ease-in-out`))
]);

export const rotateAnimation = trigger('rotate', [
  state('true', style({ transform: 'rotate(90deg)' })),
  state('false', style({ transform: 'rotate(0deg)' })),
  transition('false <=> true', animate(`${TRANSITION_DURATION}ms ease-in-out`))
]);
