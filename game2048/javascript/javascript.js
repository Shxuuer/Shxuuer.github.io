$(document).ready(function () {
    //初始化数组
    let tableSize = 4;
    let nums = [];
    initList();
    //用于保存鼠标点击的位置
    var startX, startY;
    //表格是否已经填满,游戏是否结束，游戏得分
    let isFulled = 0,isFail = 0,score = 0;
    //初始化图表
    getRandNum();
    //按下鼠标时，按照位置差值计算移动方式
    $("#gameTable").mousedown(function (e) {
        startX = e.pageX;
        startY = e.pageY;
    }).mouseup(function (e) {
        if ($(this) === $("#leftTableList *")) {
            return;
        }
        if (!isFail) {
            if (Math.abs(startX - e.pageX) > Math.abs(startY - e.pageY)) {
                if (startX > e.pageX) {
                    goNow("left");
                    $("#actionType").text("操作状态:left");
                } else {
                    goNow("right");
                    $("#actionType").text("操作状态:right");
                }
            } else {
                if (startY > e.pageY) {
                    goNow("up");
                    $("#actionType").text("操作状态:up");
                } else {
                    goNow("down");
                    $("#actionType").text("操作状态:down");
                }
            }
            getFullStatus();
            getFail();
            getRandNum();
        }
    });

    //重新开始
    $("#restart").click(function (e) {
        let temp = $("#tableNumber").val();
        if (temp > 1) {
            if (temp > 10)alert("图表过大可能无法正常显示!");
            tableSize = temp;
            $(".thisTable").empty();
            score = 0;
            initList();
            isFail = 0;
            isFulled = 0;
            getRandNum();
        }else alert("请输入大于1的数");
    });

    //初始化nums数组,初始化表格
    function initList() {
        for (let i = 0; i < tableSize; ++i) {
            let newNums = [];
            for (let j = 0; j < tableSize; ++j) {
                newNums[j] = 0;
            }
            nums[i] = newNums;
        }
        for (let i = 0; i < tableSize; i++) {
            let newTr = document.createElement("tr");
            $(".thisTable").append(newTr);
            for (let j = 0; j < tableSize; ++j) {
                let newTd = document.createElement("td");
                newTd.className = ("r" + (i + 1) + "d" + (j + 1));
                $(".thisTable tr:nth-child(" + (i + 1) + ")").append(newTd);
            }
        }
    }

    //获取每一个元素临近数值，判断游戏是否结束
    function getFail() {
        if (isFulled) {
            for (let i = 0; i < - 1; ++i) {
                for (let j = 0; j < tableSize - 1; ++j) {
                    if (nums[i][j] == nums[i][j + 1]) {
                        return;
                    }
                }
            }
            for (let i = 0; i < - 1; ++i) {
                for (let j = 0; j < tableSize - 1; ++j) {
                    if (nums[i][j] == nums[i + 1][j]) {
                        return;
                    }
                }
            }
            isFail = 1;
            alert("你输了");
        }
    }

    //获取表格是否填满
    function getFullStatus() {
        isFulled = 1;
        for (let i = 0; i < tableSize; ++i) {
            for (let j = 0; j < tableSize; ++j) {
                if (nums[i][j] === 0) {
                    isFulled = 0;
                }
            }
        }
    }

    //数组随机注入数字
    function getRandNum() {
        if (!isFulled) {
            score += 2;
            $("#score").text("得分:" + score);
            while (true) {
                let randX = Math.floor(Math.random() * tableSize), randY = Math.floor(Math.random() * tableSize);
                if (nums[randX][randY] === 0) {
                    nums[randX][randY] = 2;
                    break;
                }
            }
        }
        drawPicture();
    }

    //在屏幕上绘制图案
    function drawPicture() {
        for (let i = 0; i < tableSize; ++i) {
            for (let j = 0; j < tableSize; ++j) {
                let temp = $(".r" + (i + 1) + "d" + (j + 1));
                if (nums[i][j] !== 0) {
                    temp.text(nums[i][j]);
                } else {
                    temp.text("");
                }
            }
        }
    }

    //将thisnums中相邻且相等的数合并
    function mergeThisList(thisnums, numberCount) {
        for (let j = 0; j < numberCount - 1; ++j) {
            if (thisnums[j] === thisnums[j + 1]) {
                thisnums[j] = thisnums[j] * 2;
                thisnums[j + 1] = 0;
            }
        }
        return thisnums;
    }

    function getNewList(action,i) {
        let thisnums = [];
        let numberCount = 0;
        //将这一列不为零的数复制到thisnums中
        for (let j = 0; j < tableSize; ++j) {
            if (action === "up" || action === "down") {
                if (nums[j][i] !== 0) {
                    thisnums[numberCount] = nums[j][i];
                    numberCount++;
                }
            } else {
                if (nums[i][j] !== 0) {
                    thisnums[numberCount] = nums[i][j];
                    numberCount++;
                }
            }
        }
        thisnums = mergeThisList(thisnums, numberCount);
        //将这一列归为0
        for (let j = 0; j < tableSize; ++j) {
            if (action === "up" || action === "down") {
                nums[j][i] = 0;
            } else {
                nums[i][j] = 0;
            }
        }
        return [thisnums, numberCount];
    }

    function goNow(action) {
        for (let i = 0; i < tableSize; ++i) {
            let returnResult = getNewList(action,i);
            //将不为0的数复制到nums中
            let thisNumberCount = 0;
            for (let j = 0; j < returnResult[1]; ++j) {
                if (returnResult[0][j] !== 0 && (action === "left" || action === "up")) {
                    if (action === "left") {
                        nums[i][thisNumberCount] = returnResult[0][j];
                    } else {
                        nums[thisNumberCount][i] = returnResult[0][j];
                    }
                    thisNumberCount++;
                }
                if (returnResult[0][returnResult[1] - 1 - j] !== 0 && (action === "right" || action === "down")) {
                    if (action === "right") {
                        nums[i][tableSize - 1 - thisNumberCount] = returnResult[0][returnResult[1] - 1 - j];
                    } else {
                        nums[tableSize - 1 - thisNumberCount][i] = returnResult[0][returnResult[1] - 1 - j];
                    }
                    thisNumberCount++;
                }
            }
        }
    }
});