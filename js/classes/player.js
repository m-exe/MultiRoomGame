class Player extends Sprite{
    constructor({
       CollisionsBlocks = [], imageSrc, frameRate, animations, loop}) {
        super({imageSrc, frameRate, animations, loop})
        this.position = {
            x: 200,
            y: 200,
        }
        this.velocity = {
            x:0,
            y:0,
        }
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1;
        this.CollisionsBlocks = CollisionsBlocks;
    }
    update(){
       // c.fillStyle = 'rgba(0,0,255,0.5)';
       // c.fillRect(this.position.x, this.position.y, this.width,this.height)
        this.position.x += this.velocity.x;

        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.applyGravity();

        this.updateHitbox()
     //   c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        this.checkForVerticalCollisions();
    }

    handleInput(keys){
        if (this.preventInput) return
        this.velocity.x = 0;
        if (keys.ArrowRight.pressed){
            this.switchSprite('runRight')
            this.velocity.x = 4 ;
            this.lastDirection = 'right'
        }
        else if (keys.ArrowLeft.pressed) {
            this.switchSprite('runLeft')
            this.velocity.x = -4;
            this.lastDirection = 'left'
        } else {
            if (this.lastDirection === 'left')
                this.switchSprite('idleLeft')
            else this.switchSprite('idleRight')
        }
    }

    switchSprite(name){
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34,
            },
            width: 50,
            height: 54,
        }
    }
    checkForHorizontalCollisions(){

        for (let i=0; i < this.CollisionsBlocks.length; i++){
            const CollisionBlock = this.CollisionsBlocks[i];

            if (this.hitbox.position.x <= CollisionBlock.position.x + CollisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= CollisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= CollisionBlock.position.y &&
                this.hitbox.position.y <= CollisionBlock.position.y + CollisionBlock.height){

                if (this.velocity.x < 0){
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = CollisionBlock.position.x + CollisionBlock.width - offset + 0.01;
                    break;
                }
                if (this.velocity.x > 0){
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = CollisionBlock.position.x - offset - 0.01;
                    break;
                }
            }
        }
    }
    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y;
    }
    checkForVerticalCollisions(){
        for (let i=0; i < this.CollisionsBlocks.length; i++){
            const CollisionBlock = this.CollisionsBlocks[i];

            if (this.hitbox.position.x <= CollisionBlock.position.x + CollisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= CollisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= CollisionBlock.position.y &&
                this.hitbox.position.y <= CollisionBlock.position.y + CollisionBlock.height){

                if (this.velocity.y < 0){
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = CollisionBlock.position.y + CollisionBlock.height - offset + 0.01;
                    break;
                }
                if (this.velocity.y > 0){
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = CollisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }
}