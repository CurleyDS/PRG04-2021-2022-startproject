import * as PIXI from "pixi.js"
import bgImage from "./images/water.jpg"
import fishImage from "./images/fish.png"
import bonesImage from "./images/bones.png"
import sharkImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import { Fish } from "./fish"
import { Bubble } from "./bubble"
import { Shark } from "./shark"

export class Game {

    private pixi: PIXI.Application
    private loader:PIXI.Loader
    private background:PIXI.TilingSprite
    private fishes:Fish[] = []
    private bubbles:Bubble[] = []
    private shark:Shark

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("backgroundTexture", bgImage)
            .add("fishTexture", fishImage)
            .add("deadTexture", bonesImage)
            .add("bubbleTexture", bubbleImage)
            .add("sharkTexture", sharkImage)

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

        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.pixi.stage.addChild(this.shark);
        
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

        this.shark.update()

        for (let fish of this.fishes) {
            if(this.collision(this.shark, fish)){
                console.log("player touches enemy 💀")
            }
        }
    }

    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()