function Box(x, y, w, h) {
    var options = {
        restitution: 0.2
    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();

        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, this.w, this.h);

        pop();
    }
}

function Circle(x, y, r) {
    var options = {
        restitution: 0.5
    }

    this.body = Bodies.circle(x, y, r, options);
    this.body.label = 'Ball';
    this.removepls = 0;
    this.r = r*2;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();

        translate(pos.x, pos.y);
        rotate(angle);
        //rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        circle(0, 0, this.r);
        //rect(0, 0, this.w, this.h);

        pop();
    }
}

function Pegs(x, y, r) {
    var options = {
        restitution: 0.5,
        isStatic: true
    }

    this.body = Bodies.circle(x, y, r, options);
    this.body.label = 'peg';
    this.r = r * 2;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();

        translate(pos.x, pos.y);
        rotate(angle);
        //rectMode(CENTER);
        strokeWeight(1);
        stroke(0, 38, 153);
        fill(64, 188, 255);
        circle(0, 0, this.r);
        //rect(0, 0, this.w, this.h);

        pop();
    }
}

function Cups(x, y, w, h) {
    var options = {
        isStatic: true,
        label: 'base'
    }
    rectMode(CENTER);
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(0, 38, 153);
        fill(64, 12, 53);
        rect(0, 0, this.w, this.h);
        //rect(0, 0, this.w, this.h);

        pop();
    }
}

function CupsWalls(x, y, w, h) {
    var options = {
        isStatic: true,
    }
    rectMode(CENTER);
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(0, 38, 153);
        fill(64, 12, 53);
        rect(0, 0, this.w, this.h);
        //rect(0, 0, this.w, this.h);

        pop();
    }
}