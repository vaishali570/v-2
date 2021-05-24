
 var dog, database,foodS,foodStock,fedTime,lastFed,feed,addFood,foodObj;
 var dogName;
 var M = 1;
 var 
 function pssreload(){
 sadDog=loadImage("images/dogImg.png");
 happyDog=loadImage("images/dogImg1.png");
 }
 
 function setup() {
   database=firebase.database();
   createCanvas(1000,500);
   foodStock=database.ref('food');
   foodStock.on("value",readStock);
   fedTime=database.ref('feedtime');
   fedTime.on("value",function(data){
     lastFed=data.val();

   feedTheDog.position(700,120)
   
   nameDog = createInput("Name of your Dog")
   nameDog.position(400,200)
 
   button = createButton("ENTER")
   button.position(415,250)
  button.mousePressed(()=>{
 button.hide();
 nameDog.hide();
 dogName = nameDog.value();
 M=2;
  })
   
   
 
  
   foodObj = new Food();
   
   });
   
   dog=createSprite(800,200,150,150);
   dog.addImage("dog1",sadDog);
   dog.scale=0.2;
   
   feed=createButton("Feed the Dog");
   feed.position(1000,95);
   feed.mousePressed(feedDog);
 
   addFood=createButton("Add Milk");
   addFood.position(1100,95);
   addFood.mousePressed(addFoods);
 
 }
 
 function draw() {
   background(46,139,87);
   
  
   textSize(30);
   fill("white");
   if(M===2){
     text("Name of Dog: " + dogName,10,350)
     if(lastFed>=12){
     
       text(""+dogName+" was last Fed At : "+ lastFed%12 + " PM", 30,60);
      }else if(lastFed==0){
        text(""+dogName+" was Last Fed At: 12 AM",30,30);
      }else{
        text(""+dogName+" was Last Fed At: "+ lastFed + " AM", 30,60);
      }
   }

   if(lastFed>=12){ 
     text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
    }
    else if(lastFed==0){ 
      text("Last Feed : 12 AM",350,30);
     }
     else{ 
       text("Last Feed : "+ lastFed + " AM", 350,30);
   }
   foodObj.display();
   drawSprites();
 }
 
 //function to read food Stock
 function readStock(data){
   foodS=data.val();
   foodObj.updateFoodStock(foodS);
 }
 
 
 //function to update food stock and last fed time
 function feedDog(){
   dog.addImage("dog1",happyDog);
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
   })
 }
 
 //function to add food in stock
 database.ref('/').update({ 
   Food:foodObj.getFoodStock(), 
  FeedTime:hour() })

 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
 }
 