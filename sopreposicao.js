function sobrepos(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  
    //hit will determine whether there's a collision
    hit = false;
  
    
    r1.centerX = r1.x + r1.width/2;
    r1.centerY = r1.y + r1.height/2;
    r2.centerX = r2.x + r2.width/2;
    r2.centerY = r2.y + r2.height/2;
  
  
    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
  
    

    
    //Check for a collision on the x axis
    if (vx >= 0) {

             
        hit = true;
     
    } else {
  
      
      hit = false;
    }
  
    //`hit` will be either `true` or `false`
    return hit;
  };
