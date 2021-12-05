'use strict';




//clear クリックイベント
$(".btn_clear").on("click",function(){
    window.alert("破産しました。");
    localStorage.clear();
    $("#records").empty();
});

//ページ読み込み：保存データ取得表示
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    //一覧表示に追加
    const html = '<tr><td>'+key+'</td><td>'+value+'</td><td>'+ debt +'</td></tr>';
    $("#records").append(html);
}

