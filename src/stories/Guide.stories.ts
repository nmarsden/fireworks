import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CoreModule } from '../app/core/core.module';

storiesOf('Guide', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [ CoreModule ]
    })
  )
  .add('default', () => {
    const guideOptions = {
      elementGuides: [{
        elementSelector: '#guide-test-1',
        guideText: 'Guide text for test element 1'
      }, {
        elementSelector: '#guide-test-2',
        guideText: 'Guide text for test element 2'
      }],
      menu: {
        elementSelector: '#guide-test-1'
      }
    };

    return {
      template: `<div id="guide-test-1"
                      style="position: absolute; top: 0; left: 0; right: 0; height: calc(1 * var(--main-tile-width));
                             border: thin solid white; font-size: calc(0.5 * var(--main-tile-width));
                             color: white; text-align: center;">Test 1</div>
                 <div id="guide-test-2"
                      style="position: absolute; bottom: 0; left: 0; right: 0; height: calc(1 * var(--main-tile-width));
                             border: thin solid white; font-size: calc(0.5 * var(--main-tile-width));
                             color: white; text-align: center;">Test 2</div>
                 <app-guide [guideOptions]="guideOptions"></app-guide>`,
      props: {
        guideOptions
      }
    };
  });
