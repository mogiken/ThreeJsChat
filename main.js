//var milkcocoa = new MilkCocoa("https://vueiepllm5i.mlkcca.com/");
var milkcocoa = new MilkCocoa("vueiepllm5i.mlkcca.com");
/* your-app-id にアプリ作成時に発行される"io-"から始まるapp-idを記入します */
var chatDataStore = milkcocoa.dataStore("chat");
var textArea, board , myname;
window.onload = function(){
  textArea = document.getElementById("msg");
  board = document.getElementById("board");
  myname = document.getElementById("myname");
}

function clickEvent(){
  var text = textArea.value;
  var name = myname.value;
  sendText(text,name);
}

function sendText(text,name){
  console.log("now:"+name);
  chatDataStore.push({ "message" : text , "myname" : name },function(err,data){
    console.log("送信完了!");
    console.log(data.value);
    textArea.value = "";
  });
}

chatDataStore.on("push",function(data){
  var name = myname.value;
  //console.log(data.value);
  //console.log( data.value.myname+":"+data.value.message+":"+name);
  if(data.value.myname != name){
    console.log("自分以外のメッセージ"+data.value.message);
    draw3D(data.value.message);//3D描画
  }
  addText(data.value.message);
});

function addText(text){
  var msgDom = document.createElement("li");
  msgDom.innerHTML = text;
  board.insertBefore(msgDom, board.firstChild);
}
