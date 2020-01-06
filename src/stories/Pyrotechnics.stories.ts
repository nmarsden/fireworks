import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';

storiesOf('Pyrotechnics', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
      ],
      imports: [
        CommonModule,
        CoreModule
      ]
    })
  )
  .add('default', () => {
    return {
      template: `<app-pyrotechnics [isHidden]="false"></app-pyrotechnics>`,
    };
  })
  .add('green', () => {
    return {
      template: `<app-pyrotechnics [isHidden]="false" [options]="options"></app-pyrotechnics>`,
      props: {
        options: {
          colours: [ 'green' ],
          numBursts: { lowerBound: 3, upperBound: 7 },
          numParticles: { lowerBound: 10, upperBound: 30 },
          delayInTenthsOfSecs: { lowerBound: 0, upperBound: 50 },
          particleStaggeredDelayInMSecs: { lowerBound: -20, upperBound: 20 },
          centerOffsetX: { lowerBound: -10, upperBound: 10 },
          centerOffsetY: { lowerBound: -10, upperBound: 10 }
        }
      }
    };
  })
  .add('red', () => {
    return {
      template: `<app-pyrotechnics [isHidden]="false" [options]="options"></app-pyrotechnics>`,
      props: {
        options: {
          colours: [ 'red' ],
          numBursts: { lowerBound: 9, upperBound: 10 },
          numParticles: { lowerBound: 10, upperBound: 30 },
          delayInTenthsOfSecs: { lowerBound: 0, upperBound: 60 },
          particleStaggeredDelayInMSecs: { lowerBound: 0, upperBound: 1 },
          centerOffsetX: { lowerBound: 0, upperBound: 1 },
          centerOffsetY: { lowerBound: 0, upperBound: 1 }
        }
      }
    };
  });
