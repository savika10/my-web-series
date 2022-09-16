import { html } from 'lit';
import '../src/my-web-series.js';

export default {
  title: 'MyWebSeries',
  component: 'my-web-series',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <my-web-series
      style="--my-web-series-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </my-web-series>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
