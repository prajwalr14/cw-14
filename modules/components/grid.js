// https://developers.google.com/web/fundamentals/web-components/customelements

import { EventBus } from "../utils/EventBus.js";
import { range } from "../utils/utils.js";
import { getRandomListImage } from '../../config.js';

const template = `
    <style>
        .grid-container {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            background: green;
        }
        .grid-cell {
            position: relative;
            height: 60px;
            width: 60px;
            margin: 10px;
            background: red;
        }
    </style>
`;

class GameGrid extends HTMLElement {

    get repeatImage() {
        return parseInt(this.getAttribute('repeatImage'), 10);
    }
    set repeatImage(value) {
        this.setAttribute('repeatImage', value);
    }

    get numberImage() {
        return parseInt(this.getAttribute('numberImage'), 10);
    }
    set numberImage(value) {
        this.setAttribute('numberImage', value);
    }


    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.numberImage = this.numberImage || 2;
        this.repeatImage = this.repeatImage || 2;
        this.listImages  = getRandomListImage(this.numberImage);
        this.mapping     = [];

        EventBus.subscribe("onCreateImageOnGrid", image => {
            this.mapping.push(this.initPathImage(image));
        });

        EventBus.subscribe("onTurnImage", () => {
            this.tryGridCombination(this.findGridImageTurned());
        });
    }

    connectedCallback() {
        const dynamicTemplate = `
        <div class="grid-container">
            ${range(this.repeatImage * this.numberImage).map(n => 
                `<div class="grid-cell">
                    <game-image></game-image>
                </div>`
            ).join("")}
        </div>`;

        this.shadowRoot.innerHTML = template + dynamicTemplate;
    }


    initPathImage(image) {
        let countRepeat = 0;

        do {
            countRepeat = 0;
            image.path   = this.listImages[Math.floor(Math.random() * this.listImages.length)];
            this.mapping.forEach(element => {
                if(element.path === image.path) {
                    countRepeat++;
                }
            });
        } while(countRepeat >= this.repeatImage);

        return image;
    }


    findGridImageTurned() {
        return this.mapping.filter(image => image.turned === true && image.found === false);
    }


    markFoundImage(listTurnedImages) {
        listTurnedImages.map(image => image.found = true);
    }


    turnOffImage(listTurnedImages) {
        listTurnedImages.map(image => image.turned = false);
    }


    tryGridCombination(listTurnedImages) {
        let countSimilar = listTurnedImages.reduce((accumulator, currentImage) => {
            return accumulator += listTurnedImages[0].path === currentImage.path ? 1 : 0;
        }, 0);
        
        if(listTurnedImages.length === this.repeatImage && countSimilar === this.repeatImage) {
            this.markFoundImage(listTurnedImages);
        }

        if(listTurnedImages.length === this.repeatImage && countSimilar !== this.repeatImage) {
            this.turnOffImage(listTurnedImages);
        }
    }

}
customElements.define("game-grid", GameGrid);