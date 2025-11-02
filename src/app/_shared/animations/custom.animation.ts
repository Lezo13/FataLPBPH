import {
  animate,
  AnimationTriggerMetadata,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const sideNavSlideAnimation: AnimationTriggerMetadata =
  // Unique trigger name required because it will be put in .html
  trigger('openCloseSlideAnimation', [
    /**
     * We define states because there are only two possible states,
     * expanded, and collapsed. Styles persist after animation
     */
    // States with styles to apply if the state is matched
    state('expanded', style({
      width: '20%'
    })),
    state('collapsed', style({
      padding: 0,
      'min-width': '50px',
      width: '50px'
    })),
    // We define the transitions from the states
    transition('expanded <=> collapsed', [
      animate('200ms ease-in')
    ])
  ]);

export const fadeAnimation: AnimationTriggerMetadata =
  // Does not have a defined state, so none included
  trigger('fadeAnimation', [
    // Animation from void state to * state
    transition(':enter', [
      // We give the style below to * state
      style({ opacity: 0 }),
      animate('0.15s ease-in')
    ]),
    // '*' state to void state
    transition(':leave', [
      // We cannot give any styles to void state, so no style(...)
      // The style(...) below indicates the style of the * state
      //  before becoming void state or out of view.
      animate('0.15s ease-out', style({ opacity: 0 }))
    ])
  ]);

export const fadeNoLeaveAnimation: AnimationTriggerMetadata =
  trigger('fadeNoLeaveAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('150ms ease-in')
    ]),
    transition(':leave', [
      animate('0ms ease-out', style({ opacity: 0 }))
    ])
  ]);

export const fadeNoEnterAnimation: AnimationTriggerMetadata =
  trigger('fadeNoEnterAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0ms ease-in')
    ]),
    transition(':leave', [
      animate('0.15s ease-out', style({ opacity: 0 }))
    ])
  ]);

export const listAnimation: AnimationTriggerMetadata =
  trigger('listAnimation', [
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0 }),
        stagger(100, [
          animate('0.1s', style({ opacity: 1 }))
        ])
      ], { optional: true })
    ])
  ]);

export const badgeShowAnimation: AnimationTriggerMetadata =
  trigger('badgeShowAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.5) rotate(-25deg)' }),
      animate('100ms cubic-bezier(0.58, 0.15, 0.42, 1.07)')
    ]),
    transition(':leave', [
      animate('100ms cubic-bezier(0.58, 0.15, 0.42, 1.07)', style({ opacity: 0, transform: 'scale(0.5) rotate(-25deg)' }))
    ])
  ]);

export const fadeAnimationTriggered: AnimationTriggerMetadata =
  trigger('fadeAnimationTriggered', [
    state('1', style({ opacity: 1 })),
    state('0', style({ opacity: 0 })),
    transition('1 => 0', animate('100ms ease-in')),
    transition('0 => 1', animate('100ms ease-out'))
  ]);

export const growAnimation: AnimationTriggerMetadata =
  trigger('grow', [
    transition('void <=> *', []),
    transition('* <=> *', [
      style({ height: '{{startHeight}}px', opacity: 0 }),
      animate('0.25s ease-out')
    ], {
      params: { startHeight: 0 }
    })
  ]);
