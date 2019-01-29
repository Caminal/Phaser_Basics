var gameOptions ={
    gameWidth:352,
    gameHeight:112,
    bgColor:'#3399DD',
    heroGravity:500,
    heroSpeed:200,
    heroJump:300    
};

var examen ={
    init:function(){
        game.stage.backgroundColor = gameOptions.bgColor;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
    },
    preload:function(){
        game.load.image('hero','img/hero.png');
        game.load.image('muro','img/muro.png');
        game.load.image('trampa','img/trampa.png');
        game.load.image('pincho','img/pincho.png');
        game.load.image('moneda','img/moneda.png');
        game.load.spritesheet('lava','img/lava.png',16,16);
    },
    create:function(){
        this.cursors = game.input.keyboard.createCursorKeys();
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.hero = game.add.sprite(40,50,'hero');
        this.hero.anchor.setTo(.5);
        this.hero.body.gravity.y = gameOptions.heroGravity;
        
        this.muros = game.add.group();
        this.monedas = game.add.group();
        this.pinchos = game.add.group();
        this.lavas = game.add.group();
        //this.trampas = game.add.group();
        
        //x = muro, L = lava, ^=pincho, 0= moneda 22x7
        this.nivel = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            'x                    x',
            'x                0   x',
            'x          0         x',
            'x                    x',
            'x    0   ^^^   x     x',
            'xxxTTxxxxxxxxxxxLLLLLx'
        ];
        
        this.nivel = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            'x                    x',
            'x                0   x',
            'x      00000         x',
            'x                    x',
            'x      ^^^^^   x     x',
            'xxxxxxLxxxxxxxxxLLLLLx'
        ];
        
        
        for (var i=0; i<this.nivel.length;i++){
            for (var j=0; j<this.nivel[i].length;j++){
                switch(this.nivel[i][j]){
                    case 'x':
                        muro = game.add.sprite(16*j,16*i,'muro');
                        muro.body.immovable = true;
                        this.muros.add(muro);                     
                        break;
                    case '^':
                        pincho = game.add.sprite(16*j,16*i,'pincho');
                        pincho.body.immovable = true;
                        this.pinchos.add(pincho);
                        break;
                    case '0':
                        moneda = game.add.sprite(16*j,16*i,'moneda');
                        moneda.body.immovable = true;
                        this.monedas.add(moneda);
                        break;
                        
                    case 'T':
                        this.trampa = game.add.sprite(16*j,16*i,'trampa');
                        game.physics.arcade.enable(this.trampa);
                        //trampa.body.immovable = false;
                        //trampa.body.allowGravity = true;
                        //this.trampas.add(trampa);
                        break;
                    case 'L':
                        lava = game.add.sprite(16*j,16*i,'lava');
                        lava.animations.add('wave',[0,1,2,3],6,true);
                        lava.animations.play('wave');
                        lava.body.immovable = true;
                        this.lavas.add(lava);
                        break;
                }
            }
        }
        
    },
    update:function(){
        game.physics.arcade.collide(this.hero,this.muros);
        game.physics.arcade.collide(
            this.hero,this.pinchos,this.hit,null,this);
        game.physics.arcade.overlap(
            this.hero,this.monedas,this.collect,null,this);
        game.physics.arcade.collide(
            this.hero,this.lavas,this.hit,null,this);
        game.physics.arcade.overlap(
            this.hero,this.trampa,this.tramp,null,this);
        
        if(this.cursors.left.isDown){
            this.hero.body.velocity.x = -gameOptions.heroSpeed;
            this.hero.scale.x = -1;
        }else if(this.cursors.right.isDown){
            this.hero.body.velocity.x = gameOptions.heroSpeed;
            this.hero.scale.x = 1;
        }else{
            this.hero.body.velocity.x = 0;
        }
        if (this.space.isDown && this.hero.body.touching.down){
            this.hero.body.velocity.y = -gameOptions.heroJump;
        }
        
    },
    tramp:function(_hero,_trampa){
      _trampa.body.gravity.y = gameOptions.heroGravity;
        console.log('trampa');  
    },
    
    hit:function(hero,pincho){
        //hero.reset(40,50);
        game.state.start('main');
    },
    collect:function(hero,moneda){
        moneda.kill();
    }
    
};

var game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

game.state.add('main',examen);
game.state.start('main');