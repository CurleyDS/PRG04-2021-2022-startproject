import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import { Sprite } from 'pixi.js'

//
// STAP 1 - maak een pixi canvas
//
const pixi = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(pixi.view)

let water: PIXI.Sprite;

//
// STAP 2 - preload alle afbeeldingen
//
const loader = new PIXI.Loader()
loader.add('fishTexture', fishImage)
      .add('bubbleTexture', bubbleImage)
      .add('waterTexture', waterImage)
loader.load(()=>loadCompleted())

//
// STAP 3 - maak een sprite als de afbeeldingen zijn geladen
//
function loadCompleted() {
    water = new PIXI.Sprite(loader.resources["waterTexture"].texture!);
    pixi.stage.addChild(water);

    for (let x = 0; x < Math.random() * 100; x++) {
        let fish = new PIXI.Sprite(loader.resources["fishTexture"].texture!);
        fish.tint = Math.random() * 0xFFFFFF;
        fish.x = Math.random() * 800;
        fish.y = Math.random() * 450;
        pixi.stage.addChild(fish);
        pixi.ticker.add((delta)=>moveFish(fish, delta));
        
        let bubble = new PIXI.Sprite(loader.resources["bubbleTexture"].texture!);
        bubble.x = Math.random() * 800;
        bubble.y = Math.random() * 450;
        pixi.stage.addChild(bubble);
        pixi.ticker.add((delta)=>moveBubble(bubble, delta));
    }
}

function moveFish(fish:PIXI.Sprite, delta:number) {
    fish.x += delta * -1;
}

function moveBubble(bubble:PIXI.Sprite, delta:number) {
    bubble.x += delta * -0.5;
}