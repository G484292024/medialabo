
// 課題3-2 のプログラムはこの関数の中に記述すること
function print(data) {
  
  console.log(data.name);
  console.log(data.coord.lon);
  console.log(data.coord.lat);
  console.log(data.weather[0].description);
  console.log(data.main.temp_min);
  console.log(data.main.temp_max);
  console.log(data.main.humidity);
  console.log(data.wind.speed);
  console.log(data.wind.deg);

}

// 課題5-1 の関数 printDom() はここに記述すること
function printDom(data) { 

  let r = document.querySelector('div#result');
  r.remove();
  let rs = document.querySelector('style');
  rs.remove();

  const cs = ['日本国','中国人民共和国','アメリカ合衆国','アメリカ合衆国','ロシア連邦','シンガポール共和国','オーストラリア連邦','エジプト・アラブ共和国','南アフリカ共和国','イギリス','フランス共和国','ブラジル連邦共和国'];

  let ns = [
    { name: '都市名'    , data: data.name },
    { name: '経度'      , data: data.coord.lon },
    { name: '緯度'      , data: data.coord.lat },
    { name: '天気'      , data: data.weather[0].description },
    { name: '最低気温'   , data: data.main.temp_min },
    { name: '最高気温'   , data: data.main.temp_max },
    { name: '湿度'      , data: data.main.humidity },
    { name: '風速'      , data: data.wind.speed },
    { name: '風向'      , data: data.wind.deg }
  ];

  let i = 0;
  let s = document.querySelector('select#country');
  let idx = s.selectedIndex;  //h idx 番目の option が選択された

  let visual = document.querySelector('div#visual');
  let div = document.createElement('div');
  visual.insertAdjacentElement('beforeend',div);
  div.setAttribute('id','result');

  let table = document.createElement('table');
  div.insertAdjacentElement('beforeend',table);

  table = document.querySelector('table');
  let thead = document.createElement('thead');
  table.insertAdjacentElement('beforeend',thead);

  table = document.querySelector('table');
  let tbody = document.createElement('tbody');
  table.insertAdjacentElement('beforeend',tbody);

  thead = document.querySelector('thead');
  let th = document.createElement('th');
  thead.insertAdjacentElement('beforeend',th);
  th.textContent = cs[idx-1];

  for (let n of ns){

  tbody = document.querySelector('tbody');
  let tr = document.createElement('tr');
  tbody.insertAdjacentElement('beforeend',tr);
  tr.setAttribute('id','ns'+i);

  let p = document.querySelector('tr#ns'+i);
  th = document.createElement('th');
  p.insertAdjacentElement('beforeend',th);
  th.textContent = ns[i].name;
  th.setAttribute('scope','row');
  let td = document.createElement('td');
  p.insertAdjacentElement('beforeend',td);
  td.textContent = ns[i].data;

  i = i+1;

  }

  let head = document.querySelector('head');
  let style = document.createElement('style');
  head.insertAdjacentElement('beforeend',style);
  style.textContent = '.parent {display: grid;place-items: center;}'

  head = document.querySelector('head');
  style = document.createElement('style');
  head.insertAdjacentElement('beforeend',style);
  style.textContent = '.card {display: block;position: relative;margin: 15px auto;padding: 10px 0;width: 500px;background: #f1f1f1;}'

  head = document.querySelector('head');
  style = document.createElement('style');
  head.insertAdjacentElement('beforeend',style);
  style.textContent = '.visual {display: grid;background: #f1f8ff;box-shadow: 0px 0px 0px 10px #f1f8ff;border: dashed 2px #668ad8;border-radius: 9px;margin-left: 10px;margin-right: 10px;margin-top: 30px;margin-bottom: 15px;padding: 0.5em 0.5em 0.5em 2em;aspect-ratio: 16/9;}'

  head = document.querySelector('head');
  style = document.createElement('style');
  head.insertAdjacentElement('beforeend',style);
  style.textContent = 'h1{display: inline-block;position: relative;box-sizing: border-box;padding: 10px;margin: 0 0 0 -20px;width: calc(100% + 20px);font-size: 22px;color: white;background: #70a6ff;box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);}'

  head = document.querySelector('head');
  style = document.createElement('style');
  head.insertAdjacentElement('beforeend',style);
  style.textContent = 'h1::before{position: absolute;content: \'\';top: 100%;left: 0;border: none;border-bottom: solid 15px transparent;border-right: solid 20px #6081b7;}'

  head = document.querySelector('head');
  style = document.createElement('style');
  head.insertAdjacentElement('beforeend',style);
  style.textContent = 'select{margin-top: 20px;margin-left: 5px;place-items: center;}'

}

// 6-1 のイベントハンドラ登録処理は以下に記述




// 課題6-1 のイベントハンドラ sendRequest() の定義
function sendRequest() {

  s = document.querySelector('select#country');
  idx = s.selectedIndex;  //h idx 番目の option が選択された

  let os = s.querySelectorAll('option');  // s の子要素 option をすべて検索
  let o = os.item(idx);   // os の idx 番目の要素

  let url = 'https://www.nishita-lab.org/web-contents/jsons/openweather/'+o.value+'.json';

  // 通信開始
  axios.get(url)
   .then(showResult)  // 通信成功
   .catch(showError)  // 通信失敗
   .then(finish);     // 通信の最後の処理

}

// 課題6-1: 通信が成功した時の処理は以下に記述
function showResult(resp) {

  // サーバから送られてきたデータを出力
  let data = resp.data;

  // dataが文字列型なら、オブジェクトに変換する
  if ( typeof data === 'string' ){
    data = JSON.parse(data);
  }

  printDom(data);

}

// 課題6-1: 通信エラーが発生した時の処理
function showError(err) {
    console.log(err);
}

// 課題6-1: 通信の最後にいつも実行する処理
function finish() {
    console.log('Ajax 通信が終わりました');
}

function showSelectResult() {

  console.log('選択された ' + idx + ' 番目の option の情報:');
  console.log('  value=' + o.getAttribute('value'));  // id 属性を表示
  console.log('  textContent='+o.textContent);
}

let b = document.querySelector('button#search'); 
b.addEventListener('click', sendRequest);