// Fireworks and Birds
// Irtisam Islam
// June 6th, 2020
//
// Extra for Experts:
// Gravitational constant used in fireworks

// arrays that are used to store the individual fireworks and birds
let firework = [];
let birdArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Sets an intervel for the makeBirds() function to run every 2 seconds.
  window.setInterval(makeBirds, 2000);
}

// Makes background, calls other functions
function draw() {
  background(0, 0, 32);
  showFirework();
  showBird();
  colliding();
}

// Sets up the properties of all fireworks
class Fireworks {

  // Defines variables needed to create firework such as location, size, color and gravitational constant
  constructor(x, y, radius, dx, dy, r, g, b, a, grav) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.grav = grav;

  }

  // Creates firework based on constructor variables
  show() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.radius * 2);
    this.a -= 1.0;
  }

  // Sets up basic movement of firework
  move() {
    this.x += this.dx;
    this.y += this.dy;
    this.dy += this.grav;
  }

  // returns a true statement when the alpha of the firework reaches 0, used in another function when determining whether it should be removed
  // from the array or not.
  remove() {
    return this.a === 0;
  }
}


// Sets up properties of all birds.
class Birds {
  
  // Defines variables needed to create birds such as location, speed, size, and color
  constructor(y) {
    this.y = y;
    this.x = 0;
    this.dx = 4;
    this.length = 20;
    this.width = 10;
    this.color = color(255, 255, 255);
  }

  // Creates bird based on constructor variables.
  show() {
    fill(this.color);
    rect(this.x, this.y, this.length, this.width);
  }

  // Moves the bird using constructor variables.
  move() {
    this.x += this.dx;
  }

  // Returns true statment when the entire bird is off screen, later used in a different function whether it should be removed from array or not.
  isAlive() {
    return this.x < -10 || this.x > width + 10;
  }

  // Detects collosion with fireworks and determines whether some properties should change or not (size and direction).
  collision(Fireworks) {
    let hit = collideRectCircle(this.x, this.y, this.length, this.width, Fireworks.x, Fireworks.y, Fireworks.radius);

    if (hit) {
      this.color = color(230, 0, 0);
      this.dx *= -1;
    }
  }
}

// This function incorporates the Fireworks class to create the actual firework effect
function makeFirework() {
  
  // variables with random outcomes that affect the visual arguments of the Fireworks class constructor (r, g, b, radius) 
  let size = random(2, 3);
  let color1 = random(0, 255);
  let color2 = random(0, 255);
  let color3 = random(0, 255);

  // Creates 100 fireworks that shoot in all directions and pushes it to the firework array.
  for (let i = 0; i < 100; i++) {
    let speed = random(0, 8);
    let vertical = sin(i * 4) * speed;
    let horizontal = cos(i * 4) * speed;


    horizontal += random(-0.9, 0.9);
    vertical += random(-0.9, 0.9);

    let newFirework = new Fireworks(mouseX, mouseY, size, horizontal, vertical, color1, color2, color3, 255, 0.04);
    firework.push(newFirework);
  }
}

// removes firework from array if the statement returned from the remove() function inside the Fireworks class is true, otherwise displays the element in the array
function showFirework() {
  for (let i = 0; i < firework.length; i++) {
    if (firework[i].remove()) {
      firework.splice(i, 1);
    } else {
      firework[i].show();
      firework[i].move();
    }
  }
}

// Calls makeFirework function when mouse is clicked.
function mousePressed() {
  makeFirework();
}

// Creates a bird at a random elevation and pushes it to the array.
function makeBirds() {
  let bird = new Birds(random(10, height - 10));
  birdArray.push(bird);
}

// If the statement from the isAlive function inside of the Birds class is true, removes the bird from the array, otherwise displays that element in the array.
function showBird() {
  for (let i = 0; i < birdArray.length; i++) {
    if (birdArray[i].isAlive()) {
      birdArray.splice(i, 1);
    }

    else {
      birdArray[i].show();
      birdArray[i].move();
    }
  }
}

// Checks collision for every firework particle and bird that are present in their respective arrays.
function colliding() {
  for (let i = 0; i < birdArray.length; i++) {
    for (let j = 0; j < firework.length; j++) {
      birdArray[i].collision(firework[j]);
    }
  }
}