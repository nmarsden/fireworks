import { configure, addParameters } from '@storybook/angular';
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  options: {
    theme: themes.dark,
    showPanel: false,
    panelPosition: 'bottom'
  },
  viewport: {
    viewports: { ...INITIAL_VIEWPORTS }
  }
});

// automatically import all files ending in *.stories.ts
configure(require.context('../src/stories', true, /\.stories\.ts$/), module);
