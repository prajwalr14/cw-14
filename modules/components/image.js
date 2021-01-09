// https://developers.google.com/web/fundamentals/web-components/customelements

import { EventBus } from "../utils/EventBus.js";

const template = `
    <style>
        root {
            display: block;
            background-color: #EEE;
            background-image: url(images/back.svg);
            background-position: 50% 50%;
            background-size: 100%;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    </style>
    <root></root>
`;

class GameImage extends HTMLElement {

    static get observedAttributes() {
        return ['turned'];
    }


    get turned() {
        return JSON.parse(this.getAttribute('turned').toLocaleLowerCase());
    }
    set turned(value) {
        this.setAttribute('turned', value);
    }


    get found() {
        return JSON.parse(this.getAttribute('found').toLocaleLowerCase());
    }
    set found(value) {
        this.setAttribute('found', value);
    }


    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.found  = false;
        this.turned = false;
        this.path   = null;

        this.addEventListener('click', event => {
            if(this.turned === false && this.found === false){
                this.turned = true;
                this.shadowRoot.querySelector("root").style.backgroundImage = `url(images/game/${this.path})`;
                EventBus.post('onTurnImage');
            }   
        });

        EventBus.post("onCreateImageOnGrid", this);
    }


    connectedCallback() {
        this.shadowRoot.innerHTML = template;
    }


    attributeChangedCallback(attrName, oldVal, newVal) {
        if(attrName === 'turned' && newVal === "false"){

            setTimeout(() => {
                this.shadowRoot.querySelector("root").style.backgroundImage = "url(images/back.svg)";
            }, 1000);
        }
    }
}
customElements.define("game-image", GameImage);