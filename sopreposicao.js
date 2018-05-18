function sobrepos(r1, r2) {

    
    let hit, vx;
  
    
    hit = false;
  
    
    r1.centerX = r1.x + r1.width/2;
    r2.bordaX = r2.x + r2.width;
   
  
  
    //calculla a distancia entre o centro do r1 e a borda do r2
    vx = r1.centerX - r2.bordaX;
 
    //checa se houve sobreposicao
    if (vx >= 0) {

             
        hit = true;
     
    } else {
  
      
      hit = false;
    }
  
    //retorna true se houve sobreposicao, false se nao
    return hit;
  };
