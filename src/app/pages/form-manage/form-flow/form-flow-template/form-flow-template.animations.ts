import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';

const TRANSITION_DURATION = 250;

export const openCloseAnimation = trigger('openClose', [
  state('true', style({ height: AUTO_STYLE,display:"block" })),
  state('false', style({ height: 0,display:"none" })),
  transition('false <=> true', animate(`${TRANSITION_DURATION}ms ease-in`))
]);

export const rotateAnimation = trigger('rotate', [
  state('true', style({ transform: 'rotate(180deg)' })),
  transition('false <=> true', animate(`${TRANSITION_DURATION}ms ease-out`))
]);
