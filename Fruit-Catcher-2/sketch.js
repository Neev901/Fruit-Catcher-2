var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;

var score_text_p1, score_p1, p1_name;
var score_text_p2, score_p2, p2_name;
var playerIndex;
var score;
var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup, players_group;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;


function preload(){
  back_img = loadImage("images/jungle.jpg");
  player_img = loadImage("images/basket2.png");
  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");
  fruit3_img = loadImage("images/melon2.png");
  fruit4_img = loadImage("images/orange2.png");
  fruit5_img = loadImage("images/pineapple2.png");
  players_group = new Group()
  fruitGroup = [];
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  

  score_text_p1 = createElement("h2")
  score_text_p2 = createElement("h2")
  score_text_p1.hide()
  score_text_p2.hide()
}

function draw() {
  background(back_img);

  database.ref('players/player1/score').on('value', (val)=>{
    score_p1 = val.val()
  })

  database.ref('players/player1/name').on('value', (val)=>{
    p1_name = val.val()
  })

  database.ref('players/player2/score').on('value', (val)=>{
    score_p2 = val.val()
  })

  database.ref('players/player2/name').on('value', (val)=>{
    p2_name = val.val()
  })

  score_text_p1.html(p1_name +": "+score_p1)
  score_text_p2.html(p2_name+": "+score_p2)
  
   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
     clear(); 
     game.play();
     score_text_p1.style('color', 'skyblue');
     score_text_p2.style('color', 'skyblue');
     score_text_p1.style('font-size', '40px');
     score_text_p2.style('font-size', '40px');
     score_text_p1.position(250,180)
     score_text_p1.show()
     score_text_p2.position(250,235)
     score_text_p2.show()
   }
   if (gameState === 2) {
    
     game.end();
   }
}