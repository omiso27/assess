'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

// ボタンを押した時の処理
assessmentButton.addEventListener( 
  'click',
  // function () {
  () => {
    //診断結果表示エリアの作成
    const userName = userNameInput.value;
    // ガード句　関数の上の方に多い。特殊なケースなどを事前に弾く
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }

    // 診断結果表示エリアの作成
    // 結果の中身を空にする。→連続して診断結果が出てしまわないようにする
    resultDivision.innerText = '';
    // // h3タグを作成する
    // const heading = document.createElement('h3');
    // // h3タグの中身の文章を設定する
    // heading.innerText = '診断結果';
    // // div小要素として追加
    // resultDivision.appendChild(heading);

    // // pタグを作成する
    // const paragraph = document.createElement('p');
    // // 診断結果の文章を作る
    // const result = assessment(userName);
    // // pタグの中身の文章を設定する
    // paragraph.innerText = result;
    // // divタグの子要素として表示する
    // resultDivision.appendChild(paragraph);

    // headerDivision の作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    // JSで作成したHTMLのタグに属性を追加するときは、setAttributeを使うことができる。
    // setAttribute('属性名' , '属性の値');

    // bodyDivision の作成
    const bodyDivision =document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に BootStrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivisonとbodyDivisonとresultDivisonに差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // ツイートエリアの作成　プログラムからHTMLのタグを作成
    // ツイートのdivタグの中身を空にしてる。
    tweetDivision.innerText = '';
    
    // documentは、Webで使えるJSの機能。HTMLのタグのことをJSではElementという。
    const anchor = document.createElement('a');
    // URLに日本語を使うことは本来であればできない。（最近は賢くなってできるようになってきてるけど、、裏で日本語を数値に変換してる）
    // →厳密にするためにURLの中でエンコードしましょう！
    const hrefValue = 'https://x.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    // setAttributeは属性を作成する。createElementは要素を作る。
    // <a href = 'https://x.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw'>
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class','twitter-hashtag-button');
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    // tweet-areaの子要素に追加される。
    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);

  }
)

userNameInput.addEventListener(
  'keydown',
  (event) => {
    console.log(event.code)
    if (event.code === 'Enter') {
      // Enterが押された時に実行する処理
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

// マルチカーソルの使い方を覚えましょう。
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる

  // 名前の合計値を計算します。
  let sumOfCharCode = 0;
  for(let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回数の数で割ってanswersの添え字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  // ###userName### をユーザの名前に置き換える
  result = result.replaceAll('###userName###', userName);

  return result;
}

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  console.log(assessment('太郎'));

  console.log('太郎');
  console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('次郎');
  console.assert(
    assessment('次郎') === '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('花子');
  console.assert(
    assessment('花子') === '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('診断結果の文書のテスト終了');
}