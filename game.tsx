"use client"

import { useState, useEffect } from 'react';

type Sprite = {
    position: {
        x: number,
        y: number
    },
    offset: {
        x: number,
        y: number,
    },
    image: string,
    scale: number,
    frames: number,
    framesCurrent: number,
    framesElapsed: number,
    framesHold: number
}

type Fighter = {
    position: {
        x: number,
        y: number
    },
    velocity: {
        x: number,
        y: number
    },
    attackBox: {
        position: {
            x: number,
            y: number
        },
        offset: {
            x: number,
            y: number
        },
        width: number,
        height: number
    },
    width: number,
    heigth: number,
    player: boolean,
    color: string,
    isAttacking: boolean,
    health: number,
    image: Sprite,
    isHit: boolean,
    dead: boolean,
    sprites: {
        idle: Sprite,
        run: Sprite,
        jump: Sprite,
        fall: Sprite,
        attack1: Sprite,
        takeHit: Sprite,
        death: Sprite
    }
}

const GameComponent: React.FC = () => {
    const [timer, setTimer] = useState(60);
    const [gravity] = useState(0.7);
    const [battleResult, setBattleResult] = useState('');
    const [spriteArray] = useState<Sprite[]>([
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 0,
            },
            image: '/assets/fightingGame/background/background.png',
            scale: 1,
            frames: 1,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 0
        },
        {
            position: {
                x: 600,
                y: 128,
            },
            offset: {
                x: 0,
                y: 0,
            },
            image: '/assets/fightingGame/decorations/shop_anim.png',
            scale: 2.75,
            frames: 6,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 30,
                y: 142,
            },
            image: '/assets/fightingGame/character/samuraiMack/Idle.png',
            scale: 2.4,
            frames: 8,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 157,
            },
            image: '/assets/fightingGame/character/kenji/Idle.png',
            scale: 2.4,
            frames: 4,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },
        {
            position: {
                x: 100,
                y: 185,
            },
            offset: {
                x: 30,
                y: 142,
            },
            image: '/assets/fightingGame/character/samuraiMack/Run.png',
            scale: 2.4,
            frames: 8,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },
        {
            position: {
                x: 100,
                y: 185,
            },
            offset: {
                x: 30,
                y: 155,
            },
            image: '/assets/fightingGame/character/kenji/Run.png',
            scale: 2.4,
            frames: 8,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 142,
            },
            image: '/assets/fightingGame/character/samuraiMack/Jump.png',
            scale: 2.4,
            frames: 2,
            framesCurrent: 0,
            framesElapsed: 2,
            framesHold: 15
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 142,
            },
            image: '/assets/fightingGame/character/kenji/Jump.png',
            scale: 2.4,
            frames: 2,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 25
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 142,
            },
            image: '/assets/fightingGame/character/samuraiMack/Fall.png',
            scale: 2.4,
            frames: 2,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 142,
            },
            image: '/assets/fightingGame/character/kenji/Fall.png',
            scale: 2.4,
            frames: 2,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 142,
            },
            image: '/assets/fightingGame/character/samuraiMack/Attack1.png',
            scale: 2.4,
            frames: 6,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 10
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 155,
            },
            image: '/assets/fightingGame/character/kenji/Attack1.png',
            scale: 2.4,
            frames: 4,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 20
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 142,
            },
            image: '/assets/fightingGame/character/samuraiMack/Take hit.png',
            scale: 2.4,
            frames: 4,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 10
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 155,
            },
            image: '/assets/fightingGame/character/kenji/Take hit.png',
            scale: 2.4,
            frames: 3,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 10
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 142,
            },
            image: '/assets/fightingGame/character/samuraiMack/Death.png',
            scale: 2.4,
            frames: 6,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },
        {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 155,
            },
            image: '/assets/fightingGame/character/kenji/Death.png',
            scale: 2.4,
            frames: 7,
            framesCurrent: 0,
            framesElapsed: 0,
            framesHold: 15
        },

    ]);
    const [player] = useState<Fighter>({
        position: {
            x: 100,
            y: 185,
        },
        velocity: {
            x: 0,
            y: 0
        },
        width: 50,
        heigth: 150,
        player: true,
        attackBox: {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: 0,
                y: 50
            },
            width: 200,
            height: 50
        },
        color: 'blue',
        isAttacking: false,
        isHit: false,
        health: 100,
        image: spriteArray[2],
        dead: false,
        sprites: {
            idle: spriteArray[2],
            run: spriteArray[4],
            jump: spriteArray[6],
            fall: spriteArray[8],
            attack1: spriteArray[10],
            takeHit: spriteArray[12],
            death: spriteArray[14]
        }
    });
    const [enemy] = useState<Fighter>({
        position: {
            x: 400,
            y: 100
        },
        velocity: {
            x: 0,
            y: 0
        },
        width: 50,
        heigth: 150,
        player: false,
        attackBox: {
            position: {
                x: 0,
                y: 0,
            },
            offset: {
                x: -100,
                y: 50
            },
            width: 100,
            height: 50
        },
        color: 'red',
        isAttacking: false,
        isHit: false,
        health: 100,
        image: spriteArray[3],
        dead: false,
        sprites: {
            idle: spriteArray[3],
            run: spriteArray[5],
            jump: spriteArray[7],
            fall: spriteArray[9],
            attack1: spriteArray[11],
            takeHit: spriteArray[13],
            death: spriteArray[15]
        }
    });
    const [keys] = useState({
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        w: {
            pressed: false
        },
        ArrowRight: {
            pressed: false
        },
        ArrowLeft: {
            pressed: false
        },
        ArrowUp: {
            pressed: false
        }
    });

    useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);

        if (timer === 0) {
            determineWinner();

        }
    }, [timer]);

    const determineWinner = () => {
        player.health > enemy.health ? setBattleResult("Player 1 Wins!") : setBattleResult("Player 2 Wins!")

        if (player.health === enemy.health) {
            setBattleResult("Tie");
        }
        setTimer(0);
    }

    if (typeof window !== "undefined") {
        const canvas = document.querySelector('canvas');
        const enemyHealth = document.querySelector<HTMLDivElement>('#enemyHealth');
        const playerHealth = document.querySelector<HTMLDivElement>('#playerHealth');
        const c = canvas?.getContext('2d');
        let lastKey: string;
        let enemyLastKey: string;

        useEffect(() => {
            animate()

            document.addEventListener('keydown', (e) => {
                    switch (e.key) {
                        // Player
    
                        case 'd':
                            keys.d.pressed = true;
                            lastKey = 'd';
                            break;
                        case 'a':
                            keys.a.pressed = true;
                            lastKey = 'a';
                            break;
                        case 'w':
                            if (player.position.y >= 0) {
                                player.velocity.y = -20;
                                keys.w.pressed = true;
                                lastKey = 'w';
                            }
                            break;
                        case 's':
                            attack(player)
                            lastKey = 's';
                            break;
    
                        // Enemy
    
                        case 'ArrowRight':
                            keys.ArrowRight.pressed = true;
                            enemyLastKey = 'ArrowRight';
                            break;
                        case 'ArrowLeft':
                            keys.ArrowLeft.pressed = true;
                            enemyLastKey = 'ArrowLeft';
                            break;
                        case 'ArrowUp':
                            if (enemy.position.y >= 0) {
                                enemy.velocity.y = -20;
                                enemyLastKey = 'ArrowUp';
                            }
                            break;
                        case 'ArrowDown':
                            attack(enemy);
                            break;
                        default:
                            break;
                }
            })
            document.addEventListener('keyup', (e) => {
                switch (e.key) {
                    // Player

                    case 'd':
                        keys.d.pressed = false;
                        break;
                    case 'a':
                        keys.a.pressed = false;
                        break;
                    case 'w':
                        keys.w.pressed = false;
                        break;
                    // Enemy

                    case 'ArrowRight':
                        keys.ArrowRight.pressed = false;
                        break;
                    case 'ArrowLeft':
                        keys.ArrowLeft.pressed = false;
                        break;
                    case 'ArrowUp':
                        keys.ArrowUp.pressed = false;
                        break;
                    default:
                        break;
                }
            })
        }, [])
        if (canvas != undefined) {
            canvas.width = 1024
            canvas.height = 576
            c?.fillRect(
                player.position.x, player.position.y,
                canvas?.width, canvas?.height
            );
        }

        const animatedFrames = (asset: Sprite) => {
            let animatedImage = new Image();
            animatedImage.src = asset.image;
            if (c != undefined) {
                c.drawImage(animatedImage,
                    asset.framesCurrent * (animatedImage.width / asset.frames),
                    0,
                    animatedImage.width / asset.frames,
                    animatedImage.height,
                    asset.position.x - asset.offset.x,
                    asset.position.y - asset.offset.y,
                    (animatedImage.width / asset.frames) * asset.scale,
                    animatedImage.height * asset.scale
                );
            }
            asset.framesElapsed++

            if (asset.framesElapsed % asset.framesHold === 0) {

                if (asset.framesCurrent < asset.frames - 1) {
                    asset.framesCurrent++
                } else {
                    asset.framesCurrent = 0;
                }
            }
        }


        const update = (char: Fighter) => {
            if (canvas != undefined) {
                char.image.position.x = char.position.x
                char.image.position.y = char.position.y
                char.position.x += char.velocity.x;
                char.position.y += char.velocity.y;

                char.attackBox.position.x = char.position.x + char.attackBox.offset.x;
                char.attackBox.position.y = char.position.y + char.attackBox.offset.y;
                if (!char.dead) {
                    animatedFrames(char.image);
                }



                if (char.position.y + char.heigth + char.velocity.y >= canvas.height - 95) {
                    char.velocity.y = 0;
                    char.position.y = 332;
                } else {
                    char.velocity.y += gravity;
                }
            }
        }

        const attack = (char: Fighter) => {
            switchSprite(char, 'attack1');
            char.isAttacking = true;
            setTimeout(() => {
                char.isAttacking = false;
                char.sprites.attack1.framesCurrent = 0;
            }, 490);
        }

        const handleHit = (char: Fighter) => {
            switchSprite(char, 'takeHit');
            char.isHit = true;
            char.health -= 20;
            setTimeout(() => {
                char.isHit = false;
                char.sprites.takeHit.framesCurrent = 0;
            }, 490);
        }

        const rectangularColision = (rectangle1: Fighter, rectangle2: Fighter) => {
            return (
                rectangle1.attackBox.position.x + rectangle1.attackBox.width
                >= rectangle2.position.x
                &&
                rectangle1.attackBox.position.x <=
                rectangle2.position.x + rectangle2.width
                &&
                rectangle1.attackBox.position.y + rectangle1.attackBox.height
                >= rectangle2.position.y
                &&
                rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.heigth
            )
        }

        const switchSprite = (char: Fighter, sprite: string) => {
            // overriding all other animations with the death animation
            if (char.image === char.sprites.death) {
                if (char.image.framesCurrent === char.image.frames - 1) {
                    char.dead = true;
                    return
                }
            }

            // overriding all other animations with the attack animation
            if (char.image === char.sprites.attack1 && char.isAttacking) return

            //overriding all other animations with the take hit animation
            if (char.image === char.sprites.takeHit && char.image.framesCurrent < char.image.frames - 1) return

            // if (char.image === char.sprites.death && char.health <= 0) return

            switch (sprite) {
                case 'jump':
                    char.image = char.sprites.jump;
                    break;
                case 'fall':
                    char.image = char.sprites.fall;
                    break;
                case 'run':
                    char.image = char.sprites.run;
                    break;
                case 'attack1':
                    char.image = char.sprites.attack1;
                    break;
                case 'takeHit':
                    char.image = char.sprites.takeHit;
                    break;
                case 'death':
                    char.image = char.sprites.death;
                    break;
                default:
                    char.image = char.sprites.idle;
                    break;
            }
        }

        const animate = () => {
            if (canvas != undefined && c != undefined) {
                window.requestAnimationFrame(animate);
                c.fillRect(0, 0, canvas.width, canvas.height);
                animatedFrames(spriteArray[0]);
                animatedFrames(spriteArray[1]);
                c.fillStyle = 'rgba(255, 255, 255, 0.15)';
                c.fillRect(0, 0, canvas.width, canvas.height);
                update(player);
                update(enemy);

                player.velocity.x = 0;
                enemy.velocity.x = 0;


                //Player movement

                if (keys.a.pressed && lastKey === 'a') {
                    player.velocity.x = -5;
                    switchSprite(player, 'run');
                } else if (keys.d.pressed && lastKey === 'd') {
                    player.velocity.x = 5;
                    switchSprite(player, 'run');
                } else {
                    switchSprite(player, 'idle');
                }

                if (player.velocity.y < 0) {
                    switchSprite(player, 'jump');
                } else if (player.velocity.y > 0) {
                    switchSprite(player, 'fall');
                }

                // Enemy movement

                if (keys.ArrowLeft.pressed && enemyLastKey === 'ArrowLeft') {
                    enemy.velocity.x = -5;
                    switchSprite(enemy, 'run');
                } else if (keys.ArrowRight.pressed && enemyLastKey === 'ArrowRight') {
                    enemy.velocity.x = 5;
                    switchSprite(enemy, 'run');
                } else {
                    switchSprite(enemy, 'idle');
                }

                if (enemy.velocity.y < 0) {
                    switchSprite(enemy, 'jump')
                } else if (enemy.velocity.y > 0) {
                    switchSprite(enemy, 'fall');
                }

                // Detect for colision
                if (player.isAttacking &&
                    rectangularColision(player, enemy) &&
                    player.image.framesCurrent === 5
                ) {
                    handleHit(enemy);
                    player.isAttacking = false;
                    enemyHealth!.style.width = enemy.health + '%';
                }

                if (enemy.isAttacking &&
                    rectangularColision(enemy, player) &&
                    enemy.image.framesCurrent === 2
                ) {
                    handleHit(player);
                    enemy.isAttacking = false;
                    playerHealth!.style.width = player.health + '%';
                }

                // end a game base on health
                if (enemy.health <= 0) {
                    switchSprite(enemy, 'death');
                    determineWinner();
                } else if (player.health <= 0) {
                    switchSprite(player, 'death');
                    determineWinner();
                }
            }
        }
    }

    return (
        <div className='relative mb-4 inline-block'>
            <div className='absolute flex w-full items-center p-8'>
                {/* player health */}
                <div className='relative h-8 w-full flex justify-end'>
                    <div className='bg-red-500 border-2 border-white b-r-0 h-8 w-full'></div>
                    <div id="playerHealth" className='absolute border-2 b-r-0 border-white bg-indigo-400 w-full top-0 bottom-0 right-0 transition-[width] duration-1000'></div>
                </div>
                {/* timer */}
                <div className='bg-black font-game text-white border-2 border-white h-10 w-24 shrink-0 flex items-center justify-center'>
                    {timer}
                </div>
                {/* enemy health */}
                <div className='relative h-8 w-full'>
                    <div className='bg-red-500 border-2 border-white b-l-0 h-8'></div>
                    <div id="enemyHealth" className='absolute border-2 b-l-0 border-white bg-indigo-400 w-full top-0 bottom-0 left-0 right-0 transition-[width] duration-1000'></div>
                </div>
            </div>
            <div className='absolute font-game text-white flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0'>
                {battleResult}
                {battleResult !== '' && <a className='underline' href='/fight'>Start Again</a>}
            </div>
            <canvas />
        </div>
    )
}
export default GameComponent;
