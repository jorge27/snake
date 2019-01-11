var snake = new Array();
var desplazamiento = 10;
var velocidad = { x : -1 , y : 0, v : 200};
var time = null;
var target = {x : 0, y : 0};

document.body.addEventListener('load', inicializate());
document.body.addEventListener('keydown', function(e){	gamePad(e); });

function inicializate(){

	snake.push({ x : 400, y : 300 });
	snake.push({ x : 410, y : 300 });
	snake.push({ x : 420, y : 300 });
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
	if ((event.keyCode == 38) && (snake[0].y != (snake[1].y + desplazamiento)) ) {
		velocidad.y = 1;
		velocidad.x = 0;
	}

	// SI presionaste flecha abajo
	if (event.keyCode == 40 && (snake[0].y != (snake[1].y - desplazamiento))) {
		velocidad.y = -1;
		velocidad.x = 0;
	}

	// Si presionaste flecha izquierda
	if (event.keyCode == 37 && (snake[0].x != (snake[1].x + desplazamiento))) {
		velocidad.y = 0;
		velocidad.x = -1;
	}

	// Si presionaste flecha derecha
	if (event.keyCode == 39 && (snake[0].x != (snake[1].x - desplazamiento))) {
		velocidad.y = 0;
		velocidad.x = 1;
	}
}

function run(){
	checkColision();

	var canvas = document.getElementById('lienzo');
	var clean = canvas.getContext("2d");

	clean.clearRect(0,0,800,600);

	var _target = canvas.getContext("2d");
	_target.fillStyle = "#660011";
	_target.fillRect(target.x, target.y, 10, 10);

	var rect = new Array();
	rect.push(canvas.getContext("2d"));
	rect[0].fillStyle = "#FF0000";
	rect[0].fillRect(snake[0].x,snake[0].y, 10, 10);

	for (var i = 1; i < snake.length; i++) {
		rect.push(canvas.getContext("2d"));
		rect[i].fillStyle = "#000000";
		rect[i].fillRect(snake[i].x,snake[i].y, 10, 10);
	}

	for (var i = snake.length - 1; i > 0; i--) {
		snake[i].x = snake[i-1].x;
		snake[i].y = snake[i-1].y;
	}

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

	if ((snake[0].x == target.x) && (snake[0].y == target.y)) {
		snake.push({ x : snake[snake.length - 1].x, y : snake[snake.length - 1].y });

		makeTarget();

		velocidad.v -= 10;

		clearInterval(time);

		time = setInterval(run,velocidad.v);
	}

	for (var i = 1; i < snake.length; i++) {
		if ((snake[0].x == snake[i].x) && (snake[0].y == snake[i].y)) {
			clearInterval(time);
			alert('Game Over');
			break;
		}
	}
}

