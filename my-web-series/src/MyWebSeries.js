// eslint-disable-next-line max-classes-per-file
import { LitElement, html, css } from '@lion/core';
import { LionTabs } from '@lion/tabs';
import { webSeriesForm } from './webSeriesForm.js';
import { webSeriesOverview } from './webSeriesOverview.js';

window.customElements.define('my-tab', LionTabs);
window.customElements.define('web-series-form', webSeriesForm);
window.customElements.define('web-series-overview', webSeriesOverview);

// MyWebSeries
export class MyWebSeries extends LitElement {
  static get properties() {
    return {
      card: { type: Array },
    };
  }

  constructor() {
    super();
    this.card = '';
  }

  // adding eventlistener to form element
  // connectedCallback() {
  //   super.connectedCallback();

  //   const child = document.querySelector('form');
  //   child.addEventListener('form-submit', e => {
  //     this.title = e.detail.title;
  //     this.stars = e.detail.stars;
  //     this.director = e.detail.director;
  //     this.streamingPlatform = e.detail.streamingPlatform;
  //   });
  // }

  // adding styles

  static get styles() {
    return css`
      div.container {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.6rem;
      }
      @media (max-width: 800px) {
        div.container {
          display: grid;
          grid-template-columns: 1fr;
          box-sizing: border-box;
          gap: 1rem;
        }
      }
      my-tab {
        width: 100%;
      }
      button:hover {
        background-color: #74b0db;
        color: #050404;
      }
      button {
        margin: 5px;
        background-color: #1b4f72;
        color: white;
        padding: 1.2rem 2rem;
        border: solid 0.3px white;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: background-color 1s;
        transition: color 1s;
      }
    `;
  }

  createCard(e) {
    // console.log(e.detail);
    this.card = [...this.card, e.detail];
  }

  // adding my-tab in webseries

  render() {
    return html`
      <div class="container">
        <my-tab>
          <button slot="tab">FORM</button>
          <p slot="panel">
            <web-series-form @addingcards=${this.createCard}></web-series-form>
          </p>

          <button slot="tab">OVERVIEW</button>
          <p slot="panel">
            <web-series-overview .card=${this.card}></web-series-overview>
          </p>
        </my-tab>
      </div>
    `;
  }
}
