let totalCounter = 1;
let flag = 0;
let startTime;
let endTime;
const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

let answerString = getAnswerString();

const coloringString = function () {

    if (flag === 0) {
        let inputValue = document.getElementById("text-enter").value;
        let flag2 = 0;
        //例外処理1 アルファベット以外の文字が含まれていたらアラートを出す
        for (const element of inputValue) {
            if (!alphabets.includes(element)) {
                alert("You can enter only alphabets.");
                flag2 = 1;
                break;
            }
        }

        //例外処理2　文字数が5文字でなかったらアラートを出す
        if (flag2 === 0 && inputValue.length !== 5) {
            alert("You should enter just 5 letters.");
            flag2 = 1;
        }

        //入力された文字列がアルファベット5文字だった場合
        if (flag2 === 0) {

            if (totalCounter === 1) {
                startTime = performance.now();
            }

            //入力が5回終わっていない場合の処理
            inputValue = inputValue.toLowerCase();

            for (let i = 0; i < 5; i++) {
                document.getElementById(`Letter${totalCounter}${i + 1}`).textContent = inputValue[i];

                if (inputValue[i] === answerString[i]) {
                    //文字と順番の両方が合っている場合の処理
                    document.getElementById(`Letter${totalCounter}${i + 1}`).style.backgroundColor = "#00FF00";
                } else if (answerString.includes(inputValue[i])) {
                    //文字のみ合っている場合の処理
                    document.getElementById(`Letter${totalCounter}${i + 1}`).style.backgroundColor = "#FFFF00";
                } else {
                    //文字も順番も合っていない場合の処理
                    document.getElementById(`Letter${totalCounter}${i + 1}`).style.backgroundColor = "#888888";
                }
            }
            totalCounter++;
            document.getElementById("text-enter").value = "";

            if (inputValue === answerString) {
                //入力文字列が正解文字列に一致した場合の処理
                endTime = performance.now();
                document.getElementById("message").textContent = "😍Congratulations! Push Restart button for a new game!😍";
                document.getElementById("time").textContent = `Clear time: ${timeMeasure(startTime, endTime)}`;
                flag = 1;
            }

            if (totalCounter === 6) {
                //入力が5回終わっている場合の処理
                flag = 1;
                document.getElementById("message").textContent = "😭Try again! Push Restart button for a new game!😭";
            }

        }
    } else if (flag === 1) {
        alert("Push Restart button for a new game!");
    }
};

const clear = function () {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            document.getElementById(`Letter${i + 1}${j + 1}`).textContent = "";
            document.getElementById(`Letter${i + 1}${j + 1}`).style.backgroundColor = "initial";
        }
    }
    document.getElementById("text-enter").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("time").textContent = "";
    totalCounter = 1;
    flag = 0;
    answerString = getAnswerString();
}

const btnOK = document.getElementById("OK");
btnOK.addEventListener("click", coloringString);

const btnReset = document.getElementById("Restart");
btnReset.addEventListener("click", clear);

/**
 * 
 * @param {number} start 開始時間(ミリ秒)
 * @param {*} end 終了時間(ミリ秒)
 * @returns {string} 時間：分：秒の時間を表す文字列
 */
function timeMeasure(start, end) {
    let time = end - start;
    time = Math.floor(time / 1000);
    const hour = Math.floor(time / (60 * 60));
    const minute = Math.floor((time - hour * 60 * 60) / 60);
    const second = time - hour * 60 * 60 - minute * 60;

    const timeArray = [hour, minute, second];
    const timeStringArray = [];
    timeArray.forEach(function (element) {
        if (element < 10) {
            timeStringArray.push(`0${element}`);
        } else {
            timeStringArray.push(`${element}`);
        }
    });
    return `${timeStringArray[0]}:${timeStringArray[1]}:${timeStringArray[2]}`;
}

/**
 * 
 * @returns answerStringArrayに格納されている任意の文字列を返す
 */
function getAnswerString() {
    const answerStringArray = ["mouse", "april", "march", "print", "knife"];
    const answerString = answerStringArray[Math.floor(Math.random()*answerStringArray.length)];
    return answerString;
}