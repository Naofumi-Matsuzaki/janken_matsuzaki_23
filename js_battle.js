'use strict';

//変数を定義する
let bet_declaration; //宣言したBETする★の数
let bet = parseInt(bet_declaration);  //賭ける★の数
let star_you = 5;  //プレイヤーの★の数
let star_cpu = 5;  //CPUの★の数
let hand_you_r = 3;    //プレイヤーのグーの残り枚数
let hand_you_s = 3;    //プレイヤーのチョキの残り枚数
let hand_you_p = 3;    //プレイヤーのパーの残り枚数
let hand_cpu_r = 3;    //CPUのグーの残り枚数
let hand_cpu_s = 3;    //CPUのチョキの残り枚数
let hand_cpu_p = 3;    //CPUのパーの残り枚数
let hand_left = hand_cpu_r + hand_cpu_s + hand_cpu_p; //残りの手札枚数合計
let deal_you;  //プレイヤーの選んだ手（1:グー,2:チョキ,3:パー）
let deal_cpu;  //CPUの選んだ手（1:グー,2:チョキ,3:パー）
let judge = (deal_you - deal_cpu + 3) % 3;  //勝敗判定用の変数
let concl; // 決着の結果（勝ち or 負け）を保存する変数
let debt = 1000; // 最初の借金
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const hour = now.getHours();
const min = now.getMinutes();
const dateNtime = `${year}/${month}/${date} ${hour}:${min}`; // ページを読み込んだ日時を取得
let obj = {'concl':concl, 'debt':debt}; // 後で使う用にオブジェクト形式で変数を設定??
console.log(obj);


// 賭け金を宣言する
function declare(){ //掛け金を宣言する関数を定義
    bet_declaration = window.prompt("クク…いくつ賭けるか宣言せよ…");
    bet = parseInt(bet_declaration); //数値変換
    if(Number.isInteger(bet) && bet > 0 && bet <= star_you){ //1~手持ち★数の整数かどうか
    console.log("BET=" + bet);
    document.getElementById("judge_comment").textContent = `★ ${bet}個をBET中…`;
    document.getElementById("judge_comment2").textContent = "自分の手を選べっ…！" 
    document.getElementById("deal_you").src = "./img/card_back.jpg";
    document.getElementById("deal_cpu").src = "./img/card_back.jpg";
    if(Number.isInteger(bet) && bet ==star_you){ // フルでBETした場合、画像が表示される
        popupImg_bet();
    }
    } else{
        bet_declaration = window.alert("バカっ…！己の状況をよく見ろっ…！");
        declare(); // 関数呼び出して繰り返し（自己参照できるのね！）
    }
}
$("#bet").on("click", declare); // クリックイベントで関数呼び出し

// 自分の手を選ぶ、使った手が減る
function choice_rock(){ //手を選択する関数を定義。グー
    if(hand_you_r == 0){
        window.alert("バカっ…！己の状況をよく見ろっ…！");
    } else {
        hand_you_r -= 1;
        console.log("あなたの手はグー");
        console.log("あなたのグーは残り"+ hand_you_r);
        deal_you = 1;
        document.getElementById("handleft_you_r").textContent = `${hand_you_r}`;
        document.getElementById("judge_comment2").textContent = "[OPEN]を押せっ…！";
        document.getElementById("deal_you").src = "./img/rock.jpg";
    }
}
function choice_scissors(){ //手を選択する関数を定義。チョキ
    if(hand_you_s == 0){
        window.alert("バカっ…！己の状況をよく見ろっ…！");
    } else {
        hand_you_s -= 1;
        console.log("あなたの手はチョキ");
        console.log("あなたのチョキは残り"+ hand_you_s);
        deal_you = 2;
        document.getElementById("handleft_you_s").textContent = `${hand_you_s}`;
        document.getElementById("judge_comment2").textContent = "[OPEN]を押せっ…！";
        document.getElementById("deal_you").src = "./img/scissors.jpg";
    }
}
function choice_paper(){ //手を選択する関数を定義。パー
    if(hand_you_p == 0){
        window.alert("バカっ…！己の状況をよく見ろっ…！");
    } else {
        hand_you_p -= 1;
        console.log("あなたの手はパー");
        console.log("あなたのパーは残り"+ hand_you_p);
        deal_you = 3;
        document.getElementById("handleft_you_p").textContent = `${hand_you_p}`;
        document.getElementById("judge_comment2").textContent = "[OPEN]を押せっ…！";
        document.getElementById("deal_you").src = "./img/paper.jpg";
    }
}
$("#rock_you").on("click", choice_rock); //クリックイベントで呼び出し
$("#scissors_you").on("click", choice_scissors); //クリックイベントで呼び出し
$("#paper_you").on("click", choice_paper); //クリックイベントで呼び出し

// 相手の手を選ぶ、相手の手が減る、勝敗がつく、★が移動する、決着を判定する
function open(){ // 相手の手を選ぶ、減らす、表示する関数
    if(hand_cpu_r == 0 && hand_cpu_s == 0){  // パーしか残ってない場合、自動でパー
        deal_cpu = 3;
    } else if(hand_cpu_r == 0 && hand_cpu_p == 0){ // チョキしか残ってない場合、自動でチョキ
        deal_cpu = 2;
    } else if(hand_cpu_s == 0 && hand_cpu_p == 0){ //グーしか残ってない場合、自動でグー
        deal_cpu = 1;
    } else if(hand_cpu_r == 0){ // グーのみが0枚の場合
        deal_cpu = Math.ceil(Math.random()*2) + 1; // グー以外が選択される
    } else if(hand_cpu_s == 0){ // チョキのみが0枚の場合
        deal_cpu = Math.ceil(Math.random()*1)*2 + 1; // チョキ以外が選択される
    } else if(hand_cpu_p == 0){ // パーのみが0枚の場合
        deal_cpu = Math.ceil(Math.random()*2); // パー以外が選択される
    } else {
        deal_cpu = Math.ceil(Math.random()*3); // グーチョキバーすべてが1枚以上残っているときは3つランダム
    }
    console.log("相手の手は"+ deal_cpu);
    switch(deal_cpu){ // switch文でif文よりもスマートに記述
        case 1:
            hand_cpu_r -= 1;
            document.getElementById("deal_cpu").src = "./img/rock.jpg";
            document.getElementById("handleft_cpu_r").textContent = "??"; // ゲームを難しくするために非表示に`${hand_cpu_r}`
            console.log("相手のグーは残り"+ hand_cpu_r);
            break;
        case 2:
            hand_cpu_s -= 1;
            document.getElementById("deal_cpu").src = "./img/scissors.jpg";
            document.getElementById("handleft_cpu_s").textContent = "??"; // ゲームを難しくするために非表示に`${hand_cpu_s}`
            console.log("相手のチョキは残り"+ hand_cpu_s);
            break;
        case 3:
            hand_cpu_p -= 1;
            document.getElementById("deal_cpu").src = "./img/paper.jpg";
            document.getElementById("handleft_cpu_p").textContent = "??"; // ゲームを難しくするために非表示に`${hand_cpu_p}`
            console.log("相手のパーは残り"+ hand_cpu_p);
            break;
    }
    judge = (deal_you - deal_cpu + 3) % 3 // 変数judgeを得る
    console.log("Judge = "+ judge);
}
function judgement (){ // 勝敗判定の関数を定義
    hand_left = hand_cpu_r + hand_cpu_s + hand_cpu_p;
    if(hand_left >0 && judge == 1){  // 負けた場合
        document.getElementById("judge_comment").textContent = "ざまみろっ…！";
        document.getElementById("judge_comment2").textContent = "続けるなら[BET]を押せっ…！";
        star_you -= bet;
        star_cpu += bet;
        console.log("自分の★は"+ star_you);
        console.log("相手の★は"+ star_cpu);
        document.getElementById("star_you").textContent = `× ${star_you}`;
        document.getElementById("star_cpu").textContent = `× ${star_cpu}`;
        if(star_you > 0){ // このif文によって、「決着」イベントと「勝敗」イベントとの競合を排除（当初ぐちゃぐちゃだった…）
            popupImg_lose(); // 負けのポップアップ表示
        }
    } else if(hand_left >0 && judge == 2){ // 勝った場合
        document.getElementById("judge_comment").textContent = "やりおるっ…！";
        document.getElementById("judge_comment2").textContent = "続けるなら[BET]を押せっ…！";
        star_you += bet;
        star_cpu -= bet;
        console.log("自分の★は"+ star_you);
        console.log("相手の★は"+ star_cpu);
        document.getElementById("star_you").textContent = `× ${star_you}`;
        document.getElementById("star_cpu").textContent = `× ${star_cpu}`;
        if(star_cpu > 0){ // このif文によって、「決着」イベントと「勝敗」イベントとの競合を排除（当初ぐちゃぐちゃだった…）
            popupImg_win(); // 勝ちのポップアップ表示
        }
    } else if(hand_left >0 && judge == 0){  // あいこの場合
        document.getElementById("judge_comment").textContent = "命拾いしたなっ…！";
        document.getElementById("judge_comment2").textContent = "続けるなら[BET]を押せっ…！";
        console.log("自分の★は"+ star_you);
        console.log("相手の★は"+ star_cpu);
    }
}
function conclusion(){ // 決着を宣言する関数を定義
    hand_left = hand_cpu_r + hand_cpu_s + hand_cpu_p;
    if(star_you <= 0){ // プレイヤーの★が尽きた場合
        document.getElementById("judge_comment").textContent = "貴様の負けだっ・・・！";
        document.getElementById("judge_comment2").textContent = "這えっ・・・！";
        document.getElementById("insert").src = "./img/insert/concl_lose.jpg";
        $("#insert_box").show(8000);
        window.alert("あなたは負けました。")
        concl = '負け';
        debt += (5 - star_you)*100; // ★1つにつき100万円
        localStorage.setItem(dateNtime, concl);
        // localStorage.setItem(dateNtime, JSON.stringify(obj));
        console.log(debt);
    } else if(star_cpu <= 0){ // 相手の★が尽きた場合
        document.getElementById("judge_comment").textContent = "ヒィィ・・・！";
        document.getElementById("judge_comment2").textContent = "儂が負けるとは・・・";
        document.getElementById("insert").src = "./img/insert/concl_win_3.jpg";
        $("#insert_box").show(8000);
        window.alert("あなたは勝ちました。")
        concl = '勝ち';
        debt += (5 - star_you)*100; // ★1つにつき100万円
        localStorage.setItem(dateNtime, concl);
        // localStorage.setItem(dateNtime, JSON.stringify(obj));
        console.log(debt);
    } else if(hand_left == 0 && star_you < star_cpu){ // 手札が尽きた場合：プレイヤーの負け
        document.getElementById("judge_comment").textContent = "貴様の負けだっ・・・！";
        document.getElementById("judge_comment2").textContent = "這えっ・・・！";
        document.getElementById("insert").src = "./img/insert/concl_lose.jpg";
        $("#insert_box").show(8000);
        window.alert("あなたは負けました。")
        concl = '負け';
        debt += (5 - star_you)*100; // ★1つにつき100万円
        localStorage.setItem(dateNtime, concl);
        // localStorage.setItem(dateNtime, JSON.stringify(obj));   
        console.log(debt);
    } else if(hand_left == 0 && star_cpu <= star_you){ // 手札が尽きた場合：プレイヤーの勝ち
        document.getElementById("judge_comment").textContent = "ヒィィ・・・！";
        document.getElementById("judge_comment2").textContent = "儂が負けるとは・・・";
        document.getElementById("insert").src = "./img/insert/concl_win_3.jpg";
        $("#insert_box").show(8000);
        window.alert("あなたは勝ちました。")
        concl = '勝ち';
        debt += (5 - star_you)*100; // ★1つにつき100万円
        localStorage.setItem(dateNtime, concl);
        // localStorage.setItem(dateNtime, JSON.stringify(obj));
        console.log(debt);
    }
}


function judgeEvent(){ // 関数を組み合わせて、オープンから勝敗判定、決着までの一連の流れを作る
    open();
    judgement();
    setTimeout(conclusion, 1500); // 決着判定は一瞬の間を溜めることで風情を演出
}
$("#open").on("click", judgeEvent); //クリックイベントで一連の関数を呼び出す

// タイマーの実装
let lifespan = 91; // タイマーの時間設定変数（秒）
function recalc(){
    if(lifespan > 0){
        lifespan -= 1;
        let sec = lifespan % 60;
        let min = Math.floor((lifespan/60) % 60);
        let lifespan_left = `${min}分${sec}秒`;
        document.getElementById("countdown").textContent = lifespan_left;
        refresh(); // refresh関数を実行
    } else { // 残り時間がなくなった場合
        document.getElementById("countdown").textContent = "0...";
        window.alert("時間切れ。あなたは負けました。");
        document.getElementById("insert").src = "./img/insert/concl_lose.jpg";
        $("#insert_box").show(6000);
        concl = '負け';
        debt += (5 - star_you)*100; // ★1つにつき100万円
        localStorage.setItem(dateNtime, concl);
        // localStorage.setItem(dateNtime, JSON.stringify(obj));
        console.log(debt);
    }
}
function refresh(){ // 1秒後にrecalc関数を実行
    if(star_you > 0 && star_cpu > 0 && hand_left > 0){ // 決着がつかない限りタイマーは作動する
        setTimeout(recalc, 1000);
    }
}
recalc(); // 関数の実行（画面読込時に発動）


// 画像ポップアップの実装
// => 画像データ配列を定義、画像入替関数を定義、画像表示＆非表示関数を定義、ポップアップ関数を定義

// 画像データ配列を定義
const imgData_bet = ["./img/insert/bet_0.jpg","./img/insert/bet_1.jpg","./img/insert/bet_2.jpg","./img/insert/bet_3.jpg","./img/insert/bet_4.jpg","./img/insert/bet_5.jpg"];
const imgData_lose = ["./img/insert/judge_lose_0.jpg","./img/insert/judge_lose_1.jpg","./img/insert/judge_lose_2.jpg","./img/insert/judge_lose_3.jpg","./img/insert/judge_lose_4.jpg","./img/insert/judge_lose_5.jpg","./img/insert/judge_lose_6.jpg","./img/insert/judge_lose_7.jpg","./img/insert/judge_lose_8.jpg","./img/insert/judge_lose_9.jpg","./img/insert/judge_lose_10.jpg","./img/insert/judge_lose_11.jpg"];
const imgData_win = ["./img/insert/judge_win_0.jpg","./img/insert/judge_win_1.jpg","./img/insert/judge_win_2.jpg","./img/insert/judge_win_3.jpg"];
let imgNum =0;

function choseImg_bet(){ //画像入替の関数を定義（BET）
    imgNum = Math.floor(Math.random()*6);
    console.log(imgNum);
    document.getElementById("insert").src = imgData_bet[imgNum];
}
function choseImg_lose(){ //画像入替の関数を定義（LOSE）
    imgNum = Math.floor(Math.random()*12);
    console.log(imgNum);
    document.getElementById("insert").src = imgData_lose[imgNum];
}
function choseImg_win(){ //画像入替の関数を定義（WIN）
    imgNum = Math.floor(Math.random()*4);
    console.log(imgNum);
    document.getElementById("insert").src = imgData_win[imgNum];
}
function showImg(){ //画像表示＆非表示の関数を定義（共通部品）
    $("#insert_box").show(2000);
    function hideImg(){
        $("#insert_box").hide(1000);
    }
    setTimeout(hideImg, 2500);
}
function popupImg_bet(){ //ポップアップ関数を定義（BET）
    choseImg_bet();
    showImg();
}
function popupImg_lose(){ //ポップアップ関数を定義（LOSE）
    choseImg_lose();
    showImg();
}
function popupImg_win(){ //ポップアップ関数を定義（WIN）
    choseImg_win();
    showImg();
}
