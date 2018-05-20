function sobrepos(r1, r2) {

    
    let hit, vx;
  
    
    hit = false;
  
    
    r1.centerX = r1.x + r1.width;
    r2.centerX = r2.x + r2.width;
   
  
  
    //calculla a distancia entre o centro do r1 e o centro do r2
    vx = r1.centerX - r2.centerX;

   
    //checa se houve sobreposicao
    if (vx >= 0) {

             
        hit = true;
     
    } else {
  
      
      hit = false;
    }
  
    //retorna true se houve sobreposicao, false se nao
    return hit;
  };
