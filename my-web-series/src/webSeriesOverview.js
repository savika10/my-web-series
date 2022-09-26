import { html, css } from '@lion/core';
import { WebSeriesCard } from './web-series-card.js';

window.customElements.define('web-series-card', WebSeriesCard);

export class webSeriesOverview extends WebSeriesCard {
  static get properties() {
    return {
      card: { type: Array },
    };
  }

  constructor() {
    super();
    this.card = [];
  }

  // adding values through attribute
  // connectedCallback() {
  //   super.connectedCallback();
  //   this.title = this.getAttribute('title');
  //   this.director = this.getAttribute('director');
  //   this.stars = this.getAttribute('stars');
  //   this.streamingPlatform = this.getAttribute('streamingPlatform');
  // }

  // adding styles

  static get styles() {
    return css`
      @media (min-width: 800px) {
        :host {
          border-radius: 20px;
          background-color: #f2f2f2;
          padding: 2rem;
          border: 0.2rem solid #d6eaf8;
          display: grid;
          grid-gap: 15px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(3, minmax(0, 1fr));
        }
      }
      @media (max-width: 800px) {
        :host {
          border-radius: 20px;
          background-color: #f2f2f2;
          padding: 2rem;
          border: 0.2rem solid #d6eaf8;
          display: grid;
          grid-gap: 5px;
          grid-template-columns: 1fr;
          grid-template-columns: repeat(0, minmax(0, 1fr));
          grid-template-rows: repeat(6, minmax(0, 1fr));
        }
      }
    `;
  }

  // connecting values
  render() {
    return html`
      ${this.card.map(
        item =>
          html`<web-series-card
            id="card"
            title=${item.title}
            director=${item.director}
            stars=${item.stars}
            streamingPlatform=${item.streamingPlatform}
          ></web-series-card>`
      )}
    `;
  }
}
