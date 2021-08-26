var player, pImage , ground, bImage, bg;
var score,restart,gameOver;
var END=0;
var PLAY=1;
var gameState=PLAY;

function preload (){
  pImage = loadImage("player.png");
  bImage = loadImage("wall.jpg");
  obstacle1 = loadImage("rock.png");
  obstacle2 = loadImage("cone.png");
  powerUp = loadImage("powerUp.png");
  restart_img=loadImage("restart.png");
  gameOver_img=loadImage("gameOver.png");
}







function setup(){
  createCanvas(windowWidth,windowHeight);


bg=createSprite(0,0,2000,700);
      bg.addImage(bImage);
      bg.scale =5;
     
     
      bg.x=bg.width/2;

      player = createSprite(80,windowHeight-50,100,50);
player.scale=1.25;
player.addImage(pImage);
player.setCollider("circle",0,0,50)


ground = createSprite(800,windowHeight-50,1600,5);
ground.visible = false;

obstacleGroup = new Group ();
keyGroup = new Group();

restart=createSprite(windowWidth/2,150,80,80);
  restart.addImage(restart_img);
  restart.scale=0.5;
  restart.visible=false;

   gameOver=createSprite(windowWidth/2,100,300,300);
  gameOver.addImage(gameOver_img);
  gameOver.scale=0.5;
  gameOver.visible=false;

score = 0;



}

function draw (){

  background(150);

  bg.velocityX=-6;

  if(gameState===PLAY){


    if((touches.length > 0 || keyDown("SPACE")) && player.y  >= height-220) {
     player.velocityY = -20;
       touches = [];
    }


  if(keyDown("RIGHT_ARROW")) {
    player.x =  player.x+10;
  }

  if(keyDown("LEFT_ARROW")) {
    player.x =  player.x - 10;
  }


  player.velocityY = player.velocityY + 0.8;


  if (bg.x < 0){
    bg.x = bg.width/2;
    
    
  } 
   
 
  

  player.collide(ground);


  


  if(obstacleGroup.isTouching(player)){

    gameState= END;


  }
}

 else{ player.velocityX = 0;
    player.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    keyGroup.setVelocityXEach(0);
    bg.velocityX=0;
    obstacleGroup.setLifetimeEach(-1);
    keyGroup.setLifetimeEach(-1);
     gameOver.visible=true;
    restart.visible= true;

 }

  if(keyGroup.isTouching(player)){

    score = score+5;
    keyGroup.visible= false;


  }

  if(mousePressedOver(restart)){
    reset()
  }

  drawSprites();
spawnObstacles();
  spawnKey();

  textSize(24);
  fill("white");
  text("Score:"+score,windowWidth/2,50);

}


  function spawnKey(){
    if (frameCount % 130 === 0) {

    var key = createSprite(1000,windowHeight-300,10,10);
    key.addImage(powerUp);
    key.scale = 0.15;
    key.velocityX = -3;

    key.lifetime= 400;
    keyGroup.add(key);

    }  

    

  }
  

  function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(1000,windowHeight-30,10,40);
    obstacle.velocityX = -4;
    obstacle.scale =0.5;
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      
      default: break;
    }

    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }

  
  }
  function reset(){
    gameState=PLAY;
    restart.visible=false;
    gameOver.visible=false;
    obstacleGroup.destroyEach();
    keyGroup.destroyEach();
    score=0;
  }
  
   
  
  

  

  
  
  
  
  


