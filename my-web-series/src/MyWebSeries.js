import { LitElement, html, css } from 'lit';

export class MyWebSeries extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'My app';
  }
  connectedCallback() {
    const webseriesform = document.querySelector('web-series-form');
    const clone = document.importNode(webseriesform.Content, true);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(clone);

    const webseriesoverview = document.querySelector('web-series-overview');
    const clone2 = document.importNode(webseriesoverview.Content, true);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(clone2);
  }
}
class webSeriesForm extends LitElement {
  constructor(title, director, stars, streamingPlatform) {
    super();
    this.title = title;
    this.director = director;
    this.stars = stars;
    this.streamingPlatform = streamingPlatform;
  }
  static get styles() {
    return css`
      :host {
        border-radius: 20px;
        background-color: #f2f2f2;
        padding: 2rem;
        flex: 50%;
        border: 0.2rem solid #d6eaf8;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }
      input[type='text'],
      select,
      textarea {
        width: 100%;
        padding: 1.2rem;
        border: 0.1rem solid #ccc;
        border-radius: 0.4rem;
        box-sizing: border-box;
        margin-top: 0.6rem;
        margin-bottom: 1.6rem;
        resize: vertical;
      }
      .submit {
        display: flex;
        flex-direction: row-reverse;
      }
      #name:hover {
        background-color: #74b0db;
        color: #050404;
      }
      #name {
        background-color: #1b4f72;
        color: white;
        padding: 1.2rem 2rem;
        border: none;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: background-color 1s;
        transition: color 1s;
      }
    `;
  }
  render() {
    return html`
      <div class="container1">
        <form name="Myform" id="Web-series-form">
          <h4>
            TITLE:
            <input
              id="title"
              type="text"
              name="name"
              value=""
              placeholder="Title Name"
            />
          </h4>
          <h4>
            DIRECTOR:
            <input
              id="director"
              type="text"
              name="name"
              value=""
              placeholder="Directors Name"
            />
          </h4>
          <h4>
            STARS:
            <input
              id="stars"
              type="text"
              name="name"
              value=""
              placeholder="Stars Name"
            />
          </h4>
          <h4>
            STREAMING PLATFORM:
            <select id="streamingPlatform" name="streamingPlatformDropdown">
              <option value="none">none</option>
              <option value="Netflix">Netflix</option>
              <option value="Prime">Prime</option>
              <option value="Viki">Viki</option>
              <option value="Hotstar">Hotstar</option>
            </select>
          </h4>
          <h4 class="submit">
            <button type="submit" id="name" value="ADD">ADD</button>
          </h4>
        </form>
      </div>
    `;
  }
}

customElements.define('web-series-form', webSeriesForm);

class webSeriesOverview extends LitElement {
  constructor() {
    super();
  }
  static get styles() {
    return css`
      @media (min-width: 800px) {
        :host {
          border-radius: 20px;
          background-color: #f2f2f2;
          padding: 2rem;
          flex: 50%;
          flex-direction: row;
          border: 0.2rem solid #d6eaf8;
          display: grid;
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
          grid-template-columns: 1fr;
          grid-template-columns: repeat(0, minmax(0, 1fr));
          grid-template-rows: repeat(6, minmax(0, 1fr));
        }
      }

      div {
        background-color: rgb(255, 255, 255);
        margin: 1rem 1rem;
        padding: 1rem 1rem;
        border-radius: 0.5rem;
        border: 0.1rem solid #1b4f72;
      }
    `;
  }
  render() {
    return html`
      <div>
        <span>
          TITLE<br />
          director<br />
          stars<br />
          streaming platform<br />
          <button>DELETE</button>
        </span>
      </div>
      <div>
        <span></span>
      </div>
      <div>
        <span></span>
      </div>
      <div>
        <span></span>
      </div>
      <div>
        <span></span>
      </div>
      <div>
        <span></span>
      </div>
    `;
  }
}

customElements.define('web-series-overview', webSeriesOverview);
