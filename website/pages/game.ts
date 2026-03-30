import { send } from "clientUtilities";
import { getRandomInt } from "funcs";
import { Vehicle } from "types";

var laneXs = [-167, 0, 167];
var score = 0;
var speed = 7;
var trucks: Vehicle[] = [];

var flexDiv = document.querySelector<HTMLDivElement>("#flexDiv")!;
var linesDiv = document.querySelector<HTMLDivElement>("#linesDiv")!;
var carImg = document.querySelector<HTMLImageElement>("#carImg")!;
var scoreDiv = document.querySelector<HTMLDivElement>("#scoreDiv")!;
var gameOverDiv = document.querySelector<HTMLDivElement>("#gameOverDiv")!;
var nameInput = document.querySelector<HTMLInputElement>("#nameInput")!;
var submitButton = document.querySelector<HTMLButtonElement>("#submitButton")!;



var car: Vehicle = { img: carImg, lane: 1, y: 600 };

function createTruck() {
  var truckImg = document.createElement("img");
  truckImg.className = "truckImg";
  truckImg.src = "/website/images/truck.png";
  flexDiv.append(truckImg);

  trucks.push({ img: truckImg, lane: getRandomInt(3), y: -200 });
}

function moveVehicle(v: Vehicle) {
  v.img.style.transform = `translate(${laneXs[v.lane]}px, ${v.y}px)`;
}

function moveTrucks() {
  for (var truck of trucks) {
    truck.y += speed;

    moveVehicle(truck);
  }
}

function isColliding() {
  for (var truck of trucks) {
    if (car.lane == truck.lane && car.y >= truck.y - 50 && car.y <= truck.y + 150) {
      return true;
    }
  }

  return false;
}

createTruck();

var intervalId = setInterval(function () {
  if (trucks[trucks.length - 1].y > 400) {
    createTruck();
  }

  moveTrucks();

  if (isColliding()) {
    clearInterval(intervalId);
    linesDiv.style.animationPlayState = "paused";
    gameOverDiv.style.visibility = "visible";
    document.onkeydown = null;
  }

  score += 10;
  scoreDiv.innerText = `Score: ${score}`;
  speed = 5 + score / 2000;

}, 1000 / 100);

document.onkeydown = function (event: KeyboardEvent) {
  if (event.key == "ArrowLeft" && car.lane >= 1) {
    car.lane--;
  }
  else if (event.key == "ArrowRight" && car.lane <= 1) {
    car.lane++;
  }

  moveVehicle(car);
};

submitButton.onclick = async function() {
  await send("submitRecord", nameInput.value, score);
  location.href = "scoreboard.html";
};