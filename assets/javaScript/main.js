var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });
      
      var introText;
      var player;
      var platforms;
      var cursors;
      var enemy;
      var enemySpeed = 3;
      var enemies;
      var enemy1;
      var diamonds;
      var stars;
      var score = 0;
      var scoreText;
      var sound;
      var enemyCrack;
      var eat;
      var happy;
      var heroDanger;
  
 function preload() {
        game.load.image('sky2', 'assets/images/game/back23.jpg');
        game.load.spritesheet('rain1', 'assets/images/game/rain.png', 17, 17);
        game.load.spritesheet('rain', 'assets/images/game/star1.png', 17, 17);  
        game.load.image('ground', 'assets/images/game/plt2.png');
        game.load.image('ground1', 'assets/images/game/platt.png');
        game.load.image('ground2', 'assets/images/game/plata1.png');
        game.load.image('ground3', 'assets/images/game/platama.png');
        game.load.image('ground4', 'assets/images/game/plata3.png');
        game.load.image('ground5', 'assets/images/game/plata2.png');
        game.load.image('firstaid', 'assets/images/game/firstaid.png');
        game.load.spritesheet('dude', 'assets/images/game/spri4.png', 32, 48);
        game.load.spritesheet('baddie', 'assets/images/game/ghostiee.png', 32, 32);
        game.load.image('diamond', 'assets/images/game/diamond.png');
        game.load.image('coin', 'assets/images/game/coin.png');
        game.load.image('coin1', 'assets/images/game/coin1.png');
        game.load.image('jelly1', 'assets/images/game/jelly1.png');
        game.load.image('jelly2', 'assets/images/game/jelly2.png');
        game.load.image('help', 'assets/images/game/help.png');
        game.load.image('enter', 'assets/images/game/enter.png');
        game.load.image('enter1', 'assets/images/game/enter1.png');
        game.load.image('gate', 'assets/images/game/gate.png');
        game.load.image('stop', 'assets/images/game/stop.png');
        game.load.image('ahead', 'assets/images/game/ahead3.png');
        game.load.image('finish', 'assets/images/game/finish.png');
        game.load.image('success', 'assets/images/game/success.png');
        game.load.audio('jump', 'assets/images/game/mario.mp3');
        game.load.audio('crack', 'assets/images/game/crack.mp3');
        game.load.audio('food', 'assets/images/game/food.mp3');
        game.load.audio('woohoo', 'assets/images/game/woohoo.wav');
        game.load.audio('scream', 'assets/images/game/scream.mp3');
      }
      
function create() {
        sound = game.add.audio("jump");
        enemyCrack = game.add.audio("crack");
        eat = game.add.audio("food");
        happy = game.add.audio("woohoo");
        heroDanger = game.add.audio("scream");

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky2');

        var emitter = game.add.emitter(game.world.centerX, 0, 400);

        emitter.width = game.world.width;

        emitter.makeParticles('rain');

        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;

        emitter.setYSpeed(100, 200);
        emitter.setXSpeed(-5, 5);

        emitter.minRotation = 0;
        emitter.maxRotation = 0;

        emitter.start(false, 1600, 5, 0);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(280, 440, 'ground1');//--
        ledge.body.immovable = true;

        ledge = platforms.create(470, 260, 'ground2');//++
        ledge.body.immovable = true;

        ledge = platforms.create(370, 350, 'ground3');//--
        ledge.body.immovable = true;

        ledge = platforms.create(550, 170, 'ground4');//++
        ledge.body.immovable = true;

        ledge = platforms.create(650, 80, 'ground5');
        ledge.body.immovable = true;

        // The player and its settings
        player = game.add.sprite(590, game.world.height - 150, 'dude');
        
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        enemy1 = game.add.sprite(236,game.world.height -258, 'enter1');
        game.physics.arcade.enable(enemy1);
        enemy1.body.collideWorldBounds = true;


        enemy2 = game.add.sprite(349,game.world.height -330, 'enter');
        game.physics.arcade.enable(enemy2);
        enemy2.body.collideWorldBounds = true;  

        enemy3 = game.add.sprite(440,game.world.height -440, 'gate');
        game.physics.arcade.enable(enemy3);
        enemy3.body.collideWorldBounds = true;    

        enemy4 = game.add.sprite(525, game.world.height -530, 'ahead');
        game.physics.arcade.enable(enemy4);
        enemy1.body.collideWorldBounds = true; // enemy dont walk off the screen   

        enemy6 = game.add.sprite(629, game.world.height -575, 'finish');
        game.physics.arcade.enable(enemy6);
        enemy6.body.collideWorldBounds = true; // enemy dont walk off the screen    

        enemy5 = game.add.sprite(680,game.world.height -550, 'success');
        game.physics.arcade.enable(enemy5);
        enemy5.body.collideWorldBounds = true;     

        enemy = game.add.sprite(132, game.world.height -150, 'baddie');
        game.physics.arcade.enable(enemy);
        enemy.body.gravity.y = 300;
        
        enemy7 = game.add.sprite(385, game.world.height -217, 'stop');
        game.physics.arcade.enable(enemy7);
        enemy7.body.collideWorldBounds = true; // enemy dont walk off the screen

        health1 = game.add.sprite(320,game.world.height -193, 'jelly1');//health second level
        game.physics.arcade.enable(health1);
        health1.body.collideWorldBounds = true;  
        health1.enableBody = true;

        health2 = game.add.sprite(420,game.world.height -295, 'coin1');
        game.physics.arcade.enable(health2);
        health2.body.collideWorldBounds = true;  
        health2.enableBody = true;

        health3 = game.add.sprite(510,game.world.height -373, 'jelly2');
        game.physics.arcade.enable(health3);
        health3.body.collideWorldBounds = true;  
        health3.enableBody = true;     

        health4 = game.add.sprite(580,game.world.height -475, 'coin');
        game.physics.arcade.enable(health4);
        health4.body.collideWorldBounds = true;  
        health4.enableBody = true;   

        // so enemy baddie doesn't walk off screen
        enemy.body.collideWorldBounds = true;

        enemy.animations.add('left', [0, 1], 10, true);
        enemy.animations.add('right', [2, 3], 10, true);

        // baddie movement timer creation
        game.time.events.repeat(Phaser.Timer.SECOND * 3, 10, moveBaddie, game);
        // enemy sprite end
        cursors = game.input.keyboard.createCursorKeys();
        //add diamonds
        diamonds = game.add.group();
        //  We will enable physics for any star that is created in this group
        diamonds.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var j = 0; j < 1; j++)
        {
          //  Create a star inside of the 'stars' group
          var diamond = diamonds.create(j * 50, 2, 'help');

          //  Let gravity do its thing
          diamond.body.gravity.y = 250;

          //  This just gives each star a slightly random bounce value
          diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        
        //  The score
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ff0044' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

       introText = game.add.text(game.world.centerX-40, 150, '- left or right key to start -', { font: "25px Arial", fill: "#ffffff", align: "center" });
       introText.anchor.setTo(0.5, 0.5);
      }


      function update() {
        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(enemy, platforms);
        game.physics.arcade.collide(enemy1, platforms);
        game.physics.arcade.collide(diamonds, platforms);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(player, enemy, danger, null, this);
        game.physics.arcade.overlap(player,enemy1, danger1, null, this);
        game.physics.arcade.overlap(player, diamonds, collectDiam, null, this);
        game.physics.arcade.overlap(player, health1, collectHealth1, null, this);
        game.physics.arcade.overlap(player, health2, collectHealth2, null, this);
        game.physics.arcade.overlap(player, health3, collectHealth3, null, this);
        game.physics.arcade.overlap(player, health4, collectHealth4, null, this);
        game.physics.arcade.overlap(player,enemy5, danger3, null, this);
        game.physics.arcade.overlap(player,enemy2, danger5, null, this);
        game.physics.arcade.overlap(player,enemy3, danger6, null, this);
        game.physics.arcade.overlap(player,enemy4, danger4, null, this);
        game.physics.arcade.overlap(player,enemy7, danger7, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
          //  Move to the left
          player.body.velocity.x = -150;
          player.animations.play('left');
          introText.visible = false;
        }
        else if (cursors.right.isDown)
        {
          //  Move to the right
          player.body.velocity.x = 150;
          player.animations.play('right');
          introText.visible = false;
        }
        else
        {
          //  Stand still
          player.animations.stop();
          player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
          player.body.velocity.y = -350;
          sound.play(); 
        }
      }
      
      function moveBaddie() {
        // randomise the movement
        baddieMover = game.rnd.integerInRange(1, 3);

        // simple if statement to choose if and which way the baddie moves
        if (baddieMover == 1) {
          enemy.body.velocity.x = 25;
          enemy.animations.play('right');
        }
        else if (baddieMover == 2) {
          enemy.body.velocity.x = -25;
          enemy.animations.play('left');
        }
        else {
          enemy.body.velocity.x = 0;
          enemy.animations.stop();
        }
      } 

    function collectHealth1 (player, health1) {
      // Removes the star from the screen
      if(health1.kill()){
        enemy2.kill();
        enemy7.kill();
        eat.play();
      }
      
      //  Add and update the score
      score += 10;
      scoreText.text = 'Score: ' + score;
    }

    function collectHealth2 (player, health2) {
      // Removes the star from the screen
      if(health2.kill()){
        enemy3.kill();
        eat.play();
      }

      //  Add and update the score
      score += 10;
      scoreText.text = 'Score: ' + score;
    }


    function collectHealth3 (player, health3) {
      // Removes the star from the screen
      if(health3.kill()){
        enemy4.kill();
        eat.play();
      }

      //  Add and update the score
      score += 10;
      scoreText.text = 'Score: ' + score;
    }

    function collectHealth4 (player, health4) {
      // Removes the star from the screen
      if(health4.kill()){
        enemy6.kill();
        eat.play();
      }

      //  Add and update the score
      score += 10;
      scoreText.text = 'Score: ' + score;
    }

    function collectDiam (player, diamond) {
      // Removes the star from the screen
      if(diamond.kill()){
        enemy1.kill();
        eat.play();
      }

      score += 10;
      scoreText.text = 'Score: ' + score; //  Add and update the score
    }


    function danger (player, enemy){
      if(player.y+24<enemy.y) //divide height of the player by 2
      {
        player.body.velocity.y = -350;
        enemy.kill();
        enemyCrack.play();
      }
      else{
        player.kill();
        heroDanger.play();
        var style = { font: "35px Arial", fill: "white", align: "center" };
        var text = game.add.text(game.world.centerX-60, game.world.centerY-100, "Game is Over!", style);
        text.anchor.set(0.5);

        game.input.onDown.addOnce(removeText, this);
        function removeText() {
          text.destroy();
        }  
      }
    }

    function danger1(player, enemy1){
      player.kill(); 
      heroDanger.play();
      var style = { font: "35px Arial", fill: "white", align: "center" };
      var text = game.add.text(game.world.centerX-60, game.world.centerY-100, "Game is Over!", style);
      text.anchor.set(0.5);

      game.input.onDown.addOnce(removeText, this);
      function removeText() {
          text.destroy();
        }
    }

    function danger3 (player, enemy5){
      if(player.x+14 < enemy5.x) //divide height of the player by 2
      {
        player.kill();
        happy.play();
        score += 200;
        scoreText.text = 'Score: ' + score;
        var style = { font: "35px Arial", fill: "white", align: "center" };
        var text = game.add.text(game.world.centerX-60, game.world.centerY-100, "You Reached Success!", style);
        text.anchor.set(0.5);

        game.input.onDown.addOnce(removeText, this);
        
        function removeText() {
          text.destroy();
        }
      }
    }

     function danger4(player, enemy4){
      player.kill(); 
      heroDanger.play(); 
      var style = { font: "35px Arial", fill: "white", align: "center" };
      var text = game.add.text(game.world.centerX-60, game.world.centerY-100, "Game is Over!", style);
      text.anchor.set(0.5);

      game.input.onDown.addOnce(removeText, this);
      
      function removeText() {
          text.destroy();
        }
    }

    function danger5(player, enemy2){
      player.kill(); 
      heroDanger.play(); 
      var style = { font: "35px Arial", fill: "white", align: "center" };
      var text = game.add.text(game.world.centerX-60, game.world.centerY-100, "Game is Over!", style);
      text.anchor.set(0.5);

      game.input.onDown.addOnce(removeText, this);
      function removeText() {
          text.destroy();
        }
    }

    function danger6(player, enemy3){
      player.kill(); 
      heroDanger.play(); 
      var style = { font: "35px Arial", fill: "white", align: "center" };
      var text = game.add.text(game.world.centerX-60, game.world.centerY-100, "Game is Over!", style);
      text.anchor.set(0.5);

      game.input.onDown.addOnce(removeText, this);
      function removeText() {
          text.destroy();
        }  
    }


    function danger7(player, enemy7){
      player.kill(); 
      heroDanger.play();
      var style = { font: "35px Arial", fill: "white", align: "center" };
      var text = game.add.text(game.world.centerX-60, game.world.centerY-100, "Game is Over!", style);
      text.anchor.set(0.5);

      game.input.onDown.addOnce(removeText, this);
      function removeText() {
          text.destroy();
        }  
    }


    
