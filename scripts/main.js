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



// クリックイベントをそれぞれのボタンに設定
StartButton.addEventListener('click', function() {
    showScreen(GameScreen);
});
DeAgostiniButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
});
HachetteButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
});
NextQuestionButton.addEventListener('click', function() {
    showScreen(ResultScreen);
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
