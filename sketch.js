//Create variables here
var dog, database, foodS, foodStock;

var dogimg, goodDog;
function preload()
{
	//load images here
  dogimg = loadImage("images/dogImg.png");
  goodDog= loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(700, 550);

  database = firebase.database();

  // Creating Dog
  dog = createSprite(width/2, height/2, 100, 50);
  dog.addImage("BOH", dogimg);
  dog.scale =0.2;

  // Creating something
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() { 
  background(46, 139, 87);
  fill("white");
  text("X:"+mouseX+ " Y:"+mouseY, 10, 50); 

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage("BOH", goodDog)
  }

  else if(keyWentDown(DOWN_ARROW))
  {
    writeStock(foodS);
    dog.addImage("BOH", dogimg)
  }

  drawSprites();
  //add styles here
  textSize(25);
  text("Press UP Arrow key to Feed the Dog", 200, 50);
}

function readStock(data)
{
  foodS = data.val();
}


function writeStock(x)
{

  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }

  database.ref('/').update({
    Food: x
  })
}