'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var btn = document.querySelector('.btn'),
    banner = document.querySelector('.banner_wammy'),
    wall = document.querySelector('.banner_wall'),
    speed = 150,
    snakeLength = 3,
    snakeColor = "green";

btn.addEventListener("click", function () {
	// start/stop game

	var _field = document.querySelector('.field');

	if (!document.querySelectorAll('.field>*').length) {
		var i, j;
		var cell;
		var fieldMatrix;
		var snakeItem;
		var snakeFood;

		(function () {
			// she`s alive!!!!

			var aliveAll = function aliveAll() {
				fieldMatrix.screenReload();
				snakeItem.draw(); //paint snake
				snakeFood.draw_food(); //paint food

				if (snakeFood.positionFood() == snakeItem.headPosition()) {
					snakeItem.eat_now();
					snakeFood.repositionFood();
				}
			};

			//

			var bannerWatch = function bannerWatch(bannerSelf, addClass, animationTime) {
				// banners watch function :)
				bannerSelf.classList.add(addClass);
				setTimeout(function () {
					bannerSelf.classList.remove(addClass);
				}, animationTime);
			};
			//

			btn.innerText = "Stop Game";
			for (i = 0, j = 400; i < j; i++) {
				// create field cells
				cell = document.createElement('div');

				cell.className = "cell";
				_field.appendChild(cell);
			}
			var cells = document.querySelectorAll('.cell');

			var Field = function () {
				function Field() {
					_classCallCheck(this, Field);
				}

				Field.prototype.screenReload = function screenReload() {
					for (var _j = 0; _j < cells.length; _j++) {
						cells[_j].style.background = "";
					}
				};

				return Field;
			}();

			var Snake = function () {
				function Snake(cellFirst, color, lengthSnake, direction) {
					_classCallCheck(this, Snake);

					this.cellFirst = cellFirst;
					this.color = color;
					this.lengthSnake = lengthSnake;
					this.direction = direction;
					this.arr = [];
				}

				Snake.prototype.createSnake = function createSnake() {
					for (var _i = 0; _i < this.lengthSnake; _i++) {
						var pos = this.cellFirst - _i;
						this.arr.push(pos);
					}
				};

				Snake.prototype.snakeArrZero = function snakeArrZero() {
					this.arr = [];
					btn.innerText = "Try Again?";
					return;
				};

				Snake.prototype.draw = function draw() {

					var head = this.arr[0];
					this.arr.splice(this.arr.length - 1, 1);
					this.arr.splice(0, 0, head += this.direction);

					if (this.arr[0] > 400 && this.direction == 20) {
						console.log(23);
						bannerWatch(wall, "wall_anim", 2000);
						this.snakeArrZero();
					}
					if (this.arr[0] < 0 && this.direction == -20) {
						console.log(34);
						bannerWatch(wall, "wall_anim", 2000);
						this.snakeArrZero();
					}

					for (var _i2 = 0; _i2 < this.arr.length; _i2++) {
						cells[this.arr[_i2]].style.background = this.color;
					}
				};

				Snake.prototype.headPosition = function headPosition() {
					return this.arr[0];
				};

				Snake.prototype.keyValue = function keyValue() {
					var _this = this;

					document.addEventListener("keydown", function (e) {
						if (e.keyCode == 38 || e.keyCode == 87) {
							//top
							_this.direction = -20;
						} else if (e.keyCode == 39 || e.keyCode == 68) {
							//right
							_this.direction = 1;
						} else if (e.keyCode == 40 || e.keyCode == 83) {
							//down
							_this.direction = 20;
						} else if (e.keyCode == 37 || e.keyCode == 65) {
							//left
							_this.direction = -1;
						}
					});
				};

				Snake.prototype.eat_now = function eat_now() {
					this.arr.length++;
					bannerWatch(banner, "banner_animation", 1000);
				};

				return Snake;
			}();

			var Food = function () {
				function Food() {
					_classCallCheck(this, Food);

					this.position = Math.floor(Math.random() * 400);
					this.color = 'hsl(' + Math.floor(Math.random() * 365) + ', 100%, 50%)';
				}

				Food.prototype.draw_food = function draw_food() {
					cells[this.position].style.background = this.color;
				};

				Food.prototype.repositionFood = function repositionFood() {
					this.position = Math.floor(Math.random() * 400);
					this.color = 'hsl(' + Math.floor(Math.random() * 365) + ', 100%, 50%)';
				};

				Food.prototype.positionFood = function positionFood() {
					return this.position;
				};

				return Food;
			}();

			fieldMatrix = new Field();
			snakeItem = new Snake(150, snakeColor, snakeLength, 1);
			snakeFood = new Food();

			snakeItem.keyValue(); // snake control
			snakeItem.createSnake();setInterval(aliveAll, speed); // this start draw game
		})();
	} else {
			var cells = document.querySelectorAll('.cell');
			btn.innerText = "Start Game";

			for (var i = 0; i < cells.length; i++) {
				_field.removeChild(cells[i]);
			}
		}
});