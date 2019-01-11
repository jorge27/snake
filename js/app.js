var snake = new Array();
var desplazamiento = 10;
var velocidad = { x : 1 , y : 0, v : 1000};
var time = null;
var target = {x : 0, y : 0};

document.body.addEventListener('load', inicializate());
document.body.addEventListener('keydown', function(e){	gamePad(e); });

function inicializate(){

	snake.push({ x : 700, y : 300 });
	time = setInterval(run, velocidad.v);

	makeTarget();
}

function makeTarget(){
	target.x = Math.floor((Math.random()* 80) + 1)*10;
	target.y = Math.floor((Math.random()* 60) + 1)*10;
	
	console.log(target)	
}

function gamePad(event){
	//Si presionaste flecha arriba
	if (event.keyCode == 38) {
		velocidad.y = 1;
		velocidad.x = 0;
	}

	// SI presionaste flecha abajo
	if (event.keyCode == 40) {
		velocidad.y = -1;
		velocidad.x = 0;
	}

	// Si presionaste flecha izquierda
	if (event.keyCode == 37) {
		velocidad.y = 0;
		velocidad.x = -1;
	}

	// Si presionaste flecha derecha
	if (event.keyCode == 39) {
		velocidad.y = 0;
		velocidad.x = 1;
	}
}

function run(){
	console.log('running..')
	var canvas = document.getElementById('lienzo');
	var clean = canvas.getContext("2d");

	clean.clearRect(0,0,800,600);

	// Si se mueve hacia arriba
	if (velocidad.y == 1) {
		snake[0].y -= desplazamiento;
	}
	// Si se mueve hacia abajo
	if (velocidad.y == -1) {
		snake[0].y += desplazamiento;
	}
	// Si se mueve hacia izquierda
	if (velocidad.x == -1) {
		snake[0].x -= desplazamiento;
	}
	// Si se mueve hacia derecha
	if (velocidad.x == 1) {
		snake[0].x += desplazamiento;
	}

	var _target = canvas.getContext("2d");
	_target.fillStyle = "#660011";
	_target.fillRect(target.x, target.y, 10, 10);

	var rect = canvas.getContext("2d");
	rect.fillStyle = "#000000";
	rect.fillRect(snake[0].x,snake[0].y, 10, 10);

	checkColision();
}

function checkColision(){

	if (snake[0].x > 790 || snake[0].x < 0) {
		clearInterval(time);
		alert('Game Over');
	}
	if (snake[0].y < 0 || snake[0].y > 590) {
		clearInterval(time);	
		alert('Game Over');
	}
}

