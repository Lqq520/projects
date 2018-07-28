var board = new Array();
var score = 0;
var hasConflicted =new Array();//判断碰撞的数组

$(document).ready(function() {
	newGame();
});

function newGame() {
	//初始化其棋盘
	init();
	//随机两个格子生成数字
	generateOneNumber();                   //随机生成一个数的函数，游戏最初需要两个数所有调用两次
    generateOneNumber();

}

function init() {
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-' + i + "-" + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
	}
	for(var i = 0; i < 4; i++) { //先把一维数组变成二维数组然后初始化
		board[i] = new Array();
		hasConflicted[i]= new Array();
		for(var j = 0; j < 4; j++)
			board[i][j] = 0;
			//hasConflicted[i][j]=false;
			
	}
	updateBoardView();
	score =0;
}


function updateBoardView() {
	$(".number-cell").remove(); //游戏开始之前的数据全部删掉
	for(var i = 0; i < 4; i++) 
		for(var j = 0; j < 4; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var theNumberCell = $('#number-cell-' + i + '-' + j);
		
		
			//判断是否为0 为0显示底层 不为 0 用number覆盖底层
			if(board[i][j] == 0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i, j) );
				theNumberCell.css('left', getPosLeft(i, j));
			} else {
				theNumberCell.css('width', '100px');
				theNumberCell.css('height', '100px');
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
			    theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
	hasConflicted[i][j]=false;
}
}
//产生一个随机数
function generateOneNumber(){
    if( noSpace(board))           // 格子已满，产生新数失败
        return false;
    //生成随机位置
    var randx = parseInt(Math.floor(Math.random()*4)); //parseInt是把浮点数转换为整形，randx是个坐标
    var randy = parseInt(Math.floor(Math.random()*4));
    // 判断位置是否可用
    
    while(true){                                        //死循环，知道找到空格子（即等于0）跳出循环
        if(board[randx][randy]==0)
            break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));

    }
    //人工找位置
//	for(var i = 0; i < 4; i++)
//		for(var j = 0; j < 4; j++){
//			if(board[i][j] == 0){ 
//				randx = i;
//				randy = j;
//			}
//		}
	
    
    
    //随机生成一个数字
    var randNumber = Math.random() < 0.8 ? 2:4;   //随机产生2和4
    board[randx][randy] = randNumber;
    showNumberAnimation(randx,randy,randNumber);  //通知前端产生新数并显示


    return true;           //格子未满，可以产生新数
}


$(document).keydown(function(event){
    switch (event.keyCode){
        case  65: //left 37  A
        	//判断能否向左移动
            if(moveLeft()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameOver()",300);
            }
            break;
        case 87://up  38 W
            if(moveUp()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameOver()",300);
            }
            break;
        case 68://right 39 D
            if(moveRight()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameOver()",300);
            }
            break;
        case  83://down  40 S
            if(moveDown()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameOver()",300);
            }
            break;
    }
});

function moveLeft(){
    if(!canMoveLeft(board))
        return false;
    
    for(var i=0; i<4; i++)  
        for(var j=1; j<4; j++){
            if(board[i][j] != 0){
                for(var k=0; k<j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board) ){
                        //move;
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;


                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //addScore;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;


                        continue;
                    }
                }
            }
        }
        //显示动画效果
    setTimeout("updateBoardView()",200);
    return true;
}


function moveUp(){
    if( !canMoveUp(board) ){
        return false;
    }
    //moveup
    for(var i=1; i<4; i++)
        for(var j=0; j<4; j++){
            if(board[i][j] != 0){
                for(var k=0; k<i; k++){
                    if(board[k][j] == 0 && noBlockVertical(j, k, i, board)){
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] =  board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[i][k]){
                        //move
                        //add
                        showMoveAnimation(i, j, k, j);
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //addScore
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }


                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}


function moveRight(){
    if( !canMoveRight(board) ){           //先判断能不能移动
        return false;
    }
    //moveright
    for(var i=0; i<4; i++)
        for(var j=2; j>=0; j--){
            if(board[i][j] != 0){
                for(var k=3; k>j; k--){
                    if( board[i][k] == 0 && noBlockHorizontal(i, j, k, board) ){
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;


                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
                        //move
                        //add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //addScore
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;


                        continue;
                    }
                }
            }
        }


    setTimeout("updateBoardView()",200);
    return true;
}


function moveDown(){
    if( !canMoveDown(board) ){
        return false;
    }
    //movedown   
    for(var i=2; i>=0; i--)
        for(var j=0; j<4; j++){
            if(board[i][j] != 0){
                for(var k=3; k>i; k--){
                    if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;




                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[i][k]){
                        //move
                        //add
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //addScore
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;


                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function isGameOver(){
    if( noSpace(board) && noMove(board))
        gameOver();
}


function gameOver(){
    alert("游戏结束！请重新开始！");
    newGame();
}
