var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pipes1, pipes2, fb, fb2, bg, ground, coin;
var coinsGroup;
var pipe1Img, pipe2Img, fbImg, fb2Img, bgImg, groundImg, coinImg;
var score = 0;

function preload(){
  bgImg = loadImage("sprites/background.png");
  //pipesImg = loadImage("sprites/pipes.png");
  fbImg = loadImage("sprites/fb.png");
  fb2Img = loadImage("sprites/fb2.png");
  pipe1Img = loadImage("sprites/pipe1.png");
  pipe2Img = loadImage("sprites/pipe2.png");
  coinImg = loadImage("sprites/coin.png");

  
}

function setup() {
  createCanvas(800,600);
  bg = createSprite(300,300,800,600);
  bg.addImage(bgImg);
  bg.scale = 1.7;
  //crop picture



  ground = createSprite(300,580,720,20);
  ground.visible = false;
  
  fb = createSprite(40,300);
  fb.addImage(fbImg);
  fb.scale = 0.2;
  fb.debug = true;
  fb.setCollider("circle",0,0,130);
  coinsGroup = new Group();
  pipes1Group = new Group();
  pipes2Group = new Group();


  
  
}

function draw() {
  background(255);  

if(gameState === PLAY){

  bg.velocityX = -(4 + 3* score/100);  
  if (bg.x < 0){
    bg.x = bg.width/2;
  }

  if(keyDown("space")){
    fb.velocityY = -8;
    fb.addImage(fb2Img);
  }

  spawnPipes1();
  spawnPipes2();
  spawnCoins();
  
//gravity
  fb.velocityY = fb.velocityY + 1;

  if(fb.isTouching(coinsGroup)){
    score += 10;
    coinsGroup.destroyEach();
      }

  if(fb.isTouching(pipes2Group) || fb.isTouching(pipes1Group)){
    gameState = END;
    pipes1Group.setLifetimeEach(-1);
    pipes2Group.setLifetimeEach(-1);
  }
}

else if(gameState === END){
  pipes1Group.velocityXEach = 0;
  pipes2Group.velocityXEach = 0;
  bg.velocityX = 0;


}
//collide ground in function draw
  fb.collide(ground);

  
  
  drawSprites();

  fill("red");
  textSize(17);
  text("Score: " + score, 650, 50);


}

function spawnPipes1(){
  if(frameCount % 60 === 0){
    pipes1 = createSprite(795,330,50,50);
    pipes1.addImage(pipe1Img);
    pipes1.velocityX = -(6 + score/100);
    pipes1.scale = 1.4;
    pipes1.depth = fb.depth;
    fb.depth += 1;
    pipes1.lifetime = 133;

    pipes1Group.add(pipes1);
    pipes1.debug = true;
    pipes1.setCollider("rectangle",150,200,100,100);
    
  }
}

function spawnPipes2(){
  if(frameCount % 60 === 0){
    pipes2 = createSprite(795,270,50,50); //add image
    pipes2.addImage(pipe2Img);
    pipes2.velocityX = -(6 + score/100);
    pipes2.scale = 1.4;
    pipes2.depth = fb.depth;
    fb.depth += 1;
    pipes2.lifetime = 133;
    pipes2Group.add(pipes2);
    pipes2.debug = true;
    pipes2.setCollider("rectangle",150,400,100,100);
    
  }
}

function spawnCoins(){
  if(frameCount % 100 === 0){
    coin = createSprite(795,10,50,50);
    coin.y = Math.round(random(100,350));
    coin.velocityX = -10;
    coin.scale = 0.08;
    coin.addImage(coinImg);
    coin.depth = fb.depth;
    fb.depth = fb.depth + 1; // fb2.depth += 1
    coin.lifetime = 80;
    coinsGroup.add(coin);
    coinsGroup.debug = true;

  }
}

