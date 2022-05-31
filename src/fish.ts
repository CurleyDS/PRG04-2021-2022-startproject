import * as PIXI from "pixi.js"

export class Fish extends PIXI.Sprite {
    
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = Math.random() * 900
        this.y = Math.random() * 500
        this.scale.set(0.5)
        this.tint = Math.random() * 0xFFFFFF
    }

    update(delta:number) {
        if (this.x <= 0) {
            this.x = 900
        } else {
            this.x -= 5 * delta
        }
    }
}