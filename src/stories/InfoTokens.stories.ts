import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { InfoTokensComponent } from '../app/info-tokens/info-tokens.component';

storiesOf('Info Tokens', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        InfoTokensComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('single', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;"> 
                   <app-info-tokens style="--played-tile-width:300px;" [isShowSingleToken]="true"></app-info-tokens>
                 </div>`,
    };
  })
  .add('all', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;"> 
                   <app-info-tokens style="--played-tile-width:300px;" [tokensRemaining]="8"></app-info-tokens>
                 </div>`,
    };
  })
  .add('partial', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;"> 
                   <app-info-tokens style="--played-tile-width:300px;" [tokensRemaining]="5"></app-info-tokens>
                 </div>`,
    };
  })
  .add('none', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;"> 
                   <app-info-tokens style="--played-tile-width:300px;" [tokensRemaining]="0"></app-info-tokens>
                 </div>`,
    };
  });
