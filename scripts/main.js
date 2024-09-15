let num_of_question = 10;
let current_num_of_question = 1;
let answerBinary = 0;
let answerValue;

// 画面の要素を取得
const TitleScreen = document.getElementById('TitleScreen');
const GameScreen = document.getElementById('GameScreen');
const JudgeScreen = document.getElementById('JudgeScreen');
const ResultScreen = document.getElementById('ResultScreen');

// ボタンの要素を取得
const StartButton = document.getElementById('StartButton');
const DeAgostiniButton = document.getElementById('DeAgostiniButton');
const HachetteButton = document.getElementById('HachetteButton');
const NextQuestionButton = document.getElementById('NextQuestionButton');
const BackToTitleButton = document.getElementById('BackToTitleButton');

const questionNumberElements = document.querySelectorAll('.QuestionNumber');

const AnswerSign = document.getElementById('AnswerSign')

// data.js
const data = [
    ['DeAgostini', 'ドゥ･アート'],
    ['DeAgostini', 'エア･クラフト'],
    ['DeAgostini', 'ロビ 再刊行版'],
    ['DeAgostini', 'ロビ'],
    ['DeAgostini', 'Magiki（マジキ） プリンセス'],
    ['DeAgostini', 'シーモンスターズ＆Co. ビッグ'],
    ['DeAgostini', 'Magiki（マジキ） こねこちゃん'],
    ['DeAgostini', 'シャーク＆Co.'],
    ['DeAgostini', 'Magiki (マジキ）ペンギン'],
    ['DeAgostini', 'Magiki (マジキ）マーメイド'],
    ['DeAgostini', 'イグアナ＆Co.'],
    ['DeAgostini', 'シーモンスターズ＆Co.'],
    ['DeAgostini', 'Among Us フィギュア キーチェーン 追放ver.'],
    ['DeAgostini', 'Among Us フィギュア キーチェーン'],
    ['DeAgostini', 'ミレニアムファルコン をつくる'],
    ['Hachette', '刺しゅうでつくる ピーターラビット™の世界'],
    ['Hachette', '装甲騎兵ボトムズ スコープドッグをつくる'],
    ['Hachette', '聯合艦隊旗艦 戦艦武蔵 ダイキャストギミックモデルをつくる'],
    ['Hachette', 'ラビット スーパーフローS601をつくる'],
    ['Hachette', '阪神タイガース実況CDマガジン'],
    ['Hachette', 'メタル・ギミックモデル バットモービル タンブラー'],
    ['Hachette', '宇宙戦艦ヤマト'],
    ['Hachette', '昭和落語名演 秘蔵音源CDコレクション'],
    ['Hachette', 'メタル・ギミックモデル 幻の豪華客船 タイタニック号をつくる'],
    ['Hachette', '週刊ガールズ＆パンツァーⅣ号戦車H型（D型改）をつくる']
]


// クリックイベントをそれぞれのボタンに設定
StartButton.addEventListener('click', function() {
    showScreen(GameScreen);
    current_num_of_question = 1;

    // 問題のランダム表示
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomRow = data[randomIndex];
    const selectedValue = randomRow[1];
    answerValue = randomRow[0];
    document.querySelectorAll('.QuestionTitle').forEach(function(element){
        element.textContent = `選ばれたデータ: ${selectedValue}`;
    })
});


DeAgostiniButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('DeAgostini')
});


HachetteButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('Hachette')
});


NextQuestionButton.addEventListener('click', function() {
    showScreen(ResultScreen);
    current_num_of_question +=1;
    if(current_num_of_question > num_of_question){
      showScreen(ResultScreen)
    }else{
      showScreen(GameScreen)
      updateQuestionNumber()

    //問題のランダム表示
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomRow = data[randomIndex];
      const selectedValue = randomRow[1];
      answerValue = randomRow[0];
      document.querySelectorAll('.QuestionTitle').forEach(function(element){
          element.textContent = `選ばれたデータ: ${selectedValue}`;
      })
    }
});


BackToTitleButton.addEventListener('click', function() {
    showScreen(TitleScreen);
})





// セクションを表示する関数
function showScreen(screen) {
    // すべてのセクションを非表示にする
    TitleScreen.classList.remove('active');
    GameScreen.classList.remove('active');
    JudgeScreen.classList.remove('active');
    ResultScreen.classList.remove('active');

    // 選択したセクションを表示する
    screen.classList.add('active');
}

function updateQuestionNumber() {
  questionNumberElements.forEach(function(element) {
      element.textContent = current_num_of_question;
  });
}


function judgeAnswer(publisher){
    if (answerValue == publisher){
        answerBinary = 1;
    }else{
        answerBinary = 0;
    }
    AnswerSign.textContent = `${answerBinary}`;
}
















