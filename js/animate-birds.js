const canvas = document.getElementById('flockCanvas');
const ctx = canvas.getContext('2d');

// Circle class representing a bird
class Bird {
	constructor(x, y, radius, color, commonAngle) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = 60 * Math.random();
		this.speed = 6 + Math.random(); // Will need to change for bird type
		this.angle = commonAngle; // Use the common angle for all birds
	}

	move() {
		// Update position based on speed and angle
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * Math.sin(this.angle);

		// // Wrap around the canvas if the bird goes out of bounds
		// if (this.x < 0) this.x = canvas.width;
		// if (this.x > canvas.width) this.x = 0;
		// if (this.y < 0) this.y = canvas.height;
		// if (this.y > canvas.height) this.y = 0;
	}

	draw() {
		// Draw the bird as a circle
		ctx.beginPath();
		// ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.ellipse(this.x, this.y, this.radius, this.radius * 3.5, Math.PI / 2, 0, 2 * Math.PI);
		ctx.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color +")";
		ctx.fill();
		ctx.closePath();
	}
}

// Create an array of circles (birds) with a common initial angle
const flock = [];
const numberOfBirds = 50;
const commonAngle = 0;


for (let i = 0; i < numberOfBirds; i++) {
	const bird = new Bird(
		(Math.random() * canvas.width) - canvas.width, // Start off screen
		(Math.random() * canvas.height * 0.8) + (canvas.height * 0.1), // Add vertical margins
		5 + Math.random() * 10, // Random radius between 5 and 15
		'black',
		commonAngle
	);
	flock.push(bird);
}

function animate() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.canvas.width  = window.innerWidth * 0.95;
	// ctx.canvas.height = window.innerHeight * 0.5;

	// Move and draw each bird
	flock.forEach(bird => {
		bird.move();
		bird.draw();
	});

	// Repeat the animation
	requestAnimationFrame(animate);
}

// Start the animation
animate();