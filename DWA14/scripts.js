import { LitElement, html, css } from './lit.js';


/**
 * Custom element representing a tally app.
 * @extends LitElement
 */
class MyElement extends LitElement {

  /**
   * Properties for the component.
   * @static
   * @type {Object}
   */
  static properties = {
    value: { type: Number },
    resetMessageVisible: { type: Boolean }
  };
  
  /**
   * CSS styles for the component.
   * @static
   * @type {CSSResult}
   * 
   */
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    input {
      margin-bottom: 10px;
      padding: 8px;
      font-size: 18px;
      text-align: center;
      width: 300px;
    }

    .buttons {
      display: flex;
      flex-direction: row;
    }

    button {
      padding: 8px 16px;
      font-size: 16px;
      margin-bottom: 5px;
      margin-right : 10px
      
    }

    p {
      margin-top: 5px;
      font-size: 34px;
      color: gray;
    }
    .reset {
        color : green
    }
    .btn {
        color : red
    }
  `;
  
  /**
   * Constructs a new instance of MyElement.
   * Initializes the value and resetMessageVisible properties.
   */
  constructor() {
    super();
    this.value = 0;
    this.resetMessageVisible = false;
  }

  
  /**
   * Renders the component template.
   * @returns {TemplateResult} The rendered template.
   */
  render() {
    return html`
      <div class="container">
        <input readonly .value="${this.value}">
        <div class="buttons">
          <button @click="${this.increment}" ?disabled="${this.value >= 15}" data-plus>+</button>
          <button @click="${this.decrement}" ?disabled="${this.value <= -5}" data-minus>-</button>
        </div>
        <button @click="${this.handleReset}" data-reset>Reset</button>
        ${this.value >= 15 ? html`<p class = 'btn'>You have reached the maximum value.</p>` : ''}
        ${this.value <= -5 ? html`<p class = 'btn'>You have reached the minimum value.</p>` : ''}
        ${this.resetMessageVisible ? html`<p class = 'reset'>Counter has been reset.</p>` : ''}
      </div>
    `;
  }
  
   /**
   * Event handler for the increment button click event.
   * Increments the value property.
   */
  increment() {
    this.value++;
  }
   
   /**
   * Event handler for the decrement button click event.
   * Decrements the value property.
   */
  decrement() {
    this.value--;
  }
  
   /**
   * Event handler for the reset button click event.
   * Resets the value property to 0 and shows the reset message.
   */
  handleReset() {
    this.value = 0;
    this.resetMessageVisible = true;

    setTimeout(() => {
      this.resetMessageVisible = false;
    }, 3000); // Reset message disappears after 3 seconds
  }
}

customElements.define('my-nelson', MyElement);
