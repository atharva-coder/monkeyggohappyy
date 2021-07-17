var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg,obstacle,obstacleImg,gameOverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImg  = loadImage("banana.png");
obstacleImg = loadImage("stone.png");
gameOverImg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  bananaGrp = new Group();
  obstacleGrp = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spwanFruit();
    spawnobstacles();
    if(bananaGrp.isTouching(player)){
      bananaGrp.destroyEach();
      player.scale += 0.05;
      score +=2;

    }
    if(obstacleGrp.isTouching(player)){
      gameState = END;
    }

  }
  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;
    bananaGrp.destroyEach();
    obstacleGrp.destroyEach();
    gameOver.visible = true;
  }
  

  drawSprites();
  textSize(20);
  fill("white");
  text("Score : "+score, 500,50);
}
function spwanFruit(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImg);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -4;
    banana.scale = 0.05
    banana.lifetime = 300;
    player.depth = banana.depth+1;
    bananaGrp.add(banana);

  }
}
function spawnobstacles(){
if(frameCount % 300 === 0){
  obstacle = createSprite(600,350);
  obstacle.velocityX = -(4+2*score/100);
  obstacle.addImage(obstacleImg);
  obstacle.scale = 0.2;
  obstacle.lifetime = 300;
  obstacleGrp.add(obstacle);

}
}
