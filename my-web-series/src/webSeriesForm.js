import { LitElement, html, css } from '@lion/core';
import '@lion/button/define';
// eslint-disable-next-line import/no-unresolved
import '@lion/select/define';
// eslint-disable-next-line import/no-unresolved
import '@lion/form/define';
// eslint-disable-next-line import/no-unresolved
import '@lion/input/define';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import { Required, IsString } from '@lion/form-core';
import { ajax } from '@lion/ajax';
import { localize, LocalizeMixin } from '@lion/localize';

export class webSeriesForm extends LocalizeMixin(LitElement) {
  // dispatching event
  static get properties() {
    return {
      title: { type: String },
      stars: { type: String },
      director: { type: String },
      streamingPlatform: { type: String },
    };
  }

  // constructor() {
  //   super();
  // }

  // firstUpdated() {
  //   const shadow = this.shadowRoot;
  //   const form = shadow.querySelector('form');
  //   form.submit = e => {
  //     e.preventDefault();
  //     const myEvent = new CustomEvent('form-submit', {
  //       bubbles: true,
  //       composed: true,
  //       detail: {
  //         title: this.shadowRoot.getElementById('title').value,
  //         director: this.shadowRoot.getElementById('director').value,
  //         stars: this.shadowRoot.getElementById('stars').value,
  //         streamingPlatform:
  //           this.shadowRoot.getElementById('streamingPlatform').value,
  //       },
  //     });
  //     this.dispatchEvent(myEvent);
  //   };
  // }

  // adding styles

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
      div {
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
      button:hover {
        background-color: #74b0db;
        color: #050404;
      }
      button {
        background-color: #1b4f72; /* Green */
        border: none;
        color: white;
        margin-top: 10px;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
      }
    `;
  }

  addCard(e) {
    e.preventDefault();

    const title = this.shadowRoot.getElementById('title').value;
    const director = this.shadowRoot.getElementById('director').value;
    const stars = this.shadowRoot.getElementById('stars').value;
    const streamingPlatform =
      this.shadowRoot.getElementById('streamingPlatform').value;
    const cardcontainer = { title, director, stars, streamingPlatform };

    this.dispatchEvent(
      new CustomEvent('addingcards', { detail: cardcontainer })
    );

    this.shadowRoot.getElementById('title').value = '';
    this.shadowRoot.getElementById('director').value = '';
    this.shadowRoot.getElementById('stars').value = '';
    this.shadowRoot.getElementById('streamingPlatform').value = '';
  }

  // form html
  static get localizeNamespaces() {
    return [
      { 'my-web-series': locale => import(`../src/translations/${locale}.js`) },
      ...super.localizeNamespaces,
    ];
  }
  render() {
    loadDefaultFeedbackMessages();
    Required.getMessage = () => '*All fields are mandatory';
    IsString.getMessage = () => 'Numeric characters is not allowed';
    const fetchHandler = name => {
      ajax
        .fetch(`${name}.json`)
        .then(cards => cards.json())
        .then(result => {
          console.log(result.cards);
        });
    };
    return html`
      <lion-form>
        <form name="Myform" id="Web-series-form" class="container1">
          <lion-fieldset name="lion-form">
            <h4>
            <lion-input
              id="title"
              type="text"
              name="title name"
              value=""
              placeholder="Title Name"
              <label slot="label">${localize.msg(
                'my-web-series:title'
              )}</label>  
              
              .parser="${viewValue => String(viewValue) || undefined}"
              .validators="${[new Required(), new IsString()]}"
              .modelValue=${''}
              

            ></lion-input>
  </h4>
            <h4>
            <lion-input
              id="director"
              type="text"
              name="director name"
              value=""
              placeholder="Directors Name"
              label="DIRECTOR:"
              .validators="${[new Required()]}"

            ></lion-input>
  </h4>
  <h4>
            <lion-input
              id="stars"
              type="text"
              name="stars name"
              value=""
              placeholder="Stars Name"
              label="STARS:"
              .validators="${[new Required()]}"
            ></lion-input>
  </h4>
          </lion-fieldset>
          <h4>
          <lion-select
            label="STREAMING PLATFORM:"
            id="streamingPlatform"
            name="streamingPlatformDropdown"
            .validators="${[new Required()]}"
           >
            <select slot="input">
              <option value="Netflix">Netflix</option>
              <option value="Prime">Prime</option>
              <option value="Viki">Viki</option>
              <option value="Hotstar">Hotstar</option>
              .validators="${[new Required()]}"
            </select>
          </lion-select>
          </h4>
          <div class: "submit">
          <lion-button-submit
          
            type="submit"
            id="name"
            value="ADD"
            @click=${() => fetchHandler('db')}
            
          >
            ADD
          </lion-button-submit>
          </div>
        </form>
      </lion-form>
      <button class="button" id="id1" @click="${this.first}" >ENGLISH</button>
      <button class="button" id="id2" @click="${this.second}" >FRENCH</button>
      <button class="button" id="id3" @click="${this.third}" >KOREAN</button>
     
    `;
  }

  first = () => {
    localize.locale = 'en-GB';
    console.log('ENGLISH');
  };

  second = () => {
    localize.locale = 'fr-FR';
    console.log('FRENCH');
  };

  third = () => {
    localize.locale = 'ko-KR';
    console.log('KOREAN');
  };
}
