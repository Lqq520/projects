function getPosTop(i,j){
	return 20 + i *120;
}
function getPosLeft(i,j){
	return 20 + j *120;
}

function getNumberBackgroundColor(number){
    switch (number){
        case 2:return "#eee4da"; break;
        case 4:return "#ede0c8"; break;
        case 8:return "#f2b179"; break;
        case 16:return "#59563"; break;
        case 32:return "#f67c5f"; break;
        case 64:return "#f65e3b"; break;
        case 128:return "#edcf72"; break;
        case 256:return "#edcc61"; break;
        case 512:return "#9c0"; break;
        case 1024:return "#33b5e5"; break;
        case 2048:return "#09c"; break;
        case 4096:return "#a6c"; break;
        case 8192:return "#93c"; break;
    }
    return "black";
}


function getNumberColor(number) {
    if(number <= 4){
        return "#776e65";
    }
    return "white";
}
//找棋盘上的空间
function noSpace(board){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            if(board[i][j]==0)
                return false;    //返回false说明还有空的格子
        }
    return true;               //如果返回true说明16个空格都满了


}
function canMoveLeft(board){
    for(var i=0; i<4; i++)
    //坐标从1列开始便利
        for(var j=1; j<4; j++){
            if(board[i][j] !== 0){
                if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
                    return true;
            }


        }
    return false;
}
function canMoveRight(board){
    for(var i=0; i<4; i++)
        for(var j=2; j>=0; j--){
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;
            }
        }
    return false;
}

function canMoveUp(board){
    for(var i=1; i<4; i++)
        for(var j=0; j<4; j++){
            if(board[i][j] != 0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;
                }
            }
    return false;
}


function canMoveDown(board){
    for(var i=2; i>=0; i--)
        for(var j=0; j<4; j++){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                    return true;
            }
        }
    return false;
}
//向左向右移动时判断 水平方向是否有障碍物
function noBlockHorizontal(row, col1, col2, board){
    for(var i=col1+1; i<col2; i++){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
} 
// 上下移动时  判断竖直方向是否有障碍物
function noBlockVertical(col, row1, row2, board){
    for(var i=row1+1; i<row2; i++){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}
//判断能否移动
function noMove (board) {
    if( canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) ||canMoveRight(board))
        return false;  
    return true;//不能上下左右的移动
}



