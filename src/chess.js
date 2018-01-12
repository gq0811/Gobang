var chess={
    data:[],    //二维数组，存放每格当前的值,可以这样声明二维？
    status:0,    //当前状态
    STARTING:1,
    ENDING:0,
    rowCount:15,
    colCount:15,
    countOfSteps:255,
    isWhite:true,
    canvas:"",
    context:"",
    //游戏开始
    gamebegin:function () {
        for(var i=0;i<this.rowCount;i++){
            this.data[i]=new Array(15);
            for(var j=0;j<this.colCount;j++){
                this.data[i][j]=0;
            }
        }
        //开始画棋盘，这里为什么不能用jQuery？
        this.context=document.getElementById("canvas").getContext("2d");
        var curContext=this.context;
        curContext.fillStyle = '#83d0f2';
        curContext.fillRect(0, 0, 1024, 768);
        curContext.fillStyle = '#FFFFFF';
        curContext.font = '40px Arial';
        curContext.fillText('五子棋', 330, 50);
        curContext.strokeRect(790, 140, 120, 30);
        curContext.fillStyle = '#FFFFFF';
        curContext.font = '20px Arial';
        curContext.fillText('再来一局', 810, 162);
        for(var i=1;i<16;i++){
            curContext.beginPath();
            curContext.moveTo(40*i+140,80);
            curContext.lineTo(40*i+140,640);
            curContext.closePath();
            curContext.stroke();
            curContext.beginPath();
            curContext.moveTo(180,40+40*i);
            curContext.lineTo(740,40+40*i);
            curContext.closePath();
            curContext.stroke();
        }
    },

    play:function (event) {
        var x=event.clientX;
        var y=event.clientY;
        if(x>=180&&x<=740&&y>=80&&y<=640){
            var i=parseInt((x-180)/40,10);  //数组的索引位置
            var j=parseInt((y-80)/40,10);
            if(this.data[i][j]===0) {
                this.data[i][j] = (this.isWhite === true) ? 1 : 2;
                this.drawChess(i,j);
            }
        }else if(x>=790&&x<=910&&y>=140&&y<=170){
            this.gamebegin();
        }

    },

    drawChess:function (i,j) {
        var x=180 + i * 40;
        var y=80 + j * 40;
        var color=(this.isWhite===true)?"white":"black";
        var curContext=this.context;
        curContext.fillStyle=color;
        curContext.beginPath();
        curContext.arc(x,y,15,0,Math.PI*2,true);
        curContext.closePath();
        curContext.fill();
        //判断是否赢了
        if(this.isWin(i,j)){
            alert(color+"赢了！");
        }
        this.isWhite=!this.isWhite;
        //清除上面的区域，重新画。
        curContext.clearRect(790, 140, 120, 30);
        curContext.fillStyle = '#FFFFFF';
        curContext.font = '40px Arial';
        curContext.fillText(this.isWhite===true?'白棋走':"黑棋走", 330, 50);
        curContext.strokeRect(790, 140, 120, 30);
        if(--this.countOfSteps==0){
            alert("平局")
        }
    },

    isWin:function (x,y) {
         return  this.lrWin(x,y)||this.tbWin(x,y)||this.slashWin(x,y)||this.reverseSlashWin(x,y);
    },
    //水平方向是否可以赢
    lrWin:function (x,y) {
        var i=x-1;
        var count=0;
        while(i>=0&&this.data[i][y]==this.data[x][y]){
            count++;
            i--;
        }
        i=x+1;
        while(i<this.rowCount&&this.data[i][y]==this.data[x][y]){
            count++;
            i++;
        }
        return count+1>=5?true:false;
    },

    //竖直方向是否可以赢
    tbWin:function (x,y) {
        var i=y-1;
        var count=0;
        while(i>=0&&this.data[x][i]==this.data[x][y]){
            count++;
            i--;
        }
        i=y+1;
        while(i<this.colCount&&this.data[x][i]==this.data[x][y]){
            count++;
            i++;
        }
        return count+1>=5?true:false;
    },

    //  '\'方向是否可以赢
    slashWin:function (x,y) {
        var i=x-1;
        var j=y-1;
        var count=0;
        while(i>=0&&j>=0&this.data[i][j]==this.data[x][y]){
            count++;
            i--;
            j--;
        }
        i=x+1;
        j=y+1;
        while(i<this.rowCount&&j<this.colCount&this.data[i][j]==this.data[x][y]){
            count++;
            i++;
            j++;
        }
        return count+1>=5?true:false;
    },

    //  '/'方向是否可以赢
    reverseSlashWin:function (x,y) {
        var i=x+1;
        var j=y-1;
        var count=0;
        while(i<this.rowCount&&j>=0&this.data[i][j]==this.data[x][y]){
            count++;
            i++;
            j--;
        }
        i=x-1;
        j=y+1;
        while(i>=0&&j<this.colCount&this.data[i][j]==this.data[x][y]){
            count++;
            i--;
            j++;
        }
        return count+1>=5?true:false;
    },

}

window.onload=function () {
  chess.gamebegin();

};
