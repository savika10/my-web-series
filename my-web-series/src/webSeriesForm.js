import { LitElement, html, css } from '@lion/core';

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

    this.shadowRoot.getElementById('title').value = null;
    this.shadowRoot.getElementById('director').value = null;
    this.shadowRoot.getElementById('stars').value = null;
    this.shadowRoot.getElementById('streamingPlatform').value = null;
  }
  // form html

  render() {
    return html`
      <form name="Myform" id="Web-series-form" class="container1">
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
          <button
            type="submit"
            id="name"
            value="ADD"
            @click=${e => this.addCard(e)}
          >
            ADD
          </button>
        </h4>
      </form>
    `;
  }
}
