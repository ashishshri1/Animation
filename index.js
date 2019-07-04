var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d');
// c.fillStyle='rgba(255,200,120,1)';
// c.fillRect(100,100,100,100);

// c.beginPath();
// c.moveTo(400,100);
// c.lineTo(400,200);
// c.lineTo(500,100);
// c.strokeStyle="red";
// c.stroke();

// for(var i=0;i<100;i++){
//     var x=Math.random()*window.innerWidth;
//     var y=Math.random()*window.innerHeight;
//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI*2,false);
//     var r=Math.random()*255;
//     var g=Math.random()*255;
//     var b=Math.random()*255;
//     c.strokeStyle='rgba('+r+","+g+","+b+",0.5)";
//     c.fillStyle='red';
//     c.stroke();
// }

var mouse={
    x:undefined,
    y:undefined
};
var maxRadius=40;
var minRadius=2;
var colorArray=[
    '#20303C',
    '#E57164',
    '#013D96',
    '#CE7C80',
    '#ED9C97',
];
window.addEventListener('mousemove',
function(event){
    mouse.x=event.x;
    mouse.y=event.y;

})

window.addEventListener('resize',
function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
})

function Circle(x,y,dx,dy,radius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
    }
    this.update=function(){
        if(this.x+this.radius>=innerWidth||this.x-this.radius<0)
        this.dx=-this.dx;
        if(this.y+this.radius>=innerHeight||this.y-this.radius<0)
        this.dy=-this.dy;
        this.x+=this.dx;
        this.y+=this.dy
        if(mouse.x-this.x<50 &&mouse.x-this.x>-50
            &&mouse.y-this.y<50&&mouse.y-this.y>-50)
        {
            if(this.radius<maxRadius)
            {
                this.radius+=1;
            }
        }
        else if(this.radius>this.minRadius)
        {
            this.radius-=1;
        }
        this.draw();
    }
}
var circleArray=[];
function init(){
    circleArray=[];
    for(var i=0;i<800;i++){
        var radius=Math.random()*3+2;
        var x=Math.random()*(innerWidth-radius*2)+radius;
        var y=Math.random()*(innerHeight-radius*2)+radius;
        var dx=(Math.random()-0.5)*5;
        var dy=(Math.random()-0.5)*5;
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}
init();
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}
animate();