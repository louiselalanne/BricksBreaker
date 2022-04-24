var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["4da75726-54ad-4257-a332-64ac96b028d5","5e2490da-a77b-479d-bed0-04e5103cba6d","ccc41a33-b031-45a5-9989-1ffcf50a9888","c4312409-9c50-49a4-964f-5f9af12de548"],"propsByKey":{"4da75726-54ad-4257-a332-64ac96b028d5":{"name":"ball","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"ByKIHJ4.HXZeUUIotovrcEdjAiZ6haau","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/4da75726-54ad-4257-a332-64ac96b028d5.png"},"5e2490da-a77b-479d-bed0-04e5103cba6d":{"name":"bar","sourceUrl":null,"frameSize":{"x":100,"y":15},"frameCount":1,"looping":true,"frameDelay":12,"version":"XADcD.po5wzC7Mi61zS2uLnJ48OOXTUE","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":15},"rootRelativePath":"assets/5e2490da-a77b-479d-bed0-04e5103cba6d.png"},"ccc41a33-b031-45a5-9989-1ffcf50a9888":{"name":"gameover.png_1","sourceUrl":"assets/v3/animations/dhKvYjHV57PcAWIOT4VWfSuPyVsvbowLmQ724Lqn4no/ccc41a33-b031-45a5-9989-1ffcf50a9888.png","frameSize":{"x":187,"y":93},"frameCount":1,"looping":true,"frameDelay":4,"version":"XI_dDER5t4ZCoIFBDAIe0vWUvOPD0wBj","loadedFromSource":true,"saved":true,"sourceSize":{"x":187,"y":93},"rootRelativePath":"assets/v3/animations/dhKvYjHV57PcAWIOT4VWfSuPyVsvbowLmQ724Lqn4no/ccc41a33-b031-45a5-9989-1ffcf50a9888.png"},"c4312409-9c50-49a4-964f-5f9af12de548":{"name":"Youwin.png_1","sourceUrl":"assets/v3/animations/dhKvYjHV57PcAWIOT4VWfSuPyVsvbowLmQ724Lqn4no/c4312409-9c50-49a4-964f-5f9af12de548.png","frameSize":{"x":171,"y":123},"frameCount":1,"looping":true,"frameDelay":4,"version":"snrf5379J1Q6aM6wc8NQ7NRx0Hdw4E26","loadedFromSource":true,"saved":true,"sourceSize":{"x":171,"y":123},"rootRelativePath":"assets/v3/animations/dhKvYjHV57PcAWIOT4VWfSuPyVsvbowLmQ724Lqn4no/c4312409-9c50-49a4-964f-5f9af12de548.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//Cria o sprite da barra.
var bar = createSprite(200, 370);
bar.setAnimation("bar");
//Cria o sprite da bola.
var ball = createSprite(10, 10);
ball.setAnimation("ball");
ball.setSpeedAndDirection(5, 45);
ball.scale = 0.15;
//Cria o grupo obstacles.
var obstacles = createGroup();
//Declara uma variável para contar a quantidade de blocos.
var TotBlocks = 0;
//Declara uma variável para contar a quantidade de blocos destruídos.
var DesBlocks = 0;
function createBlocks(numBlocks,X,Diff, Y) {
  for (var i=0; i< numBlocks; i++)
{
  //Cria o sprite do bloco.
  var block = createSprite(X,Y,5,5);
  //Define a shapeColor do bloco para laranja.
  block.shapeColor="orange";
  //Adiciona block ao grupo obstacles.
  obstacles.add(block);
  //Aumenta a contagem de blocks em 1.
  TotBlocks = TotBlocks+1;
  //Incrementa X por Diff.
  X = X+Diff;
}
}
//Cria a primeira linha de blocos.
createBlocks(16,50,20, 30);
//Cria a segunda linha de blocos.
createBlocks(16,50,20, 60);
//Cria a terceira linha de blocos.
createBlocks(16,50,20, 90);
//Cria os sprites de bordas.
createEdgeSprites();
function draw()
{ 
  background("black");
  //Mova a barra para o oeste (180 graus) usando a tecla esquerda.
  if (keyWentDown("left")) {
    bar.setSpeedAndDirection(5, 180);
  }
  //Mova a barra para o leste (0 graus) usando a tecla direita.
  if (keyWentDown("right")) {
    bar.setSpeedAndDirection(5, 0);
  }
  //Utilize o bounceOff para as bordas rebaterem a barra.
  if (bar.isTouching(edges)) {
    bar.bounceOff(edges);
  }
  //Utilize o bounceOff para a barra rebater a bola.
  if (ball.isTouching(bar)) {
    ball.bounceOff(bar);
    playSound("assets/category_projectile/game_ball_bounce.mp3", false);
  }
  //Utilize o bounceOff para as topEdge rebater a bola.
  if (ball.isTouching(topEdge)) {
    ball.bounceOff(topEdge);
  }
  //Utilize o bounceOff para as rightEdge rebater a bola.
  if (ball.isTouching(rightEdge)) {
    ball.bounceOff(rightEdge);
  }
  //Utilize o bounceOff para as leftEdge rebater a bola.
  if (ball.isTouching(leftEdge)) {
    ball.bounceOff(leftEdge);
  }
  //Destrói cada bloco do grupo obstacles.
for (var i = 0;i<TotBlocks;i++){
  //verifica se um sprite do grupo obstacles não foi definido
  //E
  //verifica se esse mesmo sprite está tocando na bola
  if (obstacles.get(i) != undefined && obstacles.get(i).isTouching(ball))
  {
    obstacles.get(i).destroy();
    playSound("assets/category_collect/collect_item_bling_1.mp3", false);
    //Aumenta DesBlocks em 1
    DesBlocks = DesBlocks+1;
  }
 }
  //Adiciona a condição de vitória
  if (DesBlocks==TotBlocks) {
    var win = createSprite(200, 200);
    win.setAnimation("Youwin.png_1");
    ball.destroy();
    playSound("assets/category_music/fun_game_win_musical_1.mp3", false);
  }
  //Adiciona a condição de perda
  if (ball.isTouching(bottomEdge)) {
    var lose = createSprite(200, 200);
    lose.setAnimation("gameover.png_1");
    ball.destroy();
    playSound("assets/Death.mp3", false);
  }
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
