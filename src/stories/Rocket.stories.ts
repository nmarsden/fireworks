import { storiesOf, moduleMetadata } from '@storybook/angular';
import { RocketComponent } from '../app/core/rocket/rocket.component';

storiesOf('Rocket', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        RocketComponent
      ],
      imports: []
    })
  )
  .add('red', () => {
    return {
      template: `<div style="--played-tile-width:300px;
                             display:flex; width:100%; height:100vh; justify-content:center; align-items:center;">
                   <app-rocket [rocketType]="'red'"></app-rocket>
                 </div>`,
    };
  })
  .add('blue', () => {
    return {
      template: `<div style="--played-tile-width:300px;
                             display:flex; width:100%; height:100vh; justify-content:center; align-items:center;">
                   <app-rocket [rocketType]="'blue'"></app-rocket>
                 </div>`,
    };
  })
  .add('green', () => {
    return {
      template: `<div style="--played-tile-width:300px;
                             display:flex; width:100%; height:100vh; justify-content:center; align-items:center;">
                   <app-rocket [rocketType]="'green'"></app-rocket>
                 </div>`,
    };
  });
