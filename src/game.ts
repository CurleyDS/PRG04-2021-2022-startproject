import * as PIXI from "pixi.js"
import bgImage from "./images/water.jpg"
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import { Fish } from "./fish"
import { Bubble } from "./bubble"

export class Game {

    pixi: PIXI.Application
    loader:PIXI.Loader
    background:PIXI.TilingSprite
    fish:Fish
    bubble:Bubble

    constructor() {
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("backgroundTexture", bgImage)
            .add("fishTexture", fishImage)
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
        
        this.fish = new Fish(this.loader.resources["fishTexture"].texture!)
        this.pixi.stage.addChild(this.fish);
        
        this.bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
        this.pixi.stage.addChild(this.bubble);
        
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta:number) {
        this.background.tilePosition.x += 1;
        this.fish.update(delta)
        this.bubble.update(delta)
    }
}

new Game()