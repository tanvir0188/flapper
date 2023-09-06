function calibrateBG() {
  BG1.x2 = canvas.width;
  BG1.width = canvas.width;
  BG1.height = canvas.height;
  BG2.x2 = canvas.width;
  BG2.width = canvas.width;
  BG2.height = canvas.height;
  BG3.x2 = canvas.width;
  BG3.width = canvas.width;
  BG3.height = canvas.height;
}

function handleBackgroundLayer(BG, layer, speed) {
  if (speed < 0) speed = 0;
  if (BG.x1 <= -BG.width) BG.x1 = BG.width + BG.x2 - speed;
  else BG.x1 -= speed;

  if (BG.x2 <= -BG.width) BG.x2 = BG.width + BG.x1 - speed;
  else BG.x2 -= speed;

  ctx.drawImage(layer, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(layer, BG.x2, BG.y, BG.width, BG.height);
}

function handleBackground() {
  handleBackgroundLayer(BG3, bgLayer3, gameSpeed - 2);
  handleBackgroundLayer(BG2, bgLayer2, gameSpeed - 1);
  handleBackgroundLayer(BG1, bgLayer1, gameSpeed);
}
