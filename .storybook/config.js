import { configure, addParameters } from '@storybook/angular';
import { themes } from '@storybook/theming';

addParameters({
  options: {
    theme: themes.dark,
    showPanel: true,
    panelPosition: 'bottom'
  },
});

// automatically import all files ending in *.stories.ts
configure(require.context('../src/stories', true, /\.stories\.ts$/), module);
