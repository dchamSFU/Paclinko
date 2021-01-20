var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var circles = [];
var pegs = [];
var ground;
var leftwall;
var rightwall;
var cups = [];
var points = 0;
var mySound;
var pointget;
//var music;
var muted = false;

function mute() {
    console.log('mute pressed');
    if (muted == false) {
        muted = true;
        //music.pause(); 
    }
    else if (muted == true) {
        muted = false;
        //music.loop(0, 1, 0.6);
    }
}

//document.body.style.zoom = 0.8; Force zoom
function preload() {
    soundFormats('wav');
    mySound = loadSound('sounds/coin-2');
    pointget = loadSound('sounds/collect-5');

    //Decide which music tract to load
    //var num = Math.floor(Math.random() * 5) + 1;
    //music = loadSound('sounds/' + num);

}

function setup() {
    createCanvas(715, 900);
    engine = Engine.create();
    Matter.Events.on(engine, 'collisionStart', function (event) {
        /*if ((event.pairs[0].bodyB.label == 'Ball' && event.pairs[0].bodyA.label == 'ground')) {
            console.log('ball touch ground');
            //event.pairs[0].bodyB.remove();
            event.pairs[0].bodyB.render.visible = false;
            Matter.Composite.remove(world, event.pairs[0].bodyB);
        }*/
        for (var amounts = 0; amounts < event.pairs.length; amounts++)
            if ((event.pairs[amounts].bodyB.label == 'Ball' && event.pairs[amounts].bodyA.label == 'base')) {
                console.log('ball touch cup');
                if (muted == false) {
                    pointget.play();
                }
                //event.pairs[0].bodyB.remove();
                event.pairs[amounts].bodyB.render.visible = false;
                Matter.Composite.remove(world, event.pairs[amounts].bodyB);
                points += 1;
                document.getElementById('scoreboard').innerHTML = "Points: " + points;
            }
            else if ((event.pairs[amounts].bodyB.label == 'Ball' && event.pairs[amounts].bodyA.label == 'peg') && muted == false) {
                mySound.play(0, 1, 0.2);
            }
        amounts = 0;

    });
    //music.loop(0, 1, 0.4);
    world = engine.world;
    Engine.run(engine);


    var options = {
        isStatic: true,
    }

    //Setup Walls
    leftwall = Bodies.rectangle(0, height/2, 10, height, options);
    World.add(world, leftwall);

    rightwall = Bodies.rectangle(715, height / 2, 10, height, options);
    World.add(world, rightwall);

    //Set Up The Cups
    //Cup 1
    cups.push(new Cups(80, 840, 40, 10));
    cups.push(new CupsWalls(55, 825, 10, 40));
    cups.push(new CupsWalls(105, 825, 10, 40));

    //Cup2
    cups.push(new Cups(280, 840, 40, 10));
    cups.push(new CupsWalls(255, 825, 10, 40));
    cups.push(new CupsWalls(305, 825, 10, 40));

    //Cup3
    cups.push(new Cups(480, 840, 40, 10));
    cups.push(new CupsWalls(455, 825, 10, 40));
    cups.push(new CupsWalls(505, 825, 10, 40));

    //Cup4
    cups.push(new Cups(650, 840, 40, 10));
    cups.push(new CupsWalls(625, 825, 10, 40));
    cups.push(new CupsWalls(675, 825, 10, 40));

    //This is to place the pachinko pegs
    var initialpeg = 114;
    var vgap = 114 * 0.8;
    var horizontalgap = 32 * 2.5;
    var pegsize = 13;


    for (rows = 0; rows < 7; rows++) {
        for (coloumns = 0; coloumns < 9; coloumns++) {
            pegs.push(new Pegs(32 + (horizontalgap * coloumns), initialpeg + (vgap * rows), pegsize));
        }
    }
    for (rows2 = 0; rows2 < 7; rows2++) {
        for (coloumns2 = 0; coloumns2 < 8; coloumns2++) {
            pegs.push(new Pegs(72 + (horizontalgap * coloumns2), initialpeg + 45.6 + (vgap * rows2), pegsize));
        }
    }
}

function mouseClicked() {
    console.log(mouseX, mouseY);
    if (mouseY < 0 || mouseY > 95) {
        return;
    }
    circles.push(new Circle(mouseX, mouseY, 7));
    //boxes.push(new Box(mouseX, mouseY, 50, 50));
}

function draw() {
    background(255, 131, 64);
    for (var i = 0; i < circles.length; i++) {
        circles[i].show();
        if (circles[i].body.render.visible == false || circles[i].body.position.y > 900){
            Matter.Composite.remove(world, circles[i]);
            circles.splice(i, 1);
            i--;
            console.log('removed ball');
        }
    }

    for (var j = 0; j < pegs.length; j++) {
        pegs[j].show();
    }

    for (var z = 0; z < cups.length; z++) {
        cups[z].show();
    }

    //Code for the Floor + Walls
    noStroke(255);
    fill(170);
    rectMode(CENTER);
    //rect(ground.position.x, ground.position.y, width, 50);
    rect(leftwall.position.x, leftwall.position.y, 10, height);
    rect(rightwall.position.x, rightwall.position.y, 10, height);

    //Code for walls
    noStroke(255);
    fill(170);
    rectMode(CENTER);


    //Code for the drop line
    noStroke();
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(width/2, 95, width, 2);


    /*
     * Code for the boxes
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }

    noStroke(255);
    fill(170);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 50);

    */
    //box1.show();
}
/*
function start() {
    setup();
    draw();


    /*
    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
    */