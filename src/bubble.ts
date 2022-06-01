import * as PIXI from "pixi.js"

export class Bubble extends PIXI.Sprite {
    
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = Math.random() * 900
        this.y = Math.random() * 500
        this.scale.set(0.5)
    }

    update(delta:number) {
        if (this.y <= 0) {
            this.y = 500
        } else {
            this.y -= 5 * delta
        }
    }
}