var game={
    data:[],    //二维数组，存放每格当前的值,可以这样声明二维？
    status:0,    //当前状态
    STARTING:1,
    ENDING:0,
    rowCount:4,
    colCount:4,
    score:0,    //总分数
    countOfZero:16,  // 0的个数
    //判断是否已经游戏结束了
    isGameOver:function () {
      if(!this.isFull()){
          return false;
      }else{
         return !this.haveSameNumBetweenNeighbour();
      }
    },
    haveSameNumBetweenNeighbour:function () {
        for(var i=0;i<this.rowCount;i++){
            for(var j=0;j<this.colCount;j++) {
              if(i!==this.rowCount-1){
                  if(this.data[i][j]===this.data[i+1][j]){
                      return true;
                  }
              }
              if(j!==this.colCount-1){
                  if(this.data[i][j]===this.data[i][j+1]){
                      return true;
                  }
              }
            }
        }
        return false;
    },
    //判断是否已经满格了
    isFull:function () {
      for(var i=0;i<this.rowCount;i++){
          for(var j=0;j<this.colCount;j++){
              if(this.data[i][j]===0){
                  return false;
              }
          }
      }
      return true;
    },
    gamebegin:function () {
       this.status=this.STARTING;   //赋值当前状态为开始状态。表示游戏开始
        $("#gameOver").hide();
        this.data=[//初始化二维数组
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
        this.score=0; //重置分数为0
        this.randomNum();
        this.randomNum();
        this.updateView();


    },
    //在panel里面生成随机的一个位置，值为2或4
    randomNum:function () {
        if(!this.isFull()) {
            while (true) {

                var i = parseInt(Math.random() * this.rowCount);
                var j = parseInt(Math.random() * this.rowCount);
                if (this.data[i][j] === 0) {
                    this.data[i][j] = Math.random() < 0.5 ? 2 : 4;
                    this.countOfZero--;
                    break;
                }
            }
        }
    },
    //根据data数组中的数据，去更新panel
    updateView:function () {
        for(var i=0;i<this.rowCount;i++){
            for(var j=0;j<this.colCount;j++){
                var curCell="#c"+i+j;
                var curr=this.data[i][j]; //当前元素值
                //注意dom本身的方法和jq的方法的区别！
                var div=document.getElementById("c"+i+j);
                div.className= curr!==0?"cell n"+curr:"cell";
                $(curCell).html(this.data[i][j]===0?"":this.data[i][j]).fadeIn();

            }
        }
        $("#score").html(this.score);
        //若游戏结束
        if(this.isGameOver()){
            this.status=this.ENDING;
            $("#finalScore").html(this.score);
            $("#gameOver").show();
        }

    },

    moveLeft:function () {
        var tmpZero=this.data.toString();
        for(var k=0;k<this.rowCount;k++) {
            var tmp=this.move(this.data[k]);
           for(var d=0;d<this.colCount;d++){
               this.data[k][d]=tmp[d];
           }
        }
        if(this.data.toString()!==tmpZero){
            this.randomNum();
        }
        this.updateView();
    },

    moveRight:function () {
        var tmpZero=this.data.toString();
        for(var k=0;k<this.rowCount;k++) {
            var tmp=this.move(this.data[k].reverse());
            tmp=tmp.reverse();
            for(var d=0;d<this.colCount;d++){
                this.data[k][d]=tmp[d];
            }
        }
        if(this.data.toString()!==tmpZero){
            this.randomNum();
        }
        this.updateView();
    },

    moveTop:function () {
        var tmpZero=this.data.toString();
        for(var k=0;k<this.colCount;k++) {
            var tmp=this.move(this.getColNum(k));
            for(var d=0;d<this.colCount;d++){
                this.data[d][k]=tmp[d];
            }
        }
        if(this.data.toString()!==tmpZero){
            this.randomNum();
        }
        this.updateView();
    },


    //向下移动
    moveDown:function () {
        var tmpZero=this.data.toString();
        for(var k=0;k<this.colCount;k++) {
            var tmp=this.move(this.getColNum(k).reverse());
            tmp=tmp.reverse();
            for(var d=0;d<this.colCount;d++){
                this.data[d][k]=tmp[d];
            }
        }
        if(this.data.toString()!==tmpZero){
            this.randomNum();
        }
        this.updateView();
    },


    //得到每一列形成的数组
    getColNum:function (k) {
        var tmp=new Array(4);
        for(var i=0;i<this.rowCount;i++){
            tmp[i]=this.data[i][k];
        }
        return tmp;
    },

    //转换一个数组，左移变成新的数组。
    move:function ( nums) {
        var i = 0, j = 1, count = 0;
        var tmp=[0,0,0,0];
        while (i < this.colCount && j < this.colCount) {
            if (nums[i] === 0) {
                i++;
                j++;
            } else {
                if (nums[j] === 0) {
                    j++;
                } else {
                    if (nums[i] === nums[j]) {
                        tmp[count++] = 2 * nums[i];
                        this.score+=tmp[count-1];
                        i = j + 1;
                        j = i + 1;
                    } else {
                        tmp[count++] = nums[i];
                        i = j;
                        j = i + 1;
                    }
                }
            }
        }
        if (i < this.colCount) {
            tmp[count++] = nums[i];
        }
        return tmp;
    },

    //是否为左右移动都无效的情况
    isRowAllFull:function () {
        for(var i=0;i<this.rowCount;i++) {
            if(!this.isRowZero(this.data[i])||!this.isRowFull(this.data[i])){
                return false;
            }
        }
        return true;
    },
    //判断该行是否全为0.
    isRowZero:function (num) {
       for(var i=0;i<this.rowCount;i++) {
           if(num[i]!==0){
               return false;
           }
       }
       return true;
    },
     //判断该行是否全满.
    isRowFull:function (num) {
        for(var i=0;i<this.rowCount;i++) {
            if(num[i]===0){
                return false;
            }
        }
        return true;
    },

    Algorithm1:function () {
        var currentString=game.data.toString();
        while(game.status===game.STARTING){
            var cnt=Math.random();
            if(cnt>=0&&cnt<0.5){
                game.moveRight();
                if(game.data.toString()===currentString){
                    game.moveLeft();
                }
            }else {
                game.moveDown();
                if(game.data.toString()===currentString){
                    game.moveLeft();
                }
            }
            if(game.isRowAllFull()){
                game.moveTop();
                game.moveDown();
            }
            currentString=game.data.toString();
        }
    },
    Algorithm2:function () {
        while (game.status === game.STARTING) {
            var cnt = Math.random();
            if (cnt >= 0 && cnt < 0.25) {
                game.moveRight();
            } else if (cnt >= 0.25 && cnt < 0.5) {
                game.moveLeft();
            } else if (cnt >= 0.5 && cnt < 0.75) {
                game.moveTop();
            } else {
                game.moveDown();
            }
        }
    },
}


window.onload=function () {
    game.gamebegin();
    //game.Algorithm1();
    document.onkeydown=function (ev) {
        if(game.status==game.STARTING){
            var e=window.event||arguments[0];
            if(e.keyCode===37){
                game.moveLeft();
            }else if(e.keyCode===39){
                game.moveRight();
            }else if(e.keyCode===38){
                game.moveTop();
            }else if(e.keyCode===40){
                game.moveDown();
            }
        }else if(game.status==game.ENDING){
            var e=window.event||arguments[0];
            if(e.keyCode===13){
                game.gamebegin();
            }
        }
    }
};