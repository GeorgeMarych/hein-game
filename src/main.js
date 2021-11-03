var canvas = document.getElementById("myCanvas");
    
window.onload = () => {
    if(window.innerWidth < 960){
        canvas.addEventListener("touchstart", handleStart,true);
    }
    if(window.innerWidth > 960){
        canvas.addEventListener("mousedown", chooseLocation,true);    
    }
 
  };
  
//   if(window.innerWidth > 960){
//         canvas.style.maxWidth = "550px";
//         canvas.style.maxHeight = "1031px";
//         canvas.style.marginTop="-68px";
//         let styleElem = document.head.appendChild(document.createElement("style"));
//         styleElem.innerHTML = "#step-5::before  {width: calc(100% - 548px);;}";
//         let styleElem2 = document.head.appendChild(document.createElement("style"));
//         styleElem2.innerHTML = "#step-5::after  {width: calc(100% - 548px);;}";
//         document.getElementById("myUL").style.maxWidth = "490px";
//         document.getElementById("myFooter").style.maxWidth ="490px";
//     }


  var ctx = canvas.getContext("2d");
  var ballRadius =   18;
  var smallBallRadius = 3;
  var x = canvas.width/2;
  var y = 50;
  let xx = 15 + canvas.width/9
  let yy = canvas.height/9 + 50
  var dx = 0;
  var dy = 0;
  var friction = 0.65;
  let clickCount = 0;
  
  let collide = require("line-circle-collision");
  
  

  if(window.innerWidth < 960){



  function handleStart(e){


      clickCount  = 1
      if(clickCount == 1){

      if(window.innerWidth /2 < e.touches[0].clientX - (window.innerWidth-canvas.width)/2 + ballRadius/2 && e.touches[0].clientX - (window.innerWidth-canvas.width)/2 + ballRadius/2  < window.innerWidth /2  + ballRadius*2){
            x = e.touches[0].clientX - (window.innerWidth-canvas.width)/2 + ballRadius/2;
            canvas.addEventListener("touchmove", handleMove);
            canvas.addEventListener("touchend", handleEnd,{ once: true });
      }else{
          x=x;
      }
    }
      
      
  }
  
  
  function handleMove(e){

      if(clickCount == 1){
          if(x + ballRadius > canvas.width - 30){
              x = x ;
              if(e.touches[0].clientX - (window.innerWidth-canvas.width)/2 + ballRadius/2 < x){
                  x = e.touches[0].clientX  - (window.innerWidth-canvas.width)/2 + ballRadius/2;
              }
          }else if(x - ballRadius < 30){
              x = x;
              if(e.touches[0].clientX - (window.innerWidth-canvas.width)/2 + ballRadius/2 > x){
                  x = e.touches[0].clientX  - (window.innerWidth-canvas.width)/2 + ballRadius/2;
              }
          }else{
              x = e.touches[0].clientX - (window.innerWidth-canvas.width)/2 + ballRadius/2;
          }
      }
      console.log("handleMove")
  
  
  }
  function handleEnd(e){
      x = x;
      dy = 2;
      clickCount = 2;
      canvas.removeEventListener("touchstart", handleStart, true);

      canvas.classList.remove('pointer');
      document.getElementById("hand").remove("show-hand")
  }
}

if(window.innerWidth > 960){


function chooseLocation(e){
    
        clickCount  = 1;
        console.log(window.innerWidth /2 - ballRadius)
        console.log(window.innerWidth /2 + ballRadius/2)
        console.log(e.pageX)

    if(clickCount == 1){
        if(window.innerWidth /2 - ballRadius < e.pageX  && e.pageX  < window.innerWidth /2  + ballRadius/2){
            x = e.pageX - (window.innerWidth-canvas.width)/2 + ballRadius/2;
            canvas.addEventListener("mousemove",startFollowing);
            canvas.addEventListener("mouseup",startGame,{ once: true });
        }else{
            x=x;
        }
    }
}
function startFollowing(e){
    if(clickCount == 1){
        if(x + ballRadius >= canvas.width - 30){
            x = x ;
            if(e.pageX - (window.innerWidth-canvas.width)/2 + ballRadius/2 < x){
                x = e.pageX - (window.innerWidth-canvas.width)/2 + ballRadius/2;
            }
        }else if(x - ballRadius <= 30){
            x = x ;
            if(e.pageX - (window.innerWidth-canvas.width)/2 + ballRadius/2 > x){
                x = e.pageX - (window.innerWidth-canvas.width)/2 + ballRadius/2;
            }
        }else{
            x = e.pageX - (window.innerWidth-canvas.width)/2 + ballRadius/2;

        }
    }
}
function startGame(e){
    x = x;
    dy = 2;
    clickCount = 2;
    canvas.removeEventListener("mousedown",chooseLocation,true);
    canvas.classList.remove('pointer');
    document.getElementById("hand").remove("show-hand")
}
}





function leftWallBag(){
    if(clickCount == 2){
        ctx.beginPath();
        ctx.moveTo(29, 50);
        ctx.lineTo(29,100)
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#00458E';
        ctx.stroke();
        ctx.closePath();
        var hit = collide([29,50],[29,100],[x,y],ballRadius);
        if(hit == true){
            dy = -dy*0.8;        
            dx = 2*0.9;
       }
    }
}

function drawTriangleLeft(){
    ctx.beginPath();
    ctx.moveTo(10, 50);
    for(let i = 0; i< 17; i++){
        ctx.lineTo(i%2 == 1 ? 10 - 20 : 10, 100 + (i*38));
        var circle = [x, y];    
        var hit = collide([i%2 == 1 ? 10 - 20 : 10, 50 + (i*38)],[(i+1)%2 == 1 ? 30 - 20 : 30, 100 + ((i+1)*38)], circle, ballRadius)
    if(hit == true){
         dy = -dy*0.8;        
         dx = 2*0.9;
    }
    }
    ctx.lineTo(10,750)
    var hit = collide([10,712],[10,750],[x,y],ballRadius);
    if(hit == true){
        dy = -dy*0.8;        
        dx = 2*0.9;
   }
    ctx.lineWidth = 40;
    ctx.strokeStyle = '#00458E';
    ctx.stroke();
    ctx.closePath();

}
function drawTriangleRight(){
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, 50);
    var hit = collide([canvas.width - 9,50],[canvas.width - 9,100],[x,y],ballRadius);
    for(let i = 0; i< 17; i++){
        ctx.lineTo(i%2 == 1 ? canvas.width + 10  : canvas.width - 10, 100 + (i*38));
        var circle = [x, y];    
        var hit = collide([i%2 == 1 ? canvas.width - 10  : canvas.width - 30 , 100 + (i*38)],[(i+1)%2 == 1 ? canvas.width - 10  : canvas.width - 30 , 100 + ((i+1)*38)], circle, ballRadius)
    if(hit == true){
         dy = -dy*0.8;        
         dx = -2*0.9;
    }
    }
    ctx.lineTo(canvas.width - 10,750)
    var hit = collide([canvas.width - 10,712],[canvas.width - 10,750],[x,y],ballRadius);
    if(hit == true){
        dy = -dy*0.8;        
        dx = -2*0.9;
   }

    ctx.lineWidth = 40;
    ctx.strokeStyle = '#00458E';
    ctx.stroke();
    ctx.closePath();
}

function drawLines(){
    var executed = false;
        if (executed === false) {
            executed = true;
            for(let i=0;i < 25;i++){
                for(let j=0;j<6;j++){
                    lineBalls(30 + (canvas.width-60)/7*(j+1) ,canvas.height,smallBallRadius,0,Math.PI*2, i,0);
                        if(distance(x, y, 30 + (canvas.width-60)/7*(j+1),canvas.height-(i * 1.5) ) < ballRadius+smallBallRadius){
                            dy = -dy*0.8;
                        if(canvas.width/7*(j+1)>x){
                            dx = -2*0.9;
                            dy * 0.65;
                        }else{
                            dx = 2*0.9;
                            dy * 0.65;
                        }
                    }
                }
            }
        }
  
}

function drawBall() {
    var img = new Image();
    img.src = './assets/images/crown-5.png';
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.clip();
    ctx.drawImage(img, x-ballRadius, y-ballRadius, 2*ballRadius, 2*ballRadius);
    ctx.restore();

}


function drawTriangles(){
    drawTriangleLeft();
    drawTriangleRight();
    leftWallBag();
}



function leftWallBag(){
    if(clickCount == 2){
        ctx.beginPath();
        ctx.moveTo(29, 50);
        ctx.lineTo(29,100)
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#00458E';
        ctx.stroke();
        ctx.closePath();
        var hit = collide([29,50],[29,100],[x,y],ballRadius);
        if(hit == true){
            dy = -dy*0.8;        
            dx = 2*0.9;
       }
    }
}

function drawTriangleLeft(){
    ctx.beginPath();
    ctx.moveTo(10, 50);
    for(let i = 0; i< 17; i++){
        ctx.lineTo(i%2 == 1 ? 10 - 20 : 10, 100 + (i*38));
        var circle = [x, y];    
        var hit = collide([i%2 == 1 ? 10 - 20 : 10, 50 + (i*38)],[(i+1)%2 == 1 ? 30 - 20 : 30, 100 + ((i+1)*38)], circle, ballRadius)
    if(hit == true){
         dy = -dy*0.8;        
         dx = 2*0.9;
    }
    }
    ctx.lineTo(10,750)
    var hit = collide([10,712],[10,750],[x,y],ballRadius);
    if(hit == true){
        dy = -dy*0.8;        
        dx = 2*0.9;
   }
    ctx.lineWidth = 40;
    ctx.strokeStyle = '#00458E';
    ctx.stroke();
    ctx.closePath();

}
function drawTriangleRight(){
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, 50);
    var hit = collide([canvas.width - 9,50],[canvas.width - 9,100],[x,y],ballRadius);
    for(let i = 0; i< 17; i++){
        ctx.lineTo(i%2 == 1 ? canvas.width + 10  : canvas.width - 10, 100 + (i*38));
        var circle = [x, y];    
        var hit = collide([i%2 == 1 ? canvas.width - 10  : canvas.width - 30 , 100 + (i*38)],[(i+1)%2 == 1 ? canvas.width - 10  : canvas.width - 30 , 100 + ((i+1)*38)], circle, ballRadius)
    if(hit == true){
         dy = -dy*0.8;        
         dx = -2*0.9;
    }
    }
    ctx.lineTo(canvas.width - 10,750)
    var hit = collide([canvas.width - 10,712],[canvas.width - 10,750],[x,y],ballRadius);
    if(hit == true){
        dy = -dy*0.8;        
        dx = -2*0.9;
   }

    ctx.lineWidth = 40;
    ctx.strokeStyle = '#00458E';
    ctx.stroke();
    ctx.closePath();
}

function drawLines(){
    var executed = false;
        if (executed === false) {
            executed = true;
            for(let i=0;i < 25;i++){
                for(let j=0;j<6;j++){
                    lineBalls(30 + (canvas.width-60)/7*(j+1) ,canvas.height,smallBallRadius,0,Math.PI*2, i,0);
                        if(distance(x, y, 30 + (canvas.width-60)/7*(j+1),canvas.height-(i * 1.5) ) < ballRadius+smallBallRadius){
                            dy = -dy*0.8;
                        if(canvas.width/7*(j+1)>x){
                            dx = -2*0.9;
                            dy * 0.65;
                        }else{
                            dx = 2*0.9;
                            dy * 0.65;
                        }
                    }
                }
            }
        }
  
}


let participation; 

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawLines();
    executeOnce();
    drawTriangles();
   
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        
        dy = 0;
        dx = 0;
          if(x < canvas.width/7 && x > 0){
            participation=3
        }
        if(x < 2*canvas.width/7 && x > canvas.width/7 ){
          participation=1
        }
        if(x < 3*canvas.width/7 && x > 2*canvas.width/7 ){
          participation=2
        }
        if(x < 4*canvas.width/7 && x > 3*canvas.width/7 ){
          participation=1
        }
        if(x < 5*canvas.width/7 && x > 4*canvas.width/7 ){
           participation=2
        }
        if(x < 6*canvas.width/7 && x > 5*canvas.width/7 ){
            participation=1
        }
        if(x < canvas.width && x > 6*canvas.width/7 ){
            participation=3
        }
        
        // console.log( canvas.height );
        
         var qr =  (window.location.search.match(new RegExp('[?&]' + 'qr' + '=([^&]+)')) || [, null])[1];

        $.ajax({
               type: "POST",
               url: 'https://heineken.above.ge/api/public/create',
               data: {
                 'participation': participation,
                 'qr': qr
               },
               success: function(data)
               {
                   
               }
        });
        return
        
    }else{
        if(clickCount == 2){
            dy += 0.4;
        }
    }
    
    x += dx;
    y += dy;
    
    
   
    requestAnimationFrame(draw)
}

function executeOnce() {

    var executed = false;
        if (executed === false) {
            executed = true;
            for(let i=0;i < 54;i++){
                if(i < 5){
                manyBalls(xx,yy,smallBallRadius,0,Math.PI*2, i,0)
                if(distance(x, y, xx+(i*70), yy) <= ballRadius+smallBallRadius){
                    dy = -dy*0.58;
                if(xx + (i*70)>x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }  
            }else if(i < 9){
                manyBalls(xx + 35,yy,smallBallRadius,0,Math.PI*2, i-5,50)
                if(distance(x, y, xx + 35 + ((i-5)*70), yy + 50) <=ballRadius+smallBallRadius){
                    dy = -dy*0.58;
                if(xx + 35 + ((i-5)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
            }
            else if(i < 14){
                manyBalls(xx ,yy,smallBallRadius,0,Math.PI*2, i - 9,100)
                if(distance(x, y, xx + ((i-9)*70), yy + 100) <= ballRadius + smallBallRadius){
                    dy = -dy*0.65;
                if(xx + ((i-9)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
            }else if(i < 18){
                manyBalls(xx + 35,yy,smallBallRadius,0,Math.PI*2, i - 14,150)
                if(distance(x, y, xx + 35 + ((i-14)*70), yy + 150) <= ballRadius+smallBallRadius){
                    dy = -dy*0.65;
                if(xx + 35 +((i-14)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
            }
            else if(i < 23){
                manyBalls(xx ,yy,smallBallRadius,0,Math.PI*2, i - 18,200)
                if(distance(x, y, xx + ((i-18)*70), yy + 200) <= ballRadius+smallBallRadius){
                    dy = -dy*0.65;
                if(xx + ((i-18)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
                
            }
            else if(i < 27){
                manyBalls(xx + 35,yy,smallBallRadius,0,Math.PI*2, i - 23,250)
                if(distance(x, y, xx + 35 + ((i-23)*70), yy + 250) <= ballRadius+smallBallRadius){
                    dy = -dy*0.78;
                if(xx + 35 + ((i-23)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
            }
            else if(i < 32){
                manyBalls(xx ,yy,smallBallRadius,0,Math.PI*2, i - 27,300)
                if(distance(x, y, xx + ((i-27)*70), yy + 300) <= ballRadius+smallBallRadius){
                    dy = -dy*0.65;
                if(xx + ((i-27)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
            }else if(i < 36){
                manyBalls(xx + 35,yy,smallBallRadius,0,Math.PI*2, i - 32,350)
                if(distance(x, y, xx + 35 + ((i-32)*70), yy + 350) <= ballRadius+smallBallRadius){
                    dy = -dy*0.65;
                if(xx + 35 + ((i-32)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
            }else if(i < 41){
                manyBalls(xx ,yy,smallBallRadius,0,Math.PI*2, i - 36,400)
                if(distance(x, y, xx + ((i-36)*70), yy + 400) <= ballRadius+smallBallRadius){
                    dy = -dy*0.65;
                if(xx + ((i-36)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
                
            }
            else if(i < 45){
                manyBalls(xx + 35,yy,smallBallRadius,0,Math.PI*2, i - 41,450)
                if(distance(x, y, xx + 35 + ((i-41)*70), yy + 450) <= ballRadius+smallBallRadius){
                    dy = -dy*0.65;
                if(xx + 35+ ((i-41)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
            }
            else if(i < 50){
                manyBalls(xx ,yy,smallBallRadius,0,Math.PI*2, i - 45,500)
                if(distance(x, y, xx + ((i-45)*70), yy + 500) <= ballRadius+smallBallRadius){
                    dy = -dy*0.65;
                if(xx + ((i-45)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }
            }else if(i < 54){
                manyBalls(xx + 35,yy,smallBallRadius,0,Math.PI*2, i - 50,550)
                if(distance(x, y, xx + 35 + ((i-50)*70), yy + 550) <= ballRadius+smallBallRadius){
                    dy = -dy*0.65;
                if(xx + 35 + ((i-50)*70) > x){
                    dx = -2*friction;
                    dy * 0.65;
                }else{
                    dx = 2*friction;
                    dy * 0.65;
                }
                }                
            }        
            }
        }
};

function lineBalls(x,y,radius,ragaca,Pi,iteracia,row){
        ctx.beginPath();
        ctx.arc( x, y - (iteracia * 1.5), radius, ragaca, Pi);
        ctx.fillStyle = "#00458E";
        ctx.fill();
        ctx.closePath();
}

function manyBalls(x,y,radius,ragaca,Pi,iteracia,row){
        ctx.beginPath();
        ctx.arc( x + (iteracia * 70), y + row, radius, ragaca, Pi);
        ctx.fillStyle = "#00458E";
        ctx.fill();
        ctx.closePath();
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

draw();