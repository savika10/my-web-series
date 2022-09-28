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

export class webSeriesForm extends LitElement {
  // dispatching event
  static get properties() {
    return {
      title: { type: String },
      stars: { type: String },
      director: { type: String },
      streamingPlatform: { type: String },
    };
  }

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

    // this.shadowRoot.getElementById('title').value = null;
    // this.shadowRoot.getElementById('director').value = null;
    // this.shadowRoot.getElementById('stars').value = null;
    // this.shadowRoot.getElementById('streamingPlatform').value = null;
  }

  // fetchHandler = () => {
  //   Ajax.fetchJson(`db.json`).then(result => {
  //     console.log(result.response);
  //   });
  // };

  // form html

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
              label="TITLE:"  
              
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
    `;
  }
}
