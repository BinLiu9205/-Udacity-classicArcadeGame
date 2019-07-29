// 这是我们的玩家要躲避的敌人
let enemySpeed = 1.5;
let lifeRemain = 5;
document.getElementById('LifeBoard').innerHTML = lifeRemain;
let Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    // 记录x,y坐标
    this.x = x;
    this.y = y;
    this.speed = enemySpeed;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    // 保证敌人在画面内
    if (this.x < 505) {
      this.x += dt*100*enemySpeed;
    }
    else { this.x = -50; }

    //如果出现碰撞，则重设玩家
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y){
      player.reset();
      lifeRemain -= 1;
      document.getElementById('LifeBoard').innerHTML = lifeRemain;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
// 设置玩家图片和位置
let Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
};

// 为玩家计分
let playerScore = 0;
document.getElementById('ScoreBoard').innerHTML = playerScore;

Player.prototype.update = function(){
// 玩家到达彼岸后重设玩家，重设敌人，并计分
// 此处不出现动画，积分弹窗动画在五条命全部用完后出现
  if (player.y < 40) {
    playerScore += 1;
    document.getElementById('ScoreBoard').innerHTML = playerScore;
    player.reset();
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// reset玩家
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

// 根据玩家键盘操作更新玩家位置
Player.prototype.handleInput= function(direction){
  if (lifeRemain > 0){
    if (direction === "left" && this.x > 0){
      this.x -= 50;
    }
    if (direction === "right" && this.x < 400){
      this.x += 50;
    }
    if (direction === "up" && this.y > 5){
      this.y -= 50;
    }
    if (direction === "down" && this.y < 400){
      this.y += 50;
    }
  }
else {
  popUpMessage();
  //setTimeout(location.reload.bind(location), 1000)

}
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
/*let enemy1 = new Enemy(-90, 60);
let enemy2 = new Enemy(-190, 140);
let enemy3 = new Enemy(-290, 230);
let enemy4 = new Enemy(-390, 140);
let enemy5 = new Enemy(-450, 60);
let enemy6 = new Enemy(-690, 230);
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];*/

let minX = -690;
let minY = 60;
let maxX = -90;
let maxY = 230;
let allEnemies = [];
for (i = 0; i < 5; i++) {
    let enemy = new Enemy(Math.floor(Math.random()*(maxX-minX+1)+minX),Math.floor(Math.random()*(maxY-minY+1)+minY));
    allEnemies.push(enemy);
  };



let player = new Player();

function popUpMessage(){
  document.getElementById('finalScore').innerHTML = playerScore;
  window.location.href = window.location.pathname + '#super';

}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
