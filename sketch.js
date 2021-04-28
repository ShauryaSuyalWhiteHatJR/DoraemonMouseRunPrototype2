var bgImg;
var gameState = "start"
var dora;
var dora_run;
var dora_collided;
var ground;
var score = 0;
var obstacleGroup;
var END = 0;
var gameOver, restart;

function preload(){
  bgImg = loadImage("background.png");
  startImg = loadImage("Loading screen.png")
  playImg = loadImage("play button.png")
  dora_run = loadAnimation("dora.png","dora1.png","dora2.png","dora3.png","dora4.png","dora5.png");
  dora_collided = loadImage("dora jump.png");
  mouseImg = loadImage("mouse.png");
  mouse1 = loadImage("mouse1.png");
  mouse2 = loadImage("mouse2.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  dorasong = loadSound("Dorasong.mp3");
}

function setup() {
  createCanvas(1200,550);
  bg = createSprite(600,300,2000,10);
  bg.visible = true;
  play = createSprite(260,450);
  play.visible = true;
  ground = createSprite(200,525,10000,20);
  ground.static = true;
  ground.visible  = false;
  dora = createSprite(100,470,120,200);
  dora.addAnimation("run",dora_run);
  dora.addImage(dora_collided);
  dora.visible = false;
  dora.scale = 0.7;
 

gameOver = createSprite(580,150);
gameOver.addImage(gameOverImg);
restart = createSprite(580,350);
restart.addImage(restartImg);
gameOver.visible = false;
restart.visible = false;
obstacleGroup = new Group(); 

}

function draw() {
  
  background('lightblue');  

  if (gameState === "start"){
   
   bg.addImage (startImg);
   bg.scale = 1;
   play.addImage(playImg);
   play.scale = 0.7;
   obstacleGroup.destroyEach();
   obstacleGroup.visible = false;
   obstacleGroup.lifetime = 0;
   if(mousePressedOver(play)){
    gameState = "play";
}
 }

if (gameState === "play"){
 bg.addImage(bgImg);
 bg.scale = 0.7;
 play.visible = false;
 dora.visible = true;
 dora.velocityX = 0;
 dora.setCollider("rectangle",10,8);
 dora.debug = true;
 ground.visible = false;
 bg.velocityX = -15;
 //dora.debug = true;

 
 if(keyDown("space")&& dora.y >= 420 ){
    dora.velocityY = -18;
    //dora.changeImage(dora_jump);  
}

    dora.velocityY = dora.velocityY  +0.8;
      if (bg.x < 0){
      bg.x = bg.width/2;
    }
}
    
      
    
spawnMouse();

if(obstacleGroup.isTouching(dora)){
  gameState = END;
}
else if (gameState === END) {

gameOver.visible = true;
restart.visible = true;
obstacleGroup.visible = false;
obstacleGroup.destroyEach();
dora.y = 470;

if(mousePressedOver(restart)){
  reset();
}

}
dora.collide(ground);





  


 drawSprites();


function reset(){
  gameState = "play"
  gameOver.visible = false;
  restart.visible = false;
  
}


  

function spawnMouse() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(1300,460,60,50);
    //obstacle.debug = true;
    obstacle.velocityX = -10
    obstacle.scale = 0.1; 
    obstacle.setCollider("rectangle",5,5);
    obstacle.debug = true;
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(mouseImg);
              break;
      case 2: obstacle.addImage(mouse1);
              break;
      case 3: obstacle.addImage(mouse2);
              break;
     
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  
  
  }



}
}



 




