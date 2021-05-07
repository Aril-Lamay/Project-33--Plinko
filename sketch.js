var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var particle;

var divisionHeight=300;
var score =0;
var count = 0;
var gameState = 'start';

var increaseScore = [];
var randomScore;
var mode;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    
    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    for(var i = 0; i < 10;i++){
      getRandomNumber();
      increaseScore.push(randomScore);
    }
    
}
 


function draw() {
  background("black");

  Engine.update(engine);
  
  if(gameState === 'start'){
    fill('white')
    textSize(170);
    textFont('Georgia')
    text('PLINKO',85,250);

    fill('grey');
    textSize(45);
    text("Press 'R' for Random Increments",75,450);
    text("or",375,500);
    text("Press 'F' for Fixed Increments ",105,550);
    
    textFont('Tahoma');

    if(keyIsDown(82)){
      mode = 'r';
      gameState = 'play';
    }
    if(keyIsDown(70)){
      mode = 'f';
      gameState = 'play';
    }
  }

  if(gameState === 'play'){
    
    fill('white');
    textSize(20)
    text("Score : "+score,20,30);
    ground.display();
  
    for (var i = 0; i < plinkos.length; i++) {
      plinkos[i].display();
    }

    for (var k = 0; k < divisions.length; k++) {
      divisions[k].display();
    }

    if(mode === 'f'){
      textSize(30);
      for(var x = 15; x < 300; x = x+ 80){
        text(500,x,550);
      }
      for(var x = 335; x < 600; x = x+ 80){
        text(100,x,550);
      }
      for(var x = 655;x < 900;x = x+80){
        text(200,x,550)
      }

      

      if(particle!=null){
        particle. display ( );
        if (particle. body . position.y>760){

          if (particle. body . position.x > 0 && particle. body . position.x < 300){
            score=score+500;
            particle=null
            count++;
          }
          else if (particle. body . position.x > 301 && particle. body . position.x < 600){
            score=score+100;
            particle=null
            count++;
          }
          else if (particle. body . position.x > 601 && particle. body . position.x < 900){
            score=score+500;
            particle=null;
            count++;
          }
          else{
            particle = null;
            count++
          }
        }
      }
    }
    else if(mode === 'r'){
    for(var i = 0;i < 10; i++){
      textSize(30)
      text(increaseScore[i]*50,15 + (i*80),550);
    }

    if(particle!=null){
        particle. display ( );
        if (particle. body . position.y>700){
          if(particle.body.position.x > 0 && particle.body.position.x < 800){
            var point = Math.round(particle.body.position.x/80);
            score = score + (increaseScore[point-1]*50);
            count++;
            
            particle = null;
          }
          else{
            particle = null;
            count++;
          }
        }
      }
    }
    if(count >= 5){
      gameState = 'end';
    }
  }

  if(gameState === 'end'){
    fill('white')
    textSize(80)
    text('Score : ' + score, 175,300);
    textSize(120)
    fill('red');
    text('GAME OVER',25,500);
    fill('white')
    textSize(30)
    text("Press 'R' to Restart",250,750);

    if(keyIsDown(82)){
      count = 0;
      score = 0;
      gameState = 'start';
    }
  }
}

function mousePressed()  {
  if(gameState === 'play') {
    particle = new Particle(mouseX,10,10,10);
  }
}

function getRandomNumber(){
  randomScore = Math.round(random(1,10));
}


    /*
    if(frameCount%120===0){
      particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
    }
  
    for (var j = 0; j < particles.length; j++) {
    
      particles[j].display();
    }
    */


