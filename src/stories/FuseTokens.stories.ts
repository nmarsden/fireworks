import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FuseTokensComponent } from '../app/fuse-tokens/fuse-tokens.component';

storiesOf('Fuse Tokens', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        FuseTokensComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('all', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;"> 
                   <app-fuse-tokens style="--played-tile-width:300px;" [tokensRemaining]="3"></app-fuse-tokens>
                 </div>`,
    };
  })
  .add('partial', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;"> 
                   <app-fuse-tokens style="--played-tile-width:300px;" [tokensRemaining]="2"></app-fuse-tokens>
                 </div>`,
    };
  })
  .add('none', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;"> 
                   <app-fuse-tokens style="--played-tile-width:300px;" [tokensRemaining]="0"></app-fuse-tokens>
                 </div>`,
    };
  });
