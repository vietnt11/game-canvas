let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

canvas.height = 710;
canvas.width = 530;

const sprites = new Image();
sprites.src = './img/sprites.png';

let game = 'start';
let frame = 0;

//Screen
const start = {
    draw: function() {
        ctx.beginPath();
        ctx.drawImage(sprites, 1012, 0, 228, 61, canvas.width/2 - 114, 50, 228, 61)
        ctx.drawImage(sprites, 1012, 62, 236, 64, canvas.width/2- 118, 200, 236, 64)
        ctx.drawImage(sprites, 855, 157, 140, 126, canvas.width/2- 70, 350, 140, 126)
    }
}

const end = {
    draw: function() {
        ctx.beginPath();
        ctx.drawImage(sprites, 1012, 126, 246, 54, canvas.width/2 - 123, 200, 246, 54)
        ctx.drawImage(sprites, 624, 432, 290, 145, canvas.width/2 - 145, 350, 290, 145)
        ctx.drawImage(sprites, 624, 578, 83, 46, canvas.width/2 - 41.5, 500, 83, 46)
    }
}

// Background
const bg = {
    sX: 163,
    sY: 0,
    sW: 229,
    sH: 625,
    cX: 0,
    cY: 0,
    cW: 229,
    cH: 625,
    draw: function () {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 229, this.cY, this.cW, this.cH)
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 458, this.cY, this.cW, this.cH)
    }
}

class Ground {
    constructor(cX, cY) {
        this.cX = cX;
        this.cY = cY;
        this.sX = 624, 
        this.sY = 0;
        this.sW = 215;
        this.sH = 143;
        this.cW = 215;
        this.cH = 143;
        this.dx = -2;
    }
    draw() {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
    }
}

let arrGround = [];

for(let i = 0; i < 4; i++) {
    let ground = new Ground(215 * i, 625)
    arrGround.push(ground);
}

function drawArrGround() {
    arrGround.forEach(ground => ground.draw())
}

function updateArrGround() {
    arrGround.forEach(ground => {
        ground.cX += ground.dx;
    })

    if(arrGround[0].cX <= -336) {
        arrGround.splice(0,1);
        let ground = new Ground(arrGround[2].cX + 215, 625);
        arrGround.push(ground);
    }
}

// Random
function random(min, max) {
    return Math.ceil(Math.random() * (max-min) + min);
}

class Pipes {
    constructor(cX, cY, space) {
        this.cX = cX;
        this.cY = cY;
        this.cW = 82;
        this.cH = 710;
        this.space = space;
        this.sXt = 0;
        this.sYt = 0;
        this.sXb = 1261;
        this.sYb = 0;
        this.sW = 82;
        this.sH = 710;
        this.dx = -2;
    }
    draw() {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sXt, this.sYt, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        ctx.drawImage(sprites, this.sXb, this.sYb, this.sW, this.sH, this.cX, this.cY + this.cH + this.space, this.cW, this.cH);
    }
}

let arrPipes = [];

for(let i = 1; i < 4; i++) {
    let pipe = new Pipes(random(530, 600) * i, random(-660, -300), 200)
    arrPipes.push(pipe);
}

function drawArrPipe() {
    arrPipes.forEach(pipe => pipe.draw())
}

function updateArrPipe() {
    arrPipes.forEach(pipe => {
        pipe.cX += pipe.dx;
    })

    if(arrPipes[0].cX <= -82) {
        arrPipes.splice(0,1);
        let pipe = new Pipes(arrPipes[arrPipes.length - 1].cX + random(400, 500), random(-660, -300), random(200, 150));
        arrPipes.push(pipe);
    }
}

//Number
const arrNumber = [
    {name: 0, sX: 1013, sY: 181,sW: 52,sH: 80,cW: 52,cH: 80},
    {name: 1, sX: 1080, sY: 181,sW: 32,sH: 80,cW: 32,cH: 80},
    {name: 2, sX: 1127, sY: 181,sW: 52,sH: 79,cW: 52,cH: 79},
    {name: 3, sX: 1184, sY: 181,sW: 52,sH: 79,cW: 52,cH: 79},
    {name: 4, sX: 1013, sY: 265,sW: 52,sH: 79,cW: 52,cH: 79},
    {name: 5, sX: 1070, sY: 265,sW: 52,sH: 79,cW: 52,cH: 79},
    {name: 6, sX: 1127, sY: 265,sW: 52,sH: 79,cW: 52,cH: 79},
    {name: 7, sX: 1184, sY: 265,sW: 52,sH: 79,cW: 52,cH: 79},
    {name: 8, sX: 1013, sY: 349,sW: 52,sH: 79,cW: 52,cH: 79},
    {name: 9, sX: 1070, sY: 349,sW: 52,sH: 79,cW: 52,cH: 79}
]

class Score {
    constructor(value, cX, cY) {
        this.value = value;
        this.cX = cX;
        this.cY = cY;
    }
    draw() {
        ctx.beginPath();
        if (this.value >= 10 ){
            this.split = (this.value.toString()).split('');
            arrNumber.forEach(number => {
                if(this.split[0] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width/2 - 52, 60, number.cW, number.cH);
                }
                if(this.split[1] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width/2 + 2, 60, number.cW, number.cH);
                }
            })
        }
        else {
            this.split = this.value.toString();
            arrNumber.forEach(number => {
                if(this.split[0] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width/2 - 26, 60, number.cW, number.cH);
                }
            })
        }
    }
}

let score = new Score(0, 340, 391);

// class Bird
class Bird {
    constructor(cX, cY) {
        this.cX = cX;
        this.cY = cY;
        this.animate = [
            {sX: 840, sY: 0},
            {sX: 900, sY: 0},
            {sX: 960, sY: 0}
        ]
        this.sW = 51;
        this.sH = 36;
        this.cW = 51;
        this.cH = 36;
        this.i = 0;
        this.v = 0;
        this.a = 0.5;
    }

    draw() {
        ctx.beginPath();
        if(game == 'start') {
            if(frame % 35 == 0) {
                this.i++;
                if(this.i > 2) {
                    this.i = 0
                }
            }
        }
        if(game == 'play') {
            if(frame % 16 == 0) {
                this.i++;
                if(this.i > 2) {
                    this.i = 0
                }
            }
        }

        ctx.drawImage(sprites, this.animate[this.i].sX, this.animate[this.i].sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
    }

    update() {
        if(game == 'play' || game == 'end') {
            this.v += this.a;
            this.cY += this.v;

            // Kiểm tra va chạm với nền đất
            if(this.cY + this.cH + this.v >= 625) {
                game = 'end';
                this.v = 0;
                this.cY = 625;
            }

            // Kiểm tra va chạm với đường ống
            if(
                bird.cX + bird.cW > arrPipes[0].cX &&
                bird.cX < arrPipes[0].cX + arrPipes[0].cW &&
                (
                    bird.cY < arrPipes[0].cY + arrPipes[0].cH || 
                    bird.cY + bird.cH > arrPipes[0].cY + arrPipes[0].cH + arrPipes[0].space
                ) 
            ) {
                game = 'end';
            }

            // Trường hợp ăn điểm
            if(bird.cX == arrPipes[0].cX + 82 || bird.cX == arrPipes[0].cX + 81) {
                score.value++;
            }
        }
    }
}

let bird = new Bird(150, canvas.height / 2 - 12);

canvas.addEventListener('click', function() {
    switch(game) {
        case 'start' :
            game = 'play';
            break
        case 'play' :
            console.log('Chơi game');
            bird.v = -8;
            break
        case 'end' :
            console.log('End game');
            break
    }
})

function draw() {
    bg.draw();
    if(game == 'start') {
        start.draw();
    }
    drawArrPipe();
    drawArrGround();
    if(game == 'play') {
        score.draw();
    }
    bird.draw();
    if(game == 'end') {
        end.draw();
    }
}

function update() {
    if( game == 'play') {
        updateArrPipe();
        updateArrGround();
    }
    bird.update();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    draw();
    update();
}

animate();

