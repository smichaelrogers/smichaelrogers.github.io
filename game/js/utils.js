(function(window) {
  var bX, bY, pX, pY, pW;



  ballLandsOn = function(platform) {
    bX = ball.x;
    bY = ball.y;
    pX = platform.x;
    pY = platform.y;
    pW = platform.sizeX;

    if(pY + PLATFORM_HEIGHT * 2 >= bY &&  bY >= pY + (PLATFORM_HEIGHT * .5)) {
      if(bX + BALL_SIZE >= pX && pX + pW >= bX - BALL_SIZE){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  ballRunsInto = function(platform) {
    bX = ball.x;
    bY = ball.y;
    pX = platform.x;
    pY = platform.y;
    pW = platform.sizeX;

    if(pY >= bY + BALL_SIZE * .3 && pY <= bY + BALL_SIZE) {
      if(bX + BALL_SIZE >= pX && pX + pW >= bX - BALL_SIZE){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }



}(window))
