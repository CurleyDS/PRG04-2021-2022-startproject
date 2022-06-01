import * as PIXI from "pixi.js"
import bgImage from "./images/water.jpg"
import fishImage from "./images/fish.png"
import bonesImage from "./images/bones.png"
import bubbleImage from "./images/bubble.png"
import { Fish } from "./fish"
import { Bubble } from "./bubble"

export class Game {

    pixi: PIXI.Application
    loader:PIXI.Loader
    background:PIXI.TilingSprite
    fishes:Fish[] = []
    bubbles:Bubble[] = []

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("backgroundTexture", bgImage)
            .add("fishTexture", fishImage)
            .add("deadTexture", bonesImage)
            .add("bubbleTexture", bubbleImage)

        this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        this.background = new PIXI.TilingSprite(
            this.loader.resources["backgroundTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height,
        )
        this.pixi.stage.addChild(this.background)
        
        for (let x = 0; x < 10; x++) {
            let fish = new Fish(
                this.loader.resources["fishTexture"].texture!,
                this.loader.resources["deadTexture"].texture!)
            this.pixi.stage.addChild(fish);
            this.fishes.push(fish);
        }
        
        for (let x = 0; x < 10; x++) {
            let bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
            this.pixi.stage.addChild(bubble);
            this.bubbles.push(bubble);
        }
        
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta:number) {
        this.background.tilePosition.x += 1;
        
        for (let fish of this.fishes) {
            fish.update(delta)
        }

        for (let bubble of this.bubbles) {
            bubble.update(delta)
        }
    }
}

new Game()