let amout_of_question = 10;
let current_num_of_question = 1;
let answerBinary = 0;
let answerValue = '';
let num_of_correct = 0;
let gamediffeculty = 0;
let gamemode = 'TwoChoice';

// 画面の要素を取得
const TitleScreen = document.getElementById('TitleScreen');
const GameScreenForTwoChoice = document.getElementById('GameScreenForTwoChoice');
const GameScreenForPriceComparison = document.getElementById('GameScreenForPriceComparison');
const GameScreenForPublishFrequency = document.getElementById('GameScreenForPublishFrequency');
const GameScreenForForTicTacTo = document.getElementById('GameScreenForForTicTacTo');
const JudgeScreen = document.getElementById('JudgeScreen');
const ResultScreen = document.getElementById('ResultScreen');

// ボタンの要素を取得
const StartButton = document.getElementById('StartButton');

const DeAgostiniButton = document.getElementById('DeAgostiniButton');
const HachetteButton = document.getElementById('HachetteButton');

const morethanButton = document.getElementById('morethanButton')
const equalButton = document.getElementById('equalButton')
const lessthanButton = document.getElementById('lessthanButton')

const ButtonMonthly = document.getElementById('ButtonMonthly')
const ButtonBiweekly = document.getElementById('ButtonBiweekly')
const ButtonWeekly = document.getElementById('ButtonWeekly')
const ButtonTwoInWeek = document.getElementById('ButtonTwoInWeek')

const NextQuestionButton = document.getElementById('NextQuestionButton');
const BackToTitleButton = document.querySelectorAll('.BackToTitleButton');

const questionNumberElements = document.querySelectorAll('.QuestionNumber');
const AnswerSign = document.getElementById('AnswerSign')
const NumOfCorrect = document.querySelectorAll('.NumOfCorrect')


// common buttons
StartButton.addEventListener('click', function() {
    const NumOfQuestion = document.getElementById("NumOfQuestion");
    amout_of_question = parseInt(NumOfQuestion.value, 10);

    const GameDifficulty = document.getElementById("GameDifficulty");
    gamediffeculty = parseInt(GameDifficulty.value, 10);

    const GameMode = document.getElementById("GameMode");
    gamemode = GameMode.value;

    current_num_of_question = 1;
    updateQuestionNumber()

    console.log(gamemode)

    if(gamemode == 'TwoChoice'){
        showScreen(GameScreenForTwoChoice);
    }else if(gamemode=='PriceComparison'){
        showScreen(GameScreenForPriceComparison)
    }else if(gamemode=='PablishFreqency'){
        showScreen(GameScreenForPublishFrequency)
    }else if(gamemode=='TicTacToe'){
        showScreen(GameScreenForForTicTacTo)
    }
});

BackToTitleButton.forEach(BackToTitleButton =>{
    BackToTitleButton.addEventListener('click', function() {
        if (window.confirm('タイトルに戻る？')){
            showScreen(TitleScreen);
            num_of_correct = 0;
            NumOfCorrect.forEach(function(element){
                element.textContent = `${0}`
            })
        }else{
            // DO NOTHING
        }
    })
})

NextQuestionButton.addEventListener('click', function() {
    current_num_of_question +=1;
    if(current_num_of_question > amout_of_question){
        showScreen(ResultScreen)
    }else{
        updateQuestionNumber()
        randomQustioner()
        
        if(gamemode == 'TwoChoice'){
            showScreen(GameScreenForTwoChoice);
        }else if(gamemode=='PriceComparison'){
            showScreen(GameScreenForPriceComparison)
        }else if(gamemode=='PablishFreqency'){
            showScreen(GameScreenForPublishFrequency)
        }else if(gamemode=='TicTacToe'){
            showScreen(GameScreenForForTicTacTo)
        }
    }
});


// Two Choice
DeAgostiniButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('DeAgostini');
    writeNumOfCorrect();
});

HachetteButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('Hachette');
    writeNumOfCorrect();
});


// Price comparison
morethanButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('>');
    writeNumOfCorrect();
});

equalButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('=');
    writeNumOfCorrect();
});

lessthanButton.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('<');
    writeNumOfCorrect();
});


// Publish Frequency
ButtonMonthly.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('月刊');
    writeNumOfCorrect();
});

ButtonBiweekly.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('隔週刊');
    writeNumOfCorrect();
});

ButtonWeekly.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('週刊');
    writeNumOfCorrect();
});

ButtonTwoInWeek.addEventListener('click', function() {
    showScreen(JudgeScreen);
    judgeAnswer('週二回');
    writeNumOfCorrect();
});

// tic tac toe

// nothing





// Functions

// セクションを表示する関数
function showScreen(screen) {
    // すべてのセクションを非表示にする
    TitleScreen.classList.remove('active');
    ResultScreen.classList.remove('active');
    GameScreenForForTicTacTo.classList.remove('active');
    GameScreenForPriceComparison.classList.remove('active');
    GameScreenForPublishFrequency.classList.remove('active');
    GameScreenForTwoChoice.classList.remove('active');
    JudgeScreen.classList.remove('active');

    // 選択したセクションを表示する
    screen.classList.add('active');
}

function updateQuestionNumber() {
  questionNumberElements.forEach(function(element) {
      element.textContent = current_num_of_question;
  });
}


function writeNumOfCorrect(){
    num_of_correct += answerBinary;
    NumOfCorrect.forEach(function(element){
        element.textContent = `${num_of_correct}`
    })
}


function judgeAnswer(answerInput){
    if (answerValue == answerInput){
        answerBinary = 1;
    }else{
        answerBinary = 0;
    }
    AnswerSign.textContent = `${answerBinary}`;
}



function randomQustioner(){
    const randomIndex = Math.floor(Math.random() * dataForPablishFreqency.length);
    const randomRow = dataForPablishFreqency[randomIndex];
    const selectedValue1 = randomRow[1];
    const selectedValue2 = randomRow[2];

    if(gamemode == 'TwoChoice'){
        const randomIndex = Math.floor(Math.random() * dataForTwoChoice.length);
        const randomRow = dataForTwoChoice[randomIndex];
        const selectedValue1 = randomRow[1];
        const selectedValue2 = randomRow[2];
        answerValue = randomRow[0];
        document.querySelectorAll('.QuestionTitle').forEach(function(element){
            element.textContent = `題名: ${selectedValue1}`;
        })
        if(gamediffeculty == 1){
            document.querySelectorAll('.QuestionDescription').forEach(function(element){
                element.textContent = `説明: ${selectedValue2}`;
            })
        }else{
            document.querySelectorAll('.QuestionDescription').forEach(function(element){
                element.textContent = ``;
        })}

    }else if(gamemode=='PriceComparison'){
        // RIGHT ROW
        const randomIndex_R = Math.floor(Math.random() * dataForPriceComparison.length);
        const randomRow_R = dataForPriceComparison[randomIndex_R];
        const selectedPrice_R = randomRow_R[3];
        const numPrice_R = Number(selectedPrice_R);
        const selectedValue1_R = randomRow_R[2];
        const selectedValue2_R = randomRow_R[5];
        document.querySelectorAll('.QuestionTitle_R').forEach(function(element){
            element.textContent = `題名: ${selectedValue1_R}`;
        });

        // LEFT ROW
        const randomIndex_L = Math.floor(Math.random() * dataForPriceComparison.length);
        const randomRow_L = dataForPriceComparison[randomIndex_L];
        const selectedPrice_L = randomRow_L[3];
        const numPrice_L = Number(selectedPrice_L);
        const selectedValue1_L = randomRow_L[2];
        const selectedValue2_L= randomRow_L[5];
        document.querySelectorAll('.QuestionTitle_L').forEach(function(element){
            element.textContent = `題名: ${selectedValue1_L}`;
        });

        if(gamediffeculty == 1){
            document.querySelectorAll('.QuestionDescription_R').forEach(function(element){
                element.textContent = `説明: ${selectedValue2_R}`;
            });
            document.querySelectorAll('.QuestionDescription_L').forEach(function(element){
                element.textContent = `説明: ${selectedValue2_L}`;
            });
        }else{
            document.querySelectorAll('.QuestionDescription_R').forEach(function(element){
                element.textContent = ``;
            });
            document.querySelectorAll('.QuestionDescription_L').forEach(function(element){
                element.textContent = ``;
            });
        }

        if (numPrice_R > numPrice_L){
            answerValue = '>'
        }else if(numPrice_R == numPrice_L){
            answerValue = '='
        }else if(numPrice_R < numPrice_L){
            answerValue = '<'
        }

    }else if(gamemode=='PublishFreqency'){
        const randomIndex = Math.floor(Math.random() * dataForPublishFreqency.length);
        const randomRow = dataForPublishFreqency[randomIndex];
        const selectedValue1 = randomRow[2];
        const selectedValue2 = randomRow[3];
        answerValue = randomRow[1];
        document.querySelectorAll('.QuestionTitle').forEach(function(element){
            element.textContent = `題名: ${selectedValue1}`;
        })
        if(gamediffeculty == 1){
            document.querySelectorAll('.QuestionDescription').forEach(function(element){
                element.textContent = `説明: ${selectedValue2}`;
            })
        }else{
            document.querySelectorAll('.QuestionDescription').forEach(function(element){
                element.textContent = ``;
        })}

    }else if(gamemode=='TicTacToe'){
        if (window.confirm('未実装です')){
            showScreen(TitleScreen);
            num_of_correct = 0;
            NumOfCorrect.forEach(function(element){
                element.textContent = `${0}`
            })
        }else{
            // DO NOTHING
        }
    }
}










// function randomQustionerForTwoChoice(){
//     const randomIndex = Math.floor(Math.random() * dataForTwoChoice.length);
//     const randomRow = dataForTwoChoice[randomIndex];
//     const selectedValue1 = randomRow[1];
//     const selectedValue2 = randomRow[2];
//     answerValue = randomRow[0];
//     document.querySelectorAll('.QuestionTitle').forEach(function(element){
//         element.textContent = `題名: ${selectedValue1}`;
//     })
//     if(gamediffeculty == 1){
//         document.querySelectorAll('.QuestionDescription').forEach(function(element){
//             element.textContent = `説明: ${selectedValue2}`;
//         })
//     }else{
//         document.querySelectorAll('.QuestionDescription').forEach(function(element){
//             element.textContent = ``;
//     })}
// }


// function randomQustionerForPriceComparison(){
//     if (window.confirm('未実装です')){
//         showScreen(TitleScreen);
//         num_of_correct = 0;
//         NumOfCorrect.forEach(function(element){
//             element.textContent = `${0}`
//         })
//     }else{
//         // DO NOTHING
//     }

//     const random_RIndex = Math.floor(Math.random() * dataForPriceComparison.length);
//     const random_RRow = dataForPriceComparison[random_RIndex];
//     const selectedValue_R1 = random_RRow[1];
//     const selectedValue_R2 = random_RRow[2];
// }


// function randomQustionerForPablishFreqency(){
//     if (window.confirm('未実装です')){
//         showScreen(TitleScreen);
//         num_of_correct = 0;
//         NumOfCorrect.forEach(function(element){
//             element.textContent = `${0}`
//         })
//     }else{
//         // DO NOTHING
//     }




// }

// function randomQustionerForTicTacToe(){
//     if (window.confirm('未実装です')){
//         showScreen(TitleScreen);
//         num_of_correct = 0;
//         NumOfCorrect.forEach(function(element){
//             element.textContent = `${0}`
//         })
//     }else{
//         // DO NOTHING
//     }
// }

// function randomQustionerFor(){

// }








const dataForPriceComparison = [
 ['DeAgostini', '月刊', 'トランスフォーマー オプティマスプライムをつくる', '1,990', '7,999', '映画『トランスフォーマー』（2007）に登場した オプティマスプライムを あなたの手で組み立てる！ 本シリーズでは金属パーツと ABSパーツを使って、サイバトロンの伝説的なヒーロー「オプティマスプライ'],
 ['DeAgostini', '週刊', 'SUBARU BRZ GT300', '490', '1,999', '2021 Super GT GT300 Class シリーズチャンピオンマシンを あなたの手で組み立てよう!!'],
 ['DeAgostini', '隔週刊', '日本の名馬・名勝負', '490', '1,899', '日本競馬史上に残る名馬たちの蹄跡を DVDとマガジンで完全収録! '],
 ['DeAgostini', '隔週刊', 'ワイルド・スピード カー コレクション', '990', '2,999', '大スクリーンを疾走したあのキャストのあの車が、1/43スケールモデルになって大集合！コレクションする車は、各作品の名場面の記憶を呼び覚ます象徴的な車ばかり。'],
 ['DeAgostini', '隔週刊', 'あぶない刑事 DVDコレクション', '490', '1,999', ' TVシリーズ2作品、TVSP1作品、 劇場7作品を初のHDリマスター版で コレクション!  今シリーズでは、“あぶデカ”シリーズDVD初のHDリマスター版で本編が楽しめるほか、豪華特典映像も満載。 '],
 ['DeAgostini', '週刊', 'ホンダCB750FOUR再刊行版', '490', '1,999', '圧倒的な完成度を誇る究極のディスプレイモデル  重厚感のある金属パーツ     ステンレス製のカットフェンダーやダイキャスト製のクランクケースなど、実車の質感を表現するために、金属パーツを多数使用。 '],
 ['DeAgostini', '週刊', 'エヴァンゲリオン初号機をつくる', '290', '990', 'マガジンとパーツで組み立てる 新劇場版の設定を徹底的に考証して立体化した圧倒的なクオリティの《エヴァ初号機》  キットに付いてくるドライバーと瞬間接着剤、そして毎 号付属の塗装済みパーツでエヴァ初号機を'],
 ['DeAgostini', '隔週刊', 'ルパン三世 THE DVD コレクション', '490', '1,599', '日本のアニメ史上を代表する作品［ルパン三世］。 初回放送から50年以上が経ったいまでも色褪せない驚きを放つ 作品のPART 1～Ⅲ、TVスペシャルから24作品を、全80号の 隔週刊［ルパン三世 THE'],
 ['DeAgostini', '隔週刊', '決定版 日本の名城', '290', '799', '文化遺産として、また観光スポットとして、近年ますます人気を高めている「日本の城」。 本シリーズではブームの火付け役となった「日本100名城」「続日本100名城」の全200名城を詳細 に取り上げます。'],
 ['DeAgostini', '隔週刊', 'Gメン’75 DVDコレクション', '499', '1,699', 'DVDとマガジンで鮮烈によみがえる 刑事ドラマの永遠の金字塔  滑走路を並び行くGメンたちの印象的なオープニング、 他の刑事ドラマにはないハードなシナリオと切れ味の鋭い演出、 そして迫真の演技でドラマ'],
 ['DeAgostini', '隔週刊', '鉄道車両金属モデルコレクション', '2,990', '7,499', '高精度＆大型の先頭車模型と 詳細なマガジンで楽しむ あなただけの鉄道車両ミュージアム。  金属モデルの手応えを味わいながら、 尽きない物語に思いを馳せるー     日本各地の鉄路を駆けた時代時代の人気'],
 ['DeAgostini', '隔週刊', '東宝怪獣コレクション', '990', '2,699', 'キングギドラ、メカゴジラ、ヘドラ、ガイガン、ラドン！作品と時代を超えて、怪獣たちをラインナップ！  昭和・平成の時代を通じて東宝が生み出し、人々を魅了してきた怪獣たち。 隔週刊『東宝怪獣コレクション』'],
 ['DeAgostini', '週刊', 'ワイルド・スピード 日産スカイラインGT-R（R34）', '490', '1,999', '日産スカイラインGT-R（R34）はユニバーサル・ピクチャーズの『ワイルド・スピード』シリーズで、数あるカーアクションのなかでも最も印象的なシーンに 登場する主役級の一台。スピードと卓越したパフォーマン'],
 ['DeAgostini', '隔週刊', 'ブルーノート・ベスト・ジャズコレクション 高音質版', '490', '1,599', '『BLUE NOTE best jazz collection』では毎号１人のアーティストを取り上げ て、その生き様や〈ブルーノート〉での活躍、〈ブルーノート〉の歴史を 紐解いていく。付属のCDは今ま'],
 ['DeAgostini', '隔週刊', 'JR全路線 DVDコレクション', '499', '1,599', '駅や路線ヒストリーを解説する本誌と、貴重な撮り下ろし映像満載のDVDでお届けするDVD付きマガジン。  北海道から九州までのJR全路線を特集し、現存する車両だけでなく廃止された列車や、起点駅から終着駅'],
 ['DeAgostini', '隔週刊', 'HELLO KITTY なつかしのアイテムコレクション', '399', '1,649', '隔週刊 『HELLO KITTYなつかしのアイテムコレクション』 毎号、70年代から90年代の発売商品を再現したハローキティのアイテムが1つ付きます。  創刊号は、1975年に発売したハローキティのデ'],
 ['DeAgostini', '隔週刊', '男はつらいよDVDコレクション', '599', '1,599', '隔週刊「男はつらいよDVDコレクション」は、国民的人気作「男はつらいよ」全50作をコンプリートできるDVD付きマガジンです。DVDは映像も音もクリアな〈HDリマスター版〉を使用し、マガジンも盛りだくさ'],
 ['DeAgostini', '隔週刊', 'スター・ウォーズ スターシップ＆ビークル・コレクション', '990', '3,290', '本シリーズでは、スター・デストロイヤーや戦艦などの大型軍用船に、 スターファイターや爆撃機、さらに貨物船や輸送機、シャトル機に加えて、 地上や危険地帯で活動するスターシップやビークルを紹介する。 映画'],
 ['DeAgostini', '隔週刊', 'アメリカンカー コレクション', '690', '1,990', '古き良き憧れのアメ車がここに集結! ダイキャスト製ミニチュアコレクション 1960~1970年代を中心とした憧れのアメ車たち全80種を、1/43スケールでリアルに再現したダイキ ャスト製ミニチュアでコレ'],
 ['DeAgostini', '隔週刊', 'メタルヒーロー DVDコレクション', '490', '1,499', '地球と人類のために戦う宇宙刑事の活動記録がついに登場!隔週刊『メタルヒーロー DVDコレクション』創刊 「メタルヒーローシリーズ」初期3作品をテレビ放映順に完全収 録した、隔週刊『メタルヒーロー DVD'],
 ['DeAgostini', '隔週刊', '日本の名車コレクション', '790', '1,990', 'だれもが憧れた日本の名車たちが1/64スケールで蘇る\u3000隔週刊『日本の名車コレクション』創刊1/64統一スケールのダイキャスト製モデルと、貴重な資料を満載したマガジンでお届けする、隔週刊『日本の名車コレ'],
 ['DeAgostini', '隔週刊', 'たのしい つまみ細工', '399', '1,155', '必要な道具もセットで初心者でも日本の伝統工芸を楽しめる 隔週刊『たのしい つまみ細工』創刊\u3000隔週刊『たのしい つまみ細工』は、小さな布をピンセットでつまみ、ボンドで貼るだけのシンプルな作業で、初心者の'],
 ['DeAgostini', '隔週刊', 'ディズニー マジカル オーディオ えほん', '290', '1,639', '目と耳でディズニーの名作をたのしむ、知育に最適なオーディオブック ディズニーの人気キャラクターのフィギュアを専用スピーカーに乗せると、プロの声優による朗読で、ディズニーの不朽の名作の物語を目と耳で楽し'],
 ['DeAgostini', '隔週刊', '必殺シリーズDVDコレクション', '899', '1,599', 'ハードボイルド時代劇の金字塔「必殺シリーズ」と劇場版をDVDとマガジンで楽しむ 本シリーズは、「必殺仕掛人」から「必殺剣劇人」までの21シリーズに加えて、劇場版も収 録。マガジンでは、毎号付いてくるDV'],
 ['DeAgostini', '隔週刊', '鉄道 ザ・プロジェクト', '499', '1,529', '伝説となった鉄道プロジェクトに光を当てる 本シリーズでは、毎号鉄道にまつわるプロジェクトを取り上げ、当時の貴重な映像や再現ドラマ、関係者へのインタビューを収録したDVD と、プロジェクトをひも解く資料を'],
 ['DeAgostini', '週刊', '陸上自衛隊 90式戦車をつくる', '290', '1,650', '圧倒的重量感を誇る第3世代国産戦車 週刊『陸上自衛隊 90式戦車をつくる』創刊  1990年に制式化された陸上自衛隊の3代目の国産戦車「90式戦車」が完成する、週刊『陸上自衛 隊 90式戦車をつくる』を'],
 ['DeAgostini', '隔週刊', '暴れん坊将軍 DVDコレクション', '490', '1,599', 'シーズン1・シーズン2をDVD付きマガジンに初完全収録 隔週刊『暴れん坊将軍DVDコレクション』創刊 大スター・松平健が演じる八代目将軍・徳川吉宗の凛々しくも爽やかな姿やホームドラマ的要素が人気を集め'],
 ['DeAgostini', '隔週刊', '仮面ライダーDVDコレクション 平成編', '490', '1,390', '仮面ライダー生誕50周年！平成を彩った『クウガ』から『ディケイド』までが集結！ 2021年4月に生誕50周年を迎えた「仮面ライダー」作品の中から、ミレニアムイヤーに復活を果たした平成ライダーの10作品'],
 ['DeAgostini', '週刊', 'Honda NSX-R', '490', '1,650', ' 世界を驚かせたピュアスポーツカーが史上初の1/8スケールで蘇る 週刊『Honda NSX-R』創刊  ■NSX-Rの美しいフォルムを初の1/8スケールで徹底再現 外観のデザインはもちろんのこと、外か'],  
 ['DeAgostini', '隔週刊', '刺しゅうで楽しむ スヌーピー&フレンズ', '490', '1,155', ' スヌーピーと仲間たちが、かわいい刺しゅうになって登場！隔週刊 『刺しゅうで楽しむ スヌーピー＆フレンズ』 創刊  世界中で愛されるコミック 『ピーナッツ』 に登場するスヌーピーと仲間たちの世界が、か'],
 ['DeAgostini', '隔週刊', 'たのしいムーミンキルト', '499', '1,320', ' ムーミン谷の仲間たちと楽しむ《材料キット付き》ソーイング 毎号届くキットを使って人気のムーミンキャラクターが並ぶインテリアカバーと、日常生活で使える雑貨小物を作っていくソーイングシリーズ。当シリーズ'],
 ['DeAgostini', '週刊', 'ウルトラホーク1号', '490', '1,540', ' 地球を守ったあの銀翼の勇姿が[全長87.5cm]のビッグスケールでよみがえる！週刊『ウルトラホーク1号』創刊\n特撮ドラマの金字塔『ウルトラセブン』に登場する、ウルトラ警備隊の誇る 多目的戦闘機「ウルト'],
 ['DeAgostini', '隔週刊', '仮面ライダー DVDコレクション', '499', '1,518', '仮面ライダー生誕50周年！平成を彩った『クウガ』から『ディケイド』までが集結！\n2021年4月に生誕50周年を迎えた「仮面ライダー」作品の中から、ミレニアムイヤーに復 活を果たした平成ライダーの10作品'],
 ['DeAgostini', '週刊', 'スプリンタートレノ AE86', '490', '1,485', '走り屋たちの熱き伝説“ハチロクトレノ”をつくる\u3000週刊『スプリンタートレノ AE86』創刊\n“ハチロク”の愛称で人気を誇る「TOYOTA スプリンタートレノ AE86」（前期型）が完成する週刊『スプリン'],
 ['DeAgostini', '隔週刊', 'ビッグスケールF1コレクション', '1,990', '2,990', 'F1(TM)オフィシャルライセンス\u3000歴代F1の伝説が1/24スケールのダイキャストモデルで蘇る！隔週刊『ビッグスケール F1(TM)コレクション』\n\nF1の栄光の歴史にその 名を刻んだ名車たち全80種を'],
 ['DeAgostini', '週刊', '航空自衛隊 F-2戦闘機をつくる', '399', '1,430', ' 実機取材で忠実に再現! 世界初の1/24ビッグスケール・ダイキャスト製モデル 週刊『航空自衛隊 F-2戦闘機をつくる』創刊\n\n「バイパーゼロ」の異名を持ち、日本の防空最前線を翔ける航空自衛隊の戦闘機'],
 ['DeAgostini', '週刊', 'Honda NSX', '490', '1,430', ' 世界を驚かせたピュアスポーツカーが史上初の1/8スケールで蘇る 週刊『Honda NSX-R』創刊\n\n■NSX-Rの美しいフォルムを初の1/8スケールで徹底再現\n外観のデザインはもちろんのこと、外か'], 
 ['DeAgostini', '週刊', '日本の島', '190', '690', ' ～島を知り、日本を知る。～世界遺産から上陸困難な島まで、日本の島を愉しむビジュアルマガジンシリーズ\u3000週刊『日本の島』 創刊\n\n自然・歴史・文化・くらしなど島に関するあらゆる情報を網羅するビジュアルマ'],
 ['DeAgostini', '週刊', '護衛艦いずもをつくる', '499', '1,650', ' 圧倒的な精度で完全再現! 全長約100cmの大迫力のスケールモデルを組み立てる!\nダイキャスト製、1/250スケールで再現。さまざまな可動ギミックが組み込まれており、模型を組み立てるだけではなくオペ'],
 ['DeAgostini', '隔週刊', 'JAL旅客機コレクション', '1,009', '3,036', 'JAL歴代の航空機が1/400 統一スケールのダイキャスト製モデルで揃うかつてないコレクション!\n\nJAL製作協力のもと、待望のシリーズが誕生!\n\n戦後初の航空会社として設立さ れたJAL。長きにわたる'],
 ['DeAgostini', '隔週刊', 'キャシーといっしょにハワイアンキルト', '508', '990', '暮らしが明るく元気になる\nキャシーワールドへようこそ\n\n隔週刊『キャシーといっしょにハワイアンキルト』は毎号ついてくるキットを使って、ハワイアンな作品を作っていくソーイングシリーズです。\n気楽に始めら'],
 ['DeAgostini', '週刊', 'マーベル・ファクト・ファイル', '305', '703', ' 世界を悪の手から救う正義の使者マーベルヒーローが一堂に集結!\n\n1939年、多数のスーパーヒーローを輩出し、コミック界だけでなく\n映画やテレビ、アニメやゲームを席巻する「マーベル・コミック」が誕生し'],
 ['DeAgostini', '隔週刊', '西遊記DVDコレクション', '490', '1,990', ' 特撮伝奇エンターテインメントの傑作『西遊記』、『西遊記II』が今蘇る！隔週刊 『西遊記 DVDコレクション』 創刊\n1978年放送の日本テレビ制作のドラマ『西遊記』シリーズをDVD付きマガジン化した'],
 ['DeAgostini', '隔週刊', '古畑任三郎DVDコレクション', '770', '1,990', ' 「田村正和 × 三谷幸喜」 傑作ミステリ・ドラマがDVDコレクションで蘇る! 隔週刊 『古畑任三郎 DVDコレクション』 創刊\n\n1994年放送開始の三谷幸喜脚本・田村正和主演の 「古畑任三郎」シリー'],
 ['DeAgostini', '週刊', 'ナイトライダー', '490', '1,890', ' 世界中の人々が熱狂した伝説の電子頭脳搭載車「ナイト2000」史上初、1/8ビッグスケールギミックモデル\n毎号付属のパーツを組み立てると、海外ドラマ「ナイトライダー」に登場するドリーム・カー「ナイト2'],
 ['DeAgostini', '週刊', 'スカイライン2000GT-R【KPGC110】', '290', '1,859', '幻のGT-Rとも呼ばれる「ケンメリGT-R」を日産自動車完全監修で再現!\n1/8スケールの組み立てシリーズで、可動部が多く、ランプやエンジン音も再現した本格志向のモデル となっています。\n■全長約56c'],
 ['DeAgostini', '隔週刊', 'ザ・マジック', '397', '1,823', 'マガジンとDVDのわかりやすい解説で\n"憧れのマジック"ができるようになる!!\n\n隔週刊「ザ・マジック」は、世界22ヶ国、数百名ものマジシャンをクライアントとする\nマジシャンMAGUS(メ イガス)が、'],
 ['DeAgostini', '隔週刊', '日本の城 DVDコレクション', '299', '1,419', ' 隔週刊「日本の城 DVDコレクション」は、2015年よりBS朝日で放送された 『歴史ミステリー日本の城見聞録』を再編集して収録したDVDと、 番組の内容をさらに深堀りして楽しめるマガジンがセットにな'],
 ['DeAgostini', '週刊', 'つくって あつめる スヌーピー＆フレンズ', '499', '1,599', ' ピーナッツの名シーンがミニチュアになって大集合!\nミニチュアボックスは、犬小屋型ディスプレイケースに収めて飾ることができます。\n\n■つくってあつめて楽 しめる! 犬小屋型ボックスコレクション\n1950'],
 ['DeAgostini', '月刊', '第二次世界大戦傑作戦車コレクション', '1,990', '6,980', '株式会社デアゴスティーニ･ジャパンは、第二次世界大戦に登場した世界の主力戦車を、\n1/43のビッグスケールでコレクションできる『第二次世界大戦 傑作戦車コレクション』を\n2021年12月8日（水）より'],
 ['Hachette', '週刊', '刺しゅうでつくる ピーターラビット™の世界', '299', '1,299', 'インテリアにぴったり！！ピーターラビット™の世界を題材にした素敵なオリジナルサンプラー※をつくりましょう。\n色とりどりの刺しゅう糸で毎号少しずつモチーフを刺していくシリーズです。\n\nピーターラビット™'],
 ['Hachette', '週刊', '装甲騎兵ボトムズ スコープドッグをつくる', '299', '2,199', 'キリコが、そして最低野郎ども（ボドムズ）が命を預け戦ったAT（アーマードトルーパー）の傑作機スコープドッグをお前の手で組み上げろ\n\n1983年に放送を開始し たTVアニメ『装甲騎兵ボトムズ』は、主人公キ'],
 ['Hachette', '週刊', '聯合艦隊旗艦 戦艦武蔵 ダイキャストギミックモデルをつくる', '299', '1,999', '大艦巨砲時代の最高傑作「武蔵」が最新の研究によって現代に蘇る\n\n大艦巨砲時代の最高傑作―46cm三連装主砲を3基も備えた世界最大の戦艦にして、太平洋戦争でもっとも長いあいだ日本海軍聯合艦隊の旗艦をつと'],
 ['Hachette', '週刊', 'ラビット スーパーフローS601をつくる', '299', '2,399', '富士重工業が1959（昭和34）年に発売し大ヒットモデルとなったスクーター、ラビット スーパーフローS601を徹底再現!!\n\n読者のみなさまによる熱い応援のおかげで、『スバル360をつくる』シリーズの'],
 ['Hachette', '隔週刊', '阪神タイガース実況CDマガジン', '499', '1,899', 'ラジオと雑誌の一体型マガジン登場。\n\n『阪神タイガース実況CDマガジン』はA.R.E.GOES ONを切に願うファンのためのスペシャル・マガジンです。\n勝敗に一喜一憂せず、選 手を育てながらA.R.E.'],
 ['Hachette', '週二回', 'メタル・ギミックモデル バットモービル タンブラー', '4,990', '15,990', 'もっとも攻撃的かつ強靭、鈍く光る漆黒のボディにハイテク装備を搭載したバットモービル「タンブラー」\n可動、ライト、サウンド、そして1/8ビッグスケールで迫りくるタンブラー\nかんたん組み立て！\n\n『バット'],
 ['Hachette', '週刊', '宇宙戦艦ヤマト', '299', '1,893', '251号からパトロール艦の組み立てがスタート！発光ギミックが映えるスマートな艦影を作り上げよう!!\n宇宙戦艦ヤマト 地球防衛軍 パトロール艦\n\n依然として好評の本シリーズは、再度の延 長が決定いたしまし'],
 ['Hachette', '隔週刊', '昭和落語名演 秘蔵音源CDコレクション', '499', '1,599', '昭和の落語家による名演の数々が未発売音源でよみがえる！\nPoint 1\nマガジンとCDで落語の名演を味わい尽くす！\n\n本書は、これまで発売されたことのない音源を中心に、古今亭志ん朝をはじめとする著名な'],
 ['Hachette', '週二回', 'メタル・ギミックモデル 幻の豪華客船 タイタニック号をつくる', '4,990', '14,990', '壮大な夢をのせた“世界最大”の豪華客船\n\n1912年4月のある夜、\n当時世界最大の客船「タイタニック号」が消息を絶った。\n現代にも語り継がれる、20世紀最大の海難事故である。\nこの悲劇の裏には、\n乗員'],
 ['Hachette', '週刊', '週刊ガールズ＆パンツァーⅣ号戦車H型（D型改）をつくる', '299', '2,499', 'あんこうチーム、パンツァー・フォー！『ガルパン』のⅣ号戦車が究極のスケールモデルとして登場です！\n\n「女子高生と戦車」という、これまでになかったテーマを真正面から描いて10周年を迎えてもなお大ヒットを'],
 ['Hachette', '隔週刊', '昭和傑作テレビドラマDVDコレクション', '499', '1,799', '誰もが胸を熱くした青春ドラマの金字塔が時代を超えてDVDとマガジンでよみがえる！\n中村雅俊主演の青春ドラマ4作品をコンプリート\n\n1975年に放送され大ヒットを 記録した『俺たちの旅』を筆頭に、『俺たち'],
 ['Hachette', '週刊', '週刊ディズニーマジカルミュージックシアター', '299', '1,599', 'ディズニー映画の名シーンをミニチュアで再現 動きと光と音で楽しむシアターオブジェをつくりましょう\n\n時代を超えてたくさんの夢を与えつづけてくれるディ ズニ－・アニメーション。\n厳選された心に残る名シーン'],
 ['Hachette', '週刊', 'アルカディア号ダイキャストギミックモデルをつくる', '299', '2,199', 'キャプテンハーロック率いる 宇宙海賊戦艦を精密に再現!!\nアルカディア号 どくろの旗をかかげ、信じるもののために 命をかけて戦う男の艦がいまここに ！！\nこちらはプレミアム定期購読のアイテムを含めた完成'],
 ['Hachette', '週刊', 'THETERMINATORT-800をつくる', '4,990', '7,990', 'サラ・コナーを抹殺せよ− 未来から転送された最強殺人マシン、T-800\n映画『ターミネーター』TM のオリジナルモデルから設計された 人間抹殺用アンドロイドT-800エンドスケルトンを組み立てる！\nス'],
 ['Hachette', '週刊', '鉄の城マジンガーＺ巨大メタルギミックモデルをつくる（延長）：偉大な勇者グレートマジンガー', '299', '1,999', '101号からグレートマジンガーがスタート!迫力の巨大モデルがついに登場!\n\n読者のみなさまによる熱い声援に より、本シリーズの延長が決定いたしました。\n101号からは、みなさまからご要望が多かった「グレ'],
 ['Hachette', '週刊', '西部警察MACHINE RS-1ダイキャストギミックモデルをつくる（延長）：SUPER Z日産フェアレディ 280Z', '299', '1,999', '101号から「スーパーZ」がスタート！！金色のダイキャストモデルがあなたの手に！！\n\n読者のみなさまによる熱い応援のおかげで、本シリーズの延長が決定しました。101号からはRS-1と人気を二分するスー'],
 ['Hachette', '週刊', '週刊 ランチアストラトスをつくる', '299', '1,999', '\n\n1973年にラリーの世界選手権としてスタートしたワールド・ラリー・チャンピオンシップ（WRC）。\nランチア ストラトスは、このラリー戦で勝つために開発された生粋の“パーパス・ビルド・マシン”であっ'],
 ['Hachette', '週刊', '江戸川乱歩と名作ミステリーの世界', '499', '2,549', '絢爛たる装丁で幻想とロマンあふれるミステリーの世界へ誘います\n幻想とロマンに満ちたミステリーのラビリンスへようこそ。『江戸川乱歩と名作ミステリーの世界』は、江戸川乱歩の作品をはじめ、ミステリー史に残る'],
 ['Hachette', '週二回', '週刊エイリアンゼノモーフをつくる', '4,990', '15,990', 'いまだかつて存在しなかった大きさ、ディテール、ギミックすべてが圧倒的！\n1979年、初めてその姿を現した「ゼノモーフ」前代未聞の120cm、ビッグサイズで登場！\n\n1979年に公開された『エイリアン』'],
 ['Hachette', '週刊', 'ウォーハンマー40,000：IMPERIUM', '499', '2,399', '帝国へようこそ\n手に汗握るテーブルトップ・ウォーゲーム『ウォーハンマー40,000：IMPERIUM』の世界へようこそ！これは人類が存亡を賭けて、異種族や反逆者、その他の凶悪な敵と戦っている41千年紀'],
 ['Hachette', '週刊', 'スバル360をつくる', '299', '2,399', '夢と希望を乗せて走った“てんとう虫”。\n全長37.4cm！1/8ならではの精密さを実現ボディは重厚なダイキャスト製！価値のある増加試作車を綿密取材により再現！\nサウンドコントローラー付きディスプレイベ'],
 ['Hachette', '隔週刊', '鷲沢玲子のはじめてのホワイトキルト', '299', '1,799', '白いモチーフをつなげて、タペストリーを仕上げましょう\n白い布に立体感を出せる「トラプント技法」は、光の陰影で模様が美しく引き立ちます。\nホワイトキルトのタペストリー\n\n30数年前、トラプントキルトに初'],
 ['Hachette', '週刊', 'ピーターラビット?の世界イングリッシュガーデン＆ハウス', '299', '1,899', '眺めているだけで物語に入り込んでしまいそうなピーターラビットの仲間たちがあそぶ、憧れのお家とお庭。小さくてかわいいミニチュアをつくって組 み立ててあなたのお部屋にとっておきの夢の世界をつくりましょう。\n'],
 ['Hachette', '週刊', '空母 赤城ダイキャストギミックモデルをつくる', '299', '2,199', '圧倒的かつ緻密なディティールで現代によみがえる空母「赤城」\n真珠湾攻撃で活躍した伝説の大型空母「赤城」が、\n1/250スケールのダイキャストギミックモデルとして復活！\n完成後はリモコン操作で、司令長官'],
 ['Hachette', '隔週刊', '恋愛小説の世界名作ブックコレクション', '499', '2,199', '甘くて切ない極上の物語を美しい装丁で味わいましょう\n甘酸っぱい初恋や、許されない禁断の恋、試練を乗り越え見つけた真実の愛……。\n『恋愛小説の世界 名作ブッ クコレクション』は、世界の名作恋愛小説を豪華ハ'],
 ['Hachette', '週刊', '宇宙戦艦ヤマト（再延長）ヒュウガ', '299', '1,999', '171号から戦闘空母ヒュウガがスタート!!迫力のダイキャストギミックモデルついに登場!!\n本シリーズは依然として好評につき、さらなる延長が決定いたしました。 171号か らは、新たなヤマト艦隊、第65護'],
 ['Hachette', '週刊', 'ENJOY!OUTDOOR', '499', '2,399', 'このシリーズは、毎号付属のマガジンとツールを集めながらアウトドアのテクニックを楽しくマスターするツール付き体験コースです。\n付属ツール 毎号ついてくるツールや素材で手軽に体験+マ ガジン 4つのカテゴリ'],
 ['Hachette', '隔週刊', 'マーベルグラフィックノベル・コレクション', '499', '2,299', ' 購入に関して-よくあるご質問はこちら\nすべてのファンに贈るマーベル・コミック決定版コレクション\nウルヴァリン、ハルク、キャプテン・アメリカ、スパイダーマン、アイアンマン、デッドプール、\nアルティメッ'],
 ['Hachette', '週刊', '宇宙戦艦ヤマト（延長）アンドロメダ', '299', '1,999', '111号からアンドロメダがスタート!!大スケールのギミックモデルで設定を忠実に再現!!\n本シリーズは好評につき延長が決定いたしました。111号からは、皆様からご要望の多かった「アンドロメダ」を、ヤマト'],
 ['Hachette', '週二回', '鉄の城マジンガーＺ巨大メタル・ギミックモデルをつくる', '4,999', '17,999', '皆が夢見た 真の「鉄の城」が ついに実現\n\nTVアニメーション『マジンガーZ』は1972年12月より放送開始。巨体から繰り出される武器の圧倒的なパワーは、全国の子供たちを魅了。それから半世紀、その魅力'],
 ['Hachette', '週刊', 'TOYOTA2000GTダイキャストギミックモデルをつくる', '299', '2,199', '美しき日本の伝説が今よみがえる。\nロングノーズ・ファストバックの美しいスタイルと当時最先端のメカニズムで世界にその名を知らしめたスポーツカー、TOYOTA 2000GT。この幻の名車を徹底した取材と貴'],
 ['Hachette', '週刊', '西洋・東洋占術のすべて占いの世界改訂版', '190', '949', '広大な“占いの世界”を正しい知識とともに巡りましょう\nシリーズでは、アイテムとともに世界中のさまざまな占いを紹介。正しい占いの知識が少しずつ身につきます。\n複数のジャンルを組み合わせて総合的に占いを活'],
 ['Hachette', '週刊', 'はじめてのディズニークロスステッチ', '299', '1,199', 'ステップバイステップでディズニーキャラクターを刺しながら本誌オリジナルの作品をつくりましょう。\n\nおなじみのディズニーキャラクターを刺しゅうして、本誌オリジナルの作品を5点つくりましょう。\n必要な材料'],
 ['Hachette', '隔週刊', '国産名車プレミアムコレクション', '1,299', '4,599', '至極のアーカイブス。1/43 高品質モデルで揃える傑作国産車のコレクション\n時代時代の先端技術と開発者たちの情熱を乗せ、市場に放たれてきた幾多の国産車たち。\n日 本が世界に誇る国産自動車の傑作の数々が、'],
 ['Hachette', '週刊', 'ウルトラセブンポインターをつくる', '299', '2,199', 'ウルトラ警備隊の万能車両が最新の技術と詳細な考証で甦る！！\n1967年から放映され、今なお高い人気を誇る『ウルトラセブン』。\n劇中で異星人の侵略から人類を守るウルトラ警備隊の脚となって大活躍を見せた特'],
 ['Hachette', '隔週刊', 'しあわせを願うつるし飾り', '299', '1,800', '伝統的な縁起ものをつくって、つるし飾りを仕上げましょう。\nたくさんの願いがこめられたモチーフを毎号ひとつずつつくり、輪につるして飾りましょう。\nつるし飾り用とつまみ細工用の必要な材料は、全部付いてきま'],
 ['Hachette', '週刊', 'ランボルギーニミウラをつくる', '299', '2,499', '宝石のごとき至上のスーパーカー、ランボルギーニ ミウラ P400 Sをつくる\n“Questo è stato il momento in cui ho deciso di creare un’auto'],
 ['Hachette', '週刊', '西部警察MACHINE RS-1ダイキャストギミックモデルをつくる', '299', '1,999', '伝説の戦闘用スーパーパトカー令和に再び吼える！\n1979年から放送された大人気アクションドラマ『西部警察』シリーズで大活躍した大門軍団のスーパーマシン「RS-1」を、1/8スケール（全長約58cm）で'],
 ['Hachette', '隔週刊', 'はじめての刺し子', '299', '1,949', '毎号1枚ずつのモチーフと小物を刺しながら、刺し子を楽しく学びましょう。\n刺し子は布を重ね合わせ、ひと針ひと針、刺し縫いする日本の伝統的な工芸です。\nこのシリーズでは、付属の 材料で毎号1枚ずつモチーフを'],
 ['Hachette', '隔週刊', 'やさしいアロマ生活', '499', '1,698', '毎号付属する天然オイルを集めながらアロマテラピーで生活を彩りましょう\n\n『やさしいアロマ生活』は、\nハーブとアロマテラピーの専門店\n「生活の木」の天然オイルが毎号付いてくる\nアロマコレクションです。\n'],
 ['Hachette', '週刊', 'かぎ針で編む立体花モチーフ', '299', '1,099', 'ステップ・バイ・ステップで、立体的な花のモチーフを編みながら、かぎ針編みを楽しく学びましょう。\n花モチーフに必要なカラフルな毛糸が毎号付いてきます。\n1枚ずつ編んだ 花モチーフをつなげてマルチカバーを完'],
 ['Hachette', '週刊', 'ブルートレイン3車両をつくる', '299', '1,999', '動く！光る！轟く！五感を刺激する多彩なギミックを搭載！\n車窓に街の灯を映し、群青の宵闇へ消えていくブルートレイン。鉄輪の響きを聴いて眠りについたあのころの夜汽車旅 はなんと旅情にあふれていたことだろう─'],
 ['Hachette', '隔週刊', '懐かしの商用車コレクション', '799', '2,499', '街から街へ、商店から商店へ、 日本の元気を運んだクルマたち。\n\n昭和・平成の商用車は、輝かしい経済成長の真の主役だった。とりどりの荷物を積んで道という道を走り回っ ていた軽貨物、小型トラック、商用バンや'],
 ['Hachette', '隔週刊', 'はじめての立体刺しゅう', '299', '1,700', '毎号少しずつモチーフをつくりながら立体刺しゅうを楽しく学びましょう。\n付属の材料で毎号さまざまなモチーフをつくり、立体刺しゅうの技を覚えましょう。\n作ったモチーフを組み合わせて、可愛いフレームを完成さ'],
 ['Hachette', '週刊', '週刊ディズニー ドールハウス', '299', '1,849', 'ディズニーの人気キャラクターたちが集まる夢のドールハウスがあなたのもとに！ 実寸の35%スケール ミッキーマウスをはじめとした時代を超えて愛されるキャラクターたちがひとつのドールハウスに大集合！夢のド'],
 ['Hachette', '週刊', '陸上自衛隊74式戦車をつくる', '299', '1,899', '最後の輝きを放つ「74式戦車」、究極のスケールモデルが登場！\n陸上自衛隊 74式戦車 JGSDF TYPE74 MAIN BATTLE TANK\n全長:58.8cm 全幅:19.8cm 全高:標準姿勢'],
 ['Hachette', '週刊', 'はじめてのレース編み', '299', '1,099', 'ステップ・バイ・ステップでモチーフを編みながら、レース編みを楽しく学びましょう。\n必要なレース糸が付いてきて詳しい編み方をマガジンで学べるので、気軽にレース編みが始められます。\n繊細な透かし模様やスペ'],
 ['Hachette', '週刊', 'ディズニー ゴールデン・ブックコレクション', '190', '849', '世界中の子どもたちから愛され続ける珠玉のディズニー絵本コレクションが登場！\n子どもの読書を愛する心を育む名作ディズニー絵本シリーズ\n\n「ゴールデン・ブ ック」は、1942年にアメリカで創刊された絵本シリ'],
 ['Hachette', '隔週刊', '歌舞伎特選DVDコレクション', '799', '2,499', '胸を躍らせる、あの歌舞伎の舞台が、あなたの手元に！\n一部音声ガイド付き！わかりやすい解説を聞きながら舞台映像をご覧いただけます。※DVDに音声ガイドの付かない号もござ います。日本が世界に誇る伝統芸能、'],
 ['Hachette', '週刊', '樹脂粘土でつくるミニチュアフード', '299', '1,099', '小さくてかわいい! 本物そっくりなミニチュアフードをつくりましょう。\n樹脂粘土でスイーツやパンをつくって飾って、あなただけのブーランジェリー＆パティスリーを完成させましょう！\n\nリアルな質感が表現でき'],
 ['Hachette', '週刊', '宇宙戦艦ヤマト', '299', '1,999', '\n宇宙戦艦の代名詞――ヤマト 西暦2202年に改装された姿を設定に忠実に再現!!\n『宇宙戦艦ヤマト2202 愛の戦士たち』に登場したヤマトを、\n特徴的な形状をはじめ、各種武装をディテールに至るまで忠実'],
 ['Hachette', '隔週刊', 'はじめてのレザークラフト', '499', '2,400', '専用の道具を集めて、使い方を学びながらレザークラフトを楽しみましょう。\nレザークラフトを始めるために必要な道具がお手元に！\nこのコレクションでは、毎号付属する道具や材料を使って作品を完成させながら、レ'],
 ['Hachette', '週刊', '本物の貨幣コレクション', '190', '1,250', '時間とともに歴史的価値を増す、本物の紙幣と硬貨がコレクションで登場!\n見て、触って、読んで学べる貨幣コレクション!\n各国で実際に使用されていた\n本物の紙幣や硬貨が、毎号ついてくる！\nデータファイルでは'],
 ['Hachette', '隔週刊', 'ピーターラビット?キルト', '299', '1,700', 'キルトカバーを完成させるうちに裁縫のスキルが上達します。\n付属の材料でピーターラビットのキルトカバーをつくりながら、パッチワークやアップリケ、刺しゅうのテクニックを 少しずつ学ぶことができます。わかりや'],
 ['Hachette', '週刊', '戦艦大和', '299', '1,799', '戦艦大和の最期―天一号作戦時の雄姿を再現！\n最新考証をふんだんに取り入れ模型の限界に挑む精細な造形！\n最新の3D化・モデリング技術で今までにない精密な再現が可能に！\n初心者の方も無理な く始められます\n'],
 ['Hachette', '隔週刊', 'ディズニーツムツムのニット＆クロシェ', '299', '1,445', ' かわいい「ディズニーツムツム」を、自分で編んで集めよう！\nミッキーやミニーをはじめとするディズニーキャラクターたちがコロンとまあるくなって集合した「ツ ムツム」は、ディズニーストアのぬいぐるみやLIN'],
 ['Hachette', '週刊', '世界の貨幣コレクション', '199', '1,199', '\n世界の国々で実際に使用されていた100ヵ国の本物の紙幣をラインナップ\n\n世界5大陸・100カ国の知らざる文化と歴史がつまった、紙幣と貨幣のオリジナルコレクション！\n\n    イ ギリス\n    ボスニ']
]

const dataForPublishFreqency = [
 ['DeAgostini', '月刊', 'トランスフォーマー オプティマスプライムをつくる', '映画『トランスフォーマー』（2007）に登場した オプティマスプライムを あなたの手で組み立てる！ 本シリーズでは金属パーツと ABSパーツを使って、サイバトロンの伝説的なヒーロー「オプティマスプライ'],
 ['DeAgostini', '週刊', 'SUBARU BRZ GT300', '2021 Super GT GT300 Class シリーズチャンピオンマシンを あなたの手で組み立てよう!!'],
 ['DeAgostini', '隔週刊', '日本の名馬・名勝負', '日本競馬史上に残る名馬たちの蹄跡を DVDとマガジンで完全収録! '],      
 ['DeAgostini', '隔週刊', 'ワイルド・スピード カー コレクション', '大スクリーンを疾走したあのキャストのあの車が、1/43 スケールモデルになって大集合！コレクションする車は、各作品の名場面の記憶を呼び覚ます象徴的な車ばかり。'],
 ['DeAgostini', '隔週刊', 'あぶない刑事 DVDコレクション', ' TVシリーズ2作品、TVSP1作品、 劇場7作品を初のHDリマスター版で コレクション!  今シリーズでは、“あぶデカ”シリーズDVD初のHDリマスター版で本編が楽しめるほか、豪華特典映像も満載。 '],
 ['DeAgostini', '週刊', 'ホンダCB750FOUR再刊行版', '圧倒的な完成度を誇る究極のディスプレイモデル  重厚感のある金属パーツ     ステンレス製のカットフェンダーやダイキャスト製のクランクケースなど、実車の質感を表現するために、金属パーツを多 数使用。 '],
 ['DeAgostini', '週刊', 'エヴァンゲリオン初号機をつくる', 'マガジンとパーツで組み立てる 新劇場版の設定を徹底的に考証して立体化した圧倒的なクオリティの《エヴァ初号機》  キットに付いてくるドライバーと瞬間接着剤、そして毎号付属の塗装済みパーツでエヴァ初号機を'],
 ['DeAgostini', '隔週刊', 'ルパン三世 THE DVD コレクション', '日本のアニメ史上を代表する作品［ルパン三世］。 初回放送 から50年以上が経ったいまでも色褪せない驚きを放つ 作品のPART 1～Ⅲ、TVスペシャルから24作品を、全80号の 隔週刊［ルパン三 世 THE'],
 ['DeAgostini', '隔週刊', '決定版 日本の名城', '文化遺産として、また観光スポットとして、近年ますます人気を高めている「日本の城」。 本シリーズではブームの火付け役となった「日本100名城」「続日本100名城」の全200名城を詳細に取り上げます。'],
 ['DeAgostini', '隔週刊', 'Gメン’75 DVDコレクション', 'DVDとマガジンで鮮烈によみがえる 刑事ドラマの永遠の金字塔  滑走 路を並び行くGメンたちの印象的なオープニング、 他の刑事ドラマにはないハードなシナリオと切れ味の鋭い演出、 そして迫真の 演技でドラマ'],
 ['DeAgostini', '隔週刊', '鉄道車両金属モデルコレクション', '高精度＆大型の先頭車模型と 詳細なマガジンで楽しむ あなた だけの鉄道車両ミュージアム。  金属モデルの手応えを味わいながら、 尽きない物語に思いを馳せるー     日本各地の鉄路を駆けた時代時代の人気'],
 ['DeAgostini', '隔週刊', '東宝怪獣コレクション', 'キングギドラ、メカゴジラ、ヘドラ、ガイガン、ラドン！作品と時代を超 えて、怪獣たちをラインナップ！  昭和・平成の時代を通じて東宝が生み出し、人々を魅了してきた怪獣たち。 隔週刊『東宝怪獣 コレクション』'],
 ['DeAgostini', '週刊', 'ワイルド・スピード 日産スカイラインGT-R（R34）', '日産スカイラインGT-R（R34）はユニバーサル・ピクチャーズの『ワイルド・スピード』シリーズで、数あるカーアクションのなかでも最も印象的なシーンに登場する主役級の一台。スピードと卓越したパフォーマン'],
 ['DeAgostini', '隔週刊', 'ブルーノート・ベスト・ジャズコレクション 高音質版', '『BLUE NOTE best jazz collection』では毎号１人のアーティストを取り上げ て、その生き様や〈ブルーノート〉での活躍、〈ブルーノート〉の歴史を 紐解いていく。付属のCDは今ま'],
 ['DeAgostini', '隔週刊', 'JR全路線 DVDコレクション', '駅や路線ヒストリーを解説する本誌と、貴重な撮り下ろし映像満載のDVDでお届けするDVD付きマガジン。  北海道から九州までのJR全路線を特集し、現存する車両だけでなく廃止された列車や、起点駅 から終着駅'],
 ['DeAgostini', '隔週刊', 'HELLO KITTY なつかしのアイテムコレクション', '隔週刊 『HELLO KITTYなつかしのアイテムコレク ション』 毎号、70年代から90年代の発売商品を再現したハローキティのアイテムが1つ付きます。  創刊号は、1975年に発売したハローキティのデ'],
 ['DeAgostini', '隔週刊', '男はつらいよDVDコレクション', '隔週刊「男はつらいよDVDコレクション」は、国民的人気作「男は つらいよ」全50作をコンプリートできるDVD付きマガジンです。DVDは映像も音もクリアな〈HDリマスター版〉を使用し、マガジンも盛りだくさ'],
 ['DeAgostini', '隔週刊', 'スター・ウォーズ スターシップ＆ビークル・コレクション', '本シリーズでは、スター・デストロイヤーや戦艦などの大型軍用船に、 スターファイターや爆撃機、さらに貨物船や輸送機、シャトル機に加えて、 地上や危険地帯で活動するスターシップやビークルを紹介する。 映画'],
 ['DeAgostini', '隔週刊', 'アメリカンカー コレクション', '古き良き憧れのアメ車がここに集結! ダイキャスト製ミニチュアコレクション 1960~1970年代を中心とした憧れのアメ車たち全80種を、1/43スケールでリアルに再現したダイキャスト製ミニチュアでコレ'],
 ['DeAgostini', '隔週刊', 'メタルヒーロー DVDコレクション', '地球と人類のために戦う宇宙刑事の活動記録がついに登場!隔週刊『メタルヒーロー DVDコレクション』創刊 「メタルヒーローシリーズ」初期3作品をテレビ放映順に完全収録した、隔週刊『メタルヒーロー DVD'],
 ['DeAgostini', '隔週刊', '日本の名車コレクション', 'だれもが憧れた日本の名車たちが1/64スケールで蘇る\u3000隔週刊『日 本の名車コレクション』創刊1/64統一スケールのダイキャスト製モデルと、貴重な資料を満載したマガジンでお届けする、隔週刊『日本の名車コレ'],
 ['DeAgostini', '隔週刊', 'たのしい つまみ細工', '必要な道具もセットで初心者でも日本の伝統工芸を楽しめる 隔週刊『たの しい つまみ細工』創刊\u3000隔週刊『たのしい つまみ細工』は、小さな布をピンセットでつまみ、ボンドで貼るだけのシンプルな作業で、初心者の'],
 ['DeAgostini', '隔週刊', 'ディズニー マジカル オーディオ えほん', '目と耳でディズニーの名作をたのしむ、知育に最適なオーディオブック ディズニーの人気キャラクターのフィギュアを専用スピーカーに乗せると、プロの声優による朗読で、ディズニー の不朽の名作の物語を目と耳で楽し'],
 ['DeAgostini', '隔週刊', '必殺シリーズDVDコレクション', 'ハードボイルド時代劇の金字塔「必殺シリーズ」と劇場版をDVDと マガジンで楽しむ 本シリーズは、「必殺仕掛人」から「必殺剣劇人」までの21シリーズに加えて、劇場版も収録。マガジンでは、 毎号付いてくるDV'],
 ['DeAgostini', '隔週刊', '鉄道 ザ・プロジェクト', '伝説となった鉄道プロジェクトに光を当てる 本シリーズでは、毎号鉄道 にまつわるプロジェクトを取り上げ、当時の貴重な映像や再現ドラマ、関係者へのインタビューを収録したDVDと、プロジェクトを ひも解く資料を'],
 ['DeAgostini', '週刊', '陸上自衛隊 90式戦車をつくる', '圧倒的重量感を誇る第3世代国産戦車 週刊『陸上自衛隊 90式戦車を つくる』創刊  1990年に制式化された陸上自衛隊の3代目の国産戦車「90式戦車」が完成する、週刊『陸上自衛隊 90式戦車をつくる』を'],
 ['DeAgostini', '隔週刊', '暴れん坊将軍 DVDコレクション', 'シーズン1・シーズン2をDVD付きマガジンに初完全収録 隔週刊『 暴れん坊将軍DVDコレクション』創刊 大スター・松平健が演じる八代目将軍・徳川吉宗の凛々しくも爽やかな姿やホームドラマ的要素が人気を集め'],
 ['DeAgostini', '隔週刊', '仮面ライダーDVDコレクション 平成編', '仮面ライダー生誕50周年！平成を彩った『クウガ』から『 ディケイド』までが集結！ 2021年4月に生誕50周年を迎えた「仮面ライダー」作品の中から、ミレニアムイヤーに復活を果たした平成ライダーの10作品'],
 ['DeAgostini', '週刊', 'Honda NSX-R', ' 世界を驚かせたピュアスポーツカーが史上初の1/8スケールで蘇る 週刊『Honda NSX-R』創刊  ■NSX-Rの美しいフォルムを初の1/8スケールで徹底再現 外観のデザインはもちろんのこと、外か'],
 ['DeAgostini', '隔週刊', '刺しゅうで楽しむ スヌーピー&フレンズ', ' スヌーピーと仲間たちが、かわいい刺しゅうになって登場！隔週刊 『刺しゅうで楽しむ スヌーピー＆フレンズ』 創刊  世界中で愛されるコミック 『ピーナッツ』 に登場するスヌーピ ーと仲間たちの世界が、か'],
 ['DeAgostini', '隔週刊', 'たのしいムーミンキルト', ' ムーミン谷の仲間たちと楽しむ《材料キット付き》ソーイング 毎号届 くキットを使って人気のムーミンキャラクターが並ぶインテリアカバーと、日常生活で使える雑貨小物を作っていくソーイングシリーズ。当シリーズ'],
 ['DeAgostini', '週刊', 'ウルトラホーク1号', ' 地球を守ったあの銀翼の勇姿が[全長87.5cm]のビッグスケールでよみがえる！ 週刊『ウルトラホーク1号』創刊\n特撮ドラマの金字塔『ウルトラセブン』に登場する、ウルトラ警備隊の誇る多目的戦闘機「ウル ト'],
 ['DeAgostini', '隔週刊', '仮面ライダー DVDコレクション', '仮面ライダー生誕50周年！平成を彩った『クウガ』から『ディケ イド』までが集結！\n2021年4月に生誕50周年を迎えた「仮面ライダー」作品の中から、ミレニアムイヤーに復活を果たした平成ラ イダーの10作品'],
 ['DeAgostini', '週刊', 'スプリンタートレノ AE86', '走り屋たちの熱き伝説“ハチロクトレノ”をつくる\u3000週刊『スプリンタートレノ AE86』創刊\n“ハチロク”の愛称で人気を誇る「TOYOTA スプリンタートレノ AE86」（前期型）が完成する週刊『スプリン'],
 ['DeAgostini', '隔週刊', 'ビッグスケールF1コレクション', 'F1(TM)オフィシャルライセンス\u3000歴代F1の伝説が1/24スケー ルのダイキャストモデルで蘇る！隔週刊『ビッグスケール F1(TM)コレクション』\n\nF1の栄光の歴史にその名を刻んだ名車たち全80種を'],
 ['DeAgostini', '週刊', '航空自衛隊 F-2戦闘機をつくる', ' 実機取材で忠実に再現! 世界初の1/24ビッグスケール・ダイキャスト製モデル 週刊『航空自衛隊 F-2戦闘機をつくる』創刊\n\n「バイパーゼロ」の異名を持ち、日本の防空最前線を翔ける航空自衛 隊の戦闘機'],
 ['DeAgostini', '週刊', 'Honda NSX', ' 世界を驚かせたピュアスポーツカーが史上初の1/8スケールで蘇る 週刊『Honda NSX-R』創刊\n\n■NSX-Rの美しいフォルムを初の1/8スケールで徹底再現\n外観のデザインはもちろんのこと、外か'],
 ['DeAgostini', '週刊', '日本の島', ' ～島を知り、日本を知る。～世界遺産から上陸困難な島まで、日本の島を愉しむビジュアルマガジンシリーズ\u3000週刊『日本の島』 創刊\n\n自然・歴史・文化・くらしなど島に関するあらゆる情報を網羅するビジュア ルマ'],
 ['DeAgostini', '週刊', '護衛艦いずもをつくる', ' 圧倒的な精度で完全再現! 全長約100cmの大迫力のスケールモデルを組み立 てる!\nダイキャスト製、1/250スケールで再現。さまざまな可動ギミックが組み込まれており、模型を組み立てるだけではなくオペ'],
 ['DeAgostini', '隔週刊', 'JAL旅客機コレクション', 'JAL歴代の航空機が1/400 統一スケールのダイキャスト製モデルで揃うか つてないコレクション!\n\nJAL製作協力のもと、待望のシリーズが誕生!\n\n戦後初の航空会社として設立されたJAL。長きにわたる'],
 ['DeAgostini', '隔週刊', 'キャシーといっしょにハワイアンキルト', '暮らしが明るく元気になる\nキャシーワールドへようこ そ\n\n隔週刊『キャシーといっしょにハワイアンキルト』は毎号ついてくるキットを使って、ハワイアンな作品を作っていくソーイングシリーズです。\n気楽に始めら'],
 ['DeAgostini', '週刊', 'マーベル・ファクト・ファイル', ' 世界を悪の手から救う正義の使者マーベルヒーローが一堂に集結!\n\n1939年、多数のスーパーヒーローを輩出し、コミック界だけでなく\n映画やテレビ、アニメやゲームを席巻する「マーベル・コ ミック」が誕生し'],
 ['DeAgostini', '隔週刊', '西遊記DVDコレクション', ' 特撮伝奇エンターテインメントの傑作『西遊記』、『西遊記II』が今蘇 る！隔週刊 『西遊記 DVDコレクション』 創刊\n1978年放送の日本テレビ制作のドラマ『西遊記』シリーズをDVD付きマガジン化し た'],
 ['DeAgostini', '隔週刊', '古畑任三郎DVDコレクション', ' 「田村正和 × 三谷幸喜」 傑作ミステリ・ドラマがDVDコレクションで蘇る! 隔週刊 『古畑任三郎 DVDコレクション』 創刊\n\n1994年放送開始の三谷幸喜脚本・田村正和主演の「古畑任三郎」シリー'],
 ['DeAgostini', '週刊', 'ナイトライダー', ' 世界中の人々が熱狂した伝説の電子頭脳搭載車「ナイト2000」史上初、1/8ビッグ スケールギミックモデル\n毎号付属のパーツを組み立てると、海外ドラマ「ナイトライダー」に登場するドリーム・カー「ナイト2'],
 ['DeAgostini', '週刊', 'スカイライン2000GT-R【KPGC110】', '幻のGT-Rとも呼ばれる「ケンメリGT-R」を日産自動車完全監修で再現!\n1/8スケールの組み立てシリーズで、可動部が多く、ランプやエンジン音も再現した本格志向のモデルとなっています。\n■ 全長約56c'],
 ['DeAgostini', '隔週刊', 'ザ・マジック', 'マガジンとDVDのわかりやすい解説で\n"憧れのマジック"ができるようになる!!\n\n隔週刊「ザ・マジック」は、世界22ヶ国、数百名ものマジシャンをクライアントとする\nマジシャンMAGUS(メイガス)が、'],      
 ['DeAgostini', '隔週刊', '日本の城 DVDコレクション', ' 隔週刊「日本の城 DVDコレクション」は、2015年よりBS朝日で放送された 『歴史ミステリー日本の城見聞録』を再編集して収録したDVDと、 番組の内容をさらに深堀りして楽しめるマガジンがセット にな'],
 ['DeAgostini', '週刊', 'つくって あつめる スヌーピー＆フレンズ', ' ピーナッツの名シーンがミニチュアになって大集合!\n ミニチュアボックスは、犬小屋型ディスプレイケースに収めて飾ることができます。\n\n■つくってあつめて楽しめる! 犬小屋型ボ ックスコレクション\n1950'],
 ['DeAgostini', '月刊', '第二次世界大戦傑作戦車コレクション', '株式会社デアゴスティーニ･ジャパンは、第二次世界大戦に登場した世界の主力戦車を、\n1/43のビッグスケールでコレクションできる『第二次世界大戦 傑作戦車コレクション』を\n2021年12 月8日（水）より'],
 ['DeAgostini', '週刊', 'かわいい刺しゅう', '夢あふれる童話の刺しゅう絵と、雑貨小物を刺しながらさまざまなステッチに出 会えるシリーズです。 『隔週刊 \nかわいい刺しゅう』は、毎号キットとして、フランスの老舗刺しゅう糸メーカー『DMC』の刺し ゅう糸'],
 ['DeAgostini', '週刊', 'ロビ2', '新時代のフレンドリーロボット「ロビ」が、新機能を搭載してパワーアップ！ ロビとあなた の新しい暮らしがはじまる！ 日本で一番売れた二足歩行のコミュニケーションロボット〈ロビ（Robi）〉。 新しいロビは'],     
 ['DeAgostini', '週刊', 'ロビ 第三版', '新時代のフレンドリーロボット「ロビ」を、自分の手で簡単に組み立てることができる！ \nスマートなデザインに加え、愛らしい“動き”と“会話”を通して心を和ませてくれる新時代のフレンドリーロボット「ロビ」。'],
 ['DeAgostini', '週刊', 'ガンダム・モビルスーツ・バイブル', '1冊で1機のMSを極限にまで掘り下げたガンダムファン必携のマ ガジン！ 『機動戦士ガンダム』シリーズにおける戦場の主役であり、幾多の戦闘に投入されては峻烈な印象を残した人型兵器モビ ルスーツ(MS)。 作'],
 ['DeAgostini', '週刊', 'アイアンマン', 'ダイキャスト製、全長60cm・52か所の関節と6か所のLED発光ギミック！ \n主人公であるトニー・スタークが開発した数十モデルのアイアンマンの中で、2008年公開の実写映画『アイアンマン』に登場し、現'],       
 ['DeAgostini', '週刊', 'ワイルド・スピード ダッジ・チャージャー R/T', '『ワイルド・スピード』で圧倒的な存在感を放つダッジ・チャージャーR/T。 《大迫力モデル》×《充実のマガジン》 究極の“ワイルド・スピード”体験！ \n第1作の公開から15年以上を経た『ワイルド・スピー'],
 ['DeAgostini', '週刊', 'サンダーバード秘密基地', '南太平洋に浮かぶ孤島の地下に築かれた秘密基地。 これは、サンダーバードメカの発進プロセスから格納庫の内部構造まで、徹底的に作りこむ“前代未聞”のシリーズだ！ \n創刊号には島内の基地に秘めら れたすべての'],
 ['DeAgostini', '週刊', 'ゴジラをつくる', '日本が誇る偉大なキャラクター「ゴジラ」。 \n1954(昭和29)年の記念すべき映画「ゴジラ」の封切りから65年、ゴジラ映画は30作以上を数え、2019年には新たなハリウッド版ゴジラの公開があり、国と世'],       
 ['DeAgostini', '週刊', '日本刀', '1000年を超える日本刀の美と歴史を完全網羅。 美と技の粋を味わい尽くす。 日本刀の魅力 そのすべてがわかる！ 美しさと強靱さを併せ持ち、高い精神性を宿す日本刀。 刀剣ブームのなか、その魅力を余すとこ'],       
 ['DeAgostini', '週刊', 'YAMAHA YZR-M1 バレンティーノ・ロッシ モデル', 'バレンティーノ・ロッシの愛機“YAMAHA YZR-M1”を ビッグスケールで組み立てる! ! 2004年のヤマハ移籍後、バレンティーノ・ロッシと共に記録と伝説をつくり続けてきたYAMAHA YZR-M'],
 ['DeAgostini', '隔週刊', '自衛隊DVDコレクション', '陸海空、全『自衛隊』真の姿！ その全貌をコレクション！ \n迫力のドキュメント映像を体感しながら、誌面の解説でその全貌を掘り下げる待望のDVD付きマガジンがついに登場！今では見られなくなった 貴重なシーン'],
 ['DeAgostini', '隔週刊', '神社百景 DVDコレクション 再刊行版', '日本全国の神社の中から選りすぐりの名社をマガジンの解説とともに、映像とナレーションでご紹介します。 古より、人々の信仰を集めてきた神の社。 人々を見守り、畏れ敬われてきた神々は、今も全国の社と人々の心'],
 ['DeAgostini', '隔週刊', 'クイーン・LPレコード・コレクション', '歴史の一部となった作品の数々… \nクイーンの音楽を全25 号にまとめた独自のLPレコード・コレクション。2枚組、3枚組を含む、すべてのアルバムを180gの重量盤レコードとして再プレスした。毎号付いてくる'],
 ['DeAgostini', '週刊', 'NISSAN GT-R NISMO', '世界が憧れる走りの頂点 NISSAN GT-R NISMO(MY17) "NISSAN GT-R×NISMO 目指したのは究極のドライビングプレジャーの追求" ― Pursuit of Ultimat'],
 ['DeAgostini', '週刊', 'ジャガー・Eタイプ', '時代を超えたイギリススポーツカーの最高峰「ジャガー・Eタイプ」。 本シリーズでは、精密につくられたモデルを組み立てるとともに、ジャガーの世界観を紹介していきます。 毎号提供されるのは、可動式ボ ンネット'],
 ['DeAgostini', '週刊', '栄光の日本海軍 パーフェクトファイル', '世界初！彩色写真とCGでオールカラー化を実現！ 日本海軍 パーフェクト大百科！！ 「週刊 \n栄光の日本海軍パーフェクトファイル」は、日本海軍にまつわるあらゆる事実を、全編にわたるカラー彩色写真とCG画像'],
 ['DeAgostini', '隔週刊', '鉄道 ザ・ラストラン', '今はもう見ることのできない 名列車、名車両たちのありし日の姿を マガジンとDVDでたどっていきます！寝台特急列車や新幹線、また電気機関車から気動車まで… そのラストランの貴重な記録をコレクショ ン！ 最'],
 ['DeAgostini', '隔週刊', 'ニードルフェルトでねこあつめ', 'ニードルフェルトを楽しんで『ねこあつめ』しましょう！ 人気ゲーム『ねこあつめ』のねこたちが全員フェルトマスコットになりました。 眺めているだけで癒されるあのねこたちが、毎号付いて くる素材で、毎号ひとつ'],
 ['DeAgostini', '週刊', 'スター・ウォーズ R2-D2', '『スター・ウォーズ』の人気アストロメク・ドロイドをあなたの手で組み 立てよう! \n映画そのままのR2-D2を精巧に再現したオリジナル組み立て式スケールモデルが登場。世界でもっとも有名なアストロ メク・ドロ'],
 ['DeAgostini', '週刊', 'マツダ・コスモスポーツ', 'あれから50年の歳月を経て－伝説のエンジンと共に、名車「マツダ・コス モスポーツ」が帰ってきた。 作動原理が分かる。実物の1/2スケールロータリーエンジンモデル付き! 週刊「マツダ・コスモスポーツ」では'],
 ['DeAgostini', '週刊', 'ムーミンハウスをつくる', '誰もがあたたかく迎え入れられる、世界中でたったひとつの場所、ムーミ ンハウス。 \n芸術家で小説家のトーベ・ヤンソンが生み出した『ムーミン』の世界から、時代を越えて親しまれるムーミンハウス が精巧な組み立て'],
 ['DeAgostini', '隔週刊', 'ザ・ビートルズ・LPレコード・コレクション', '音楽史に名を刻むあの名盤をもう一度。 180g重量盤LPで聴く \nビートルズ・ファン必携のアルバム・コレクション。2枚組、3枚組アルバムを含む全23号のビートルズ名盤シリーズだ 。本シリーズのために特別'],
 ['DeAgostini', '隔週刊', '籐でつくる小物とバッグ', '自分でつくる籐のバッグと小物で、普段の暮らしをもっと素敵に、もっ と豊かに。 天然素材の籐を使って、手づくりのかごバッグや小物をつくりましょう。 隔週刊『籐でつくる小物とバッグ』は、楽しみながら籐の作品'],
 ['DeAgostini', '隔週刊', '日本の名峰 DVD付きマガジン', '個性豊かな日本各地の名峰を訪ね、山の魅力に迫る！ DVDには毎号 、BS-TBS『日本の名峰 絶景探訪』から1話を再編集して収録。 \n絶景はもちろん、その地で見る「朝日」にもこだわり、季節、天 気、気温な'],
 ['DeAgostini', '週刊', 'バック・トゥ・ザ・フューチャー デロリアン', '『バック・トゥ・ザ・フューチャー』で一躍名を馳せ、世界で最も有名となったタイムマシン、デロリアン。 斬新なメタルボディ、近未来的なガルウイングドア。 あのデロリアンが、8分の1ビッグスケールモデルで帰'],
 ['DeAgostini', '隔週刊', 'F1マシンコレクション', '時代を駆け抜けたレジェンドマシンをその手に！ 待ちに待ったスケールモデルの傑作、1950年の発足以来F1史に燦然と輝く名車の数々が、チームの枠を超えてここに集結した。 \n本シリーズの1/43スケー ル・'],
 ['DeAgostini', '週刊', 'おしえて！ おしゃべりガイコツ', '骨はからだを支えているんだボーン！ それにね…なんで骨はあるんだろう？ \nしゃべる人体模型、ホネッキーを完成させるシリーズです。骨や内臓を組み立てながら、人のからだのしくみがどうな っているのかが、楽し'],
 ['DeAgostini', '週刊', '日本の城 改訂版', '『日本の城 改訂版』大好評につき再刊行。日本の城を知り尽くす！ \n現存する天守から、櫓、門、わずかに残っている山城や砦まで、日本全国に残る数々の城を詳細に解説。当時の姿を再現した復元CGや内部の断面図'],
 ['DeAgostini', '隔週刊', 'ジャズ・LPレコード・コレクション', 'すべてのジャズ・アルバムの背景に、すばらしいストーリー がある。 \nミュージシャン同士の奇跡的な化学反応、クラブやバーでの記憶に残るセッション、そして時に訪れる悲劇的最期。パ ーソネルを紹介する「演奏者た'],
 ['DeAgostini', '週刊', 'マイ3Dプリンター 再刊行版', '3Dプリンターの世界にようこそ！ \n工業デザイナーでなくても、アー ティストでなくても、自分のイメージしたものを実際に作ることができたら！それを実現できるのが、3Dプリンターの世界です。たとえば、デスク'],
 ['DeAgostini', '隔週刊', '傑作カンフー映画 ブルーレイ コレクション', '最強の"観るエナジー・ドリンク" カンフー映画の原動力は"怒り"である。世にはびこる理不尽と不正義に対し、かつてヒーローやヒロインたちは湧き上がる "怒り" \nを胸に、拳ひとつで戦いを挑んだ。それは、'],
 ['DeAgostini', '隔週刊', 'レ・グランディ・フェラーリ・コレクション', '大迫力の1/24スケール！ダイキャストモデルとカタ ログのように美しいマガジンで楽しむフェラーリの世界 ビッグスケール・ディティール・マテリアルにこだわった、待望のフェラ ーリコレクション。 \n世界に名を'],
 ['DeAgostini', '隔週刊', '神社百景DVDコレクション', '古より人々の信仰を集めてきた神の社 人々を見守り、畏れ敬われてき た神々は、今も全国の社と人々の心に鎮まる。 『隔週刊 神社百景DVDコレクション』は、BSジャパンで放映された 「神社百景 GRACE '],
 ['DeAgostini', '隔週刊', '円谷プロ特撮ドラマDVDコレクション', '昭和の日本が生み出した 円谷プロによる珠玉の作品群 特撮黎明期に放映された革新的な連続ドラマシリーズ『ウルトラQ』。 \n"特撮の神様"円谷英二が手がけた『Q』の大ヒット以降、円谷 プロは高度経済成長期の'],
 ['DeAgostini', '隔週刊', '第二次世界大戦 傑作機コレクション', 'ダイキャストモデルと詳細な解説マガジンで第二次世界大戦の傑作機のすべてを手に入れる！ \nダイキャストならではの重量感あふれる精密モデルと、貴重な写真やリアルなイラスト、CGを 満載したマガジンで、古き良'],
 ['DeAgostini', '隔週刊', '釣りバカ日誌 映画DVDコレクション', '『釣りバカ日誌』シリーズの全22作品を完全収録！！ 毎号のDVDの見どころシーンを場面写真とセリフで紹介します。 \n並んでいるだけで面白いハマちゃんとスーさんの釣りシーン、事件が巻き起こる浜崎家のリビ'],
 ['DeAgostini', '週刊', 'サンダーバード２号＆救助メカ', '細部まで忠実に再現した本格コレクション。感動と熱狂が今、よみ がえる。 \n国際救助隊の超音速輸送機「サンダーバード2号」に加え、「ジェットモグラ」、「高速エレベーターカー」など特殊任務を遂行する救助メカ'],
 ['DeAgostini', '週刊', 'ディズニー・ドリーム・シアター', 'ディズニーの舞台が、あなたの部屋にやってくる！ \nプリンセスとプリンスの運命的な出会い。きらびやかな舞台で、ふたりの物語がはじまります。ディズニー不朽の名作といわれる３つの作品の美しい場面を、洗練され'],
 ['DeAgostini', '隔週刊', '空から日本を見てみようDVDコレクション', '日本列島を空中散歩！『空から日本を見てみよう』は、テレビ東京系列で2009年10月15日から2011年9月15日まで約2年間放映された、新感覚バラエティー。 \n「くもじい」と「くもみ」 のキャラクターが'],
 ['DeAgostini', '週刊', 'スター・ウォーズ ミレニアム・ファルコン', '『帝国の逆襲』 －撮影用モデルを精巧に再現－ \n『スター・ウォーズ』初期3部作の製作にあたり、ミレニアム・ファルコンは、いくつかの撮影用模型がつくられた。とりわけ、第2作『帝国の逆襲』のアクションシー'],
 ['DeAgostini', '週刊', '昭和にっぽん 鉄道ジオラマ', '昭和の日本をディテールにこだわったミニチュアで精細に再現。 \n昭 和39(1964)年10月1日、東海道新幹線が開通し、10月10日には東京オリンピックが開幕しました。日本が元気一杯だった高度成長期 のあ'],
 ['DeAgostini', '隔週刊', 'リバティプリントでハンドメイド', 'リバティプリントで手作りを楽しみ、豊かに、ていねいに時間 を重ねて。 \n毎号キットとして付いてくる、リバティプリントとその他の材料で手作りを楽しんでいただく、ソーイングコースで す。70種類以上のリバティ'],
 ['DeAgostini', '隔週刊', '必殺仕事人DVDコレクション', '『必殺仕事人DVDコレクション』は、藤田まこと演ずる中村主水の「 必殺仕事人」9シリーズと、映画、スペシャル版を網羅。 マガジンではビジュアルを多用して、ドラマの見どころや江戸時代の暮らしを解説します。'],
 ['DeAgostini', '隔週刊', '映画クレヨンしんちゃん DVDコレクション', '大人から子供まで、幅広い層のファンに人気を誇る、 歴代の『映画クレヨンしんちゃん』をDVDとマガジンで多面的に楽しむ！ \n1993年に公開された、『アクション仮面VSハイグレ魔王』以来1年に1本のペース'],
 ['DeAgostini', '週刊', 'スカイライダー・ドローン', 'Sky Rider DroneでRC フライトは新次元へ！ 世界レベルのデザイン性と最先端デジタル技術の融合、今、世界中が注目する最新RCモデル「ドローン」(RC \nはラジオコントロールの略)。従来の'],      
 ['DeAgostini', '隔週刊', 'ジッポー コレクション 80th Anniversary', '世界中のファンに愛されてきた ライターの逸品、Zippo。強風をものともしない着火性。 \n破損という言葉とは無縁の堅牢性。極めてシンプルな構造によるメインテナンスの容易さ。 そして、男たちの魂 をとらえ'],
 ['DeAgostini', '週刊', 'マイ3Dプリンター', '3Dプリンターの世界にようこそ！ \n工業デザイナーでなくても、アーティストでなくても 、自分のイメージしたものを実際に作ることができたら！それを実現できるのが、3Dプリンターの世界です。たとえば、デスク'],
 ['DeAgostini', '隔週刊', '東映任侠映画傑作DVDコレクション', 'あの頃の憧れていた男達にもう一度出会える！ \n日本の映画史上に一時代を築いた高倉健をはじめとするスター俳優たちの名演が楽しめる東映の任侠映画を毎号1作品収録したDVDと、豊富なビジュアルで作品を解説す'],
 ['DeAgostini', '週刊', '仮面ライダー オフィシャルパーフェクトファイル', 'その世界観を時代ごとにさまざまに進化させながら、昭和と平成の時空間を越えて疾走する変身ヒーロー、仮面ライダー。 『週刊 \n仮面ライダーオフィシャルパーフェクトファイル』は、各ライダーのプロフィールはも'],
 ['DeAgostini', '隔週刊', '大映特撮映画DVDコレクション', 'ガメラ＆大魔神 すべての大映特撮映画ファンに贈る！ \n格調高い文芸作品や、日本映画の底力を呈した海外グランプリ受賞作、そして重厚な時代劇映画など、多くの傑作、名作を製作してきた大映が得意とするジャンル'],
 ['DeAgostini', '隔週刊', '北斗の拳 DVDコレクション', '199X年に起きた核戦争によって、暴力が支配する時代となった弱肉強食の世界に現れた、伝説の暗殺拳“北斗神拳”の伝承者・ケンシロウ。 \n『北斗の拳』は、ケンシロウとその仲間そして強敵たちの生き様を描いた'],
 ['DeAgostini', '隔週刊', 'スタートレック・スターシップコレクション', 'スタートレックのテレビシリーズと映画に登場する、主要な宇宙船を網羅した、まったく新しいスケールモデルコレクションです。 どの宇宙船もダイキャストと高品質ABS素材を使用し、美しい塗装を施すことで、細部'],
 ['DeAgostini', '週刊', '日本の神社', '日本の神々が坐す はるかなる聖地を訪ねて。 \n日本の神話と歴史にゆかりの深い名社を毎号一社取り上げ、その魅力を徹底解説する。いつかは行ってみたい神社の由来から、社殿をはじめとする建造物、歴史を物語るご'],
 ['DeAgostini', '隔週刊', '東宝・新東宝戦争映画DVD コレクション', '日本映画史に刻まれた、珠玉の戦争映画の数々がここに！明治・大正・昭和と、日本は数々の戦争を経験してきました。一方で、映画技術が日本にもたらされ劇映画が製作されるようになった頃から《戦争》は主要なテーマ'],
 ['DeAgostini', '週刊', '日本の名車', '#NAME?'],
 ['DeAgostini', '隔週刊', '剣客商売 DVD コレクション', '藤田まこと主演の人気時代劇シリーズ 「剣客商売」を収録したDVDと、そのストーリーや見どころ、時代背景などを紹介するマガジンがセットになったマガジンシリーズです。 \n「剣客商売」は1998年に放映開始'],
 ['DeAgostini', '週刊', 'ランボルギーニカウンタック LP500S', '"ランボルギーニカウンタック LP500S" 70年代半ばにさっそうと登場し、日本人の心をわしづかみにしたスーパーカーの代名詞。 \n目にも鮮やかなレッド、リアウイング、スイングアップドアといった個性溢'],
 ['DeAgostini', '隔週刊', 'パッチワーク 改訂版', 'パターンレッスンと小物作りの２部構成だから初めてでも大丈夫！"パターン"とは、パッチワークを構成する図案のこと。パターン作りを通して、ゆがみのない美しい縫い方や、図柄をきれいに見せる縫 い代の倒し方など'],
 ['DeAgostini', '隔週刊', 'ラリーカーコレクション', '－伝説を乗せた永遠の名車－ 70年代～現在までの 新旧ラリーカーミュージアム級の コレクションをあなたの手に ラリーの歴史を彩ってきた究極のレスポ ンスを競うレース仕様のマシンを貴重な 情報と共に精密'],
 ['DeAgostini', '週刊', 'スズキ HAYABUSA GSX1300R', '"究極"をコンセプトに開発された世界最速マシン「SUZUKI GSX1300R \nハヤブサ」。ハイスペックでありながら、抜群の安定性と運動性能を誇り、1999年の発売以来、世界中のライダーを魅了し続け'],
 ['DeAgostini', '隔週刊', '新刑事コロンボDVDコレクション', '「新・刑事コロンボ」もカバーしたコレクションがついに登場！ 1968年の初登場から2003年の最終話まで、35年間にわたってヒットした『刑事コロンボ』。 その独特のキャラクターと斬新な ストーリー展開は'],
 ['DeAgostini', '隔週刊', '自衛隊モデル・コレクション', '陸・海・空が勢揃いする初めてのコレクション！！ \n隔週刊『自衛隊モデル･コレクション』は戦闘機、戦車、護衛艦など陸海空の各自衛隊が保有した主要装備の精巧なスケールモデルが、毎号1 つ付属するマガジンシリ'],
 ['DeAgostini', '隔週刊', 'ハーレーダビッドソン・プレミアムコレクション', 'アメリカン・ブランドの伝説のハーレーダビッドソン。 \n名車たちと100年を超える歴史を精巧な1/24スケールのダイキャストモデルと貴重な写真でビジュアル豊富に解説したマガジンでたどるコレクションシリー'],
 ['DeAgostini', '週刊', 'マクロス・クロニクル 新訂版', '1982年からTVアニメとしてスタートし30周年を迎えた『超時空要塞マクロス』から最新作『マクロスFB7オレノウタヲキケ！ \n』まで、全ての作品を徹底網羅したオフィシャルファクトファイルで す。 \n「リ'],
 ['DeAgostini', '週刊', '日本の城', '週刊「日本の城」は日本全国の城の当時の姿を再現した復元 CG \nや内部の断面図、古絵図、古写真など、貴重なビジュアルを多用しながら、あらゆる角度から城の魅力をつぶさに伝えるマガジンです。 専用リングバ'],
 ['DeAgostini', '週刊', '戦艦大和を作る 改訂版', '週刊「戦艦大和を作る」は、毎号付属の金属･木製パーツを組み立てると、世界最大最強といわれ、日本海軍の象徴であった｢戦艦大和｣(1/250スケール)が完成するマガジンシリーズです。 \n本シリーズでは、沖'],
 ['DeAgostini', '週刊', 'そーなんだ！歴史編 改訂版', '「週刊 そーなんだ！」シリーズは、ふだんの生活の中でいだくそぼくな？を取り上げ、マンガやイラストをたくさん使いながら分かりやすくとき明かしていきます。 思わず「そーなんだ！」となっ とくしてしまう、楽し'],
 ['DeAgostini', '週刊', 'マクラーレン ホンダ MP4/4', '伝説のF1レーサー“アイルトン・セナ”に初タイトルをもたらした｢MP4/4｣は、1988年、全16戦中15勝の偉業を達成したF1最強マシンです。 \n本シリーズは、｢マクラーレン｣と｢ホンダ｣そして「セ'],  
 ['DeAgostini', '隔週刊', '銀河鉄道999 DVDコレクション', 'マガジンとDVDで楽しむ「銀河鉄道999」の世界 少年・星野鉄郎と、謎の美女メーテルの冒険を描いた「銀河鉄道999」は、1978（昭和53）年9月から放送されたSFテレビアニメです。 『銀河鉄道999'],
 ['DeAgostini', '週刊', 'HMSヴィクトリーを作る', '帆船模型ファン憧れのヴィクトリー号をあなたの手で。 \n1805年、「トラファルガーの海戦」でホレーショ・ネルソンが旗艦としたヴィクトリー号を、ミュージアムモデル級の大迫力模型として再現します。帆船模型'],
 ['DeAgostini', '隔週刊', 'コンバット・タンク・コレクション', '精密モデルと詳細な解説で迫る、戦車&装甲戦闘車両の進化と戦いの歴史！ \n存在感あふれる精密モデルと貴重な写真や詳細な解説が満載されたマガジンで、戦車＆装甲戦闘車両の魅力を余すところなく伝えます。技術的'],
 ['DeAgostini', '週刊', '歴史のミステリー 改訂版', '週刊『歴史のミステリー』は、古代から現代に至るさまざまな事象について、その真偽を含めた多くの謎や疑問を掘り起こすことによって、歴史の知られざる一面に迫るビジュアルマガジンシリーズで す。 \n歴史書といわ'],
 ['DeAgostini', '週刊', 'ディズニー・パレード', 'パレードが始まる！ ディズニー・ワールドのとびきりすてきなエンターテインメントをあなたに。ミッキー、プーさん、シンデレラ、アリス… \n楽しくかわいいフロートの数々が夢と魔法でいっぱいのパ ークの中を音楽'],
 ['DeAgostini', '隔週刊', 'ブルーノート・ベスト・ジャズコレクション', '『BLUE NOTE best jazz \ncollection』では毎号1人のアーティストを取り上げて、その生き様や〈ブルーノート〉での活躍、〈ブルーノート〉の歴史を紐解いていくCD付きマガジ ンシリ'],
 ['DeAgostini', '週刊', '日本の100人 改訂版', '100人のドラマで紐解く日本の歩み『週刊 日本の１００人 \n改訂版』は、古代から現代にいたるまで、日本の歴史を語る上で欠かすことのできない人物を時代やジャンルを問わず、１００人とりあげ、その ひとりひと'],
 ['DeAgostini', '週刊', '蒸気機関車D51を作る', '待望のD51本格スケールモデルが誕生。 \n｢D51｣は、わが国の蒸気機関車の代表と言える機関車で、蒸気機関車の代名詞として、四国を除く日本全国で活躍しました。本シリーズは、その｢D51標準形｣の重厚 感'],
 ['DeAgostini', '週刊', 'ガンダム パーフェクト・ファイル', '様々な時代や世界を超えて描かれているガンダムの物語。 そこに登場する白いモビルスーツは、戦いの象徴なのか、それとも希望の象徴となるのか？想いを叶えるために人々が踏み出した一歩が新たなる物語を紡いでゆく'],
 ['DeAgostini', '週刊', '和時計をつくる', '当時の機構を忠実に再現した『和時計』復刻モデル 西洋の機械時計をもとに、江戸の職人たちによって改良が重ねられ、発展をとげた和時計。 \n当時の人々の"不定時法"の生活に合わせるために、日本ならではの独自'],
 ['DeAgostini', '週刊', 'もっとデジイチLIFE', '週刊『もっとデジイチLIFE』では、デジタル一眼カメラの使い方はもちろんのこと、さまざまなシーン別撮影のプロセスをステップ・バイ・ステップで毎号紹介。撮影テクニックを基礎から応用まで少しずつ学べ、さら'],
 ['DeAgostini', '隔週刊', 'パッチワーク', '「隔週刊 \nパッチワーク」は、楽しみながら自然にパッチワークのテクニックが身につくマガジンシリーズです。毎号ベーシックなパッチワークのパターンを１つ作ります。 \nまた、｢ティッシュボックスカバ ー｣｢ポ'],
 ['DeAgostini', '週刊', 'ロボゼロ', 'ロボットヒーローを彷彿させるスタイリッシュな外観そのままに、素早い動きと軽やかな身のこなし、安定したバランスで抜群の運動性能を発揮する"ROBO \nXERO"。様々なアクションを可能にする先進的な機能'],    
 ['DeAgostini', '隔週刊', '名探偵ポワロ DVDコレクション', '“ミステリーの女王”アガサ・クリスティーが生み出した、名探偵エルキュール・ポワロ。このおしゃれでキザなベルギー人探偵が、解き明かすトリックの数々！ 魅力的で難解な事件を、ビジュ アル満載のマガジンととも'],
 ['DeAgostini', '隔週刊', 'NHK 名曲アルバム CDコレクション', '隔週刊『ＮＨＫ名曲アルバム \nＣＤコレクション』は、ＮＨＫで30年以上続いている人気番組『名曲アルバム』で放送された珠玉の名曲を収録したＣＤと、解説やエッセイを収めたビジュアル豊富なマガジンがセットに'],
 ['DeAgostini', '週刊', '戦国甲冑をつくる', '「週刊 戦国甲冑をつくる」は当時の伝統工芸の粋を集めて作られた政宗の甲冑を 同時代・同型の甲冑も詳細に調査・研究しながら復元し、当時と同じ素材、技法を随所に用いて再現。 1/2スケールの本格甲冑模型を'],
 ['DeAgostini', '週刊', 'コメディドラマで ENGLISH', '『週刊 コメディドラマで \nENGLISH』は、ドラマで使われている日常会話を見て、聞いて、発音練習をするだけで、海外旅行やビジネスでの日常会話など、ネイティブの生きた英語を身に付けられる シリーズです'],
 ['DeAgostini', '隔週刊', '日本の古寺・仏像 DVDコレクション', '『隔週刊 日本の古寺・仏像 \nDVDコレクション』は、毎号マガジンとともに提供するDVDには、寺院で撮影された美しい映像が収録されています。伽藍の佇まい、日本建築の様式美、仏像の魅力などを映像で細部に'],
 ['DeAgostini', '隔週刊', '大草原の小さな家 DVDコレクション', 'アメリカ人作家ローラ・インガルス・ワイルダーの自叙伝的小説をドラマ化した「大草原の小さな家」は、1974年の放送開始直後から全米で賞賛を浴び、1983年までに9シーズンにわたって 製作された大ヒットドラ'],
 ['DeAgostini', '週刊', 'マクラーレンMP4-23', '「MP4-23」は、2008年にデビュー2年目にしてF1史上最年少でシリーズチャンピオンとなった「ルイス・ハミルトン」の快進撃を支えたマシンです。 \n最先端のテクノロジーを結集した「MP4-23」を生'],   
 ['DeAgostini', '隔週刊', '鬼平犯科帳DVDコレクション', '傑作時代劇『鬼平犯科帳』の魅力満載、ファン必見のＤＶＤマガジン化！ \n『鬼平犯科帳』は、江戸時代に実在した火付盗賊改方長官｢長谷川平蔵｣をモデルに、昭和を代表する作家・池波正太郎が描き出した時代小説シ'],
 ['DeAgostini', '隔週刊', 'バレエDVDコレクション', 'わかりやすいビジュアルマガジンと美しいDVDで、バレエの魅力に酔いしれる。 『隔週刊 \nバレエDVDコレクション』は世界のバレエの名作・名演を紹介するDVDコレクション・シリーズです。ダンサーの磨き抜'],
 ['DeAgostini', '週刊', 'ホンダ CB750FOUR', '1969年。当時最高の技術の粋を集約し、ホンダが世界のバイク市場に向けて発表した「Honda DREAM CB750 \nFOUR（K0）」。大排気量4気筒エンジンの咆哮と、その圧倒的な存在感に全世界が'],
 ['DeAgostini', '週刊', 'ハマーH1 ラジコンカー', '軍用車の流れを汲むハマーH1は、その特徴を色濃く残し、一般的なSUVとは一線を画した風 格で、ファン垂涎の的となっています。そのH1を、骨太な外観・スピード・走破力まで実 車さながらにラジオコントロー'],
 ['DeAgostini', '週刊', '戦国武将データファイル', '『週刊 \n戦国武将データファイル』は応仁の乱から始まる日本の戦国時代において天下の覇権を巡って戦いを繰り広げた名代の戦国武将たちを網羅したマガジンシリーズです。 \n戦国時代に活躍した300名以上にのぼ'],
 ['DeAgostini', '週刊', '航空母艦 赤城を作る', '空母機動部隊の旗艦であり、日本初の大型空母として知られる「航空母艦赤城」。太平洋戦争初期、欧米列強国の艦艇に対して破竹の連勝を収めたことで「世界最強」と恐れられ、数々の輝かしい戦歴を残 し最強空母艦隊の'],
 ['DeAgostini', '週刊', '野鳥の世界', '『週刊 \n野鳥の世界』は、バードウォッチングや野鳥を楽しむための情報を、美しく、躍動感あふれる写真やイラストとともに紹介するマガジンシリーズです。野鳥の生態や行動、習性、見分け方、観察できる場所 を丁寧'],
 ['DeAgostini', '週刊', 'スパイ大作戦 DVDコレクション', 'TVドラマ『スパイ大作戦』は、1966年からアメリカのCBSネットワークで7シーズンにわたっ て放送され、日本でも1967年から放送が開始されました。本部から指令された「遂行不可 能と思われる作戦＝ミ'],
 ['DeAgostini', '週刊', '宇宙戦艦ヤマト オフィシャル・ファクトファイル', '本シリーズは、1974年にTV放映された「宇宙戦艦ヤマト」から、2009年12月12日より公開さ れた、劇場用アニメーション映画「宇宙戦艦ヤマト・復活篇」まで、全ての作品を徹底網 羅したオフィシャルフ'],
 ['DeAgostini', '隔週刊', '日本のうた こころの歌 改訂版', '『隔週刊 日本のうた \nこころの歌』は、童謡・唱歌・抒情歌など、故郷への想いを綴った歌や、美しい自然と四季折々の歌、スコットランド・ロシア民謡といった日本人に親しまれてきた海外の歌まで、毎号7～8曲ず'],
 ['DeAgostini', '週刊', 'エヴァンゲリオン・クロニクル 新訂版', 'GAINAX完全監修、エヴァ専用公式ガイドブック！エヴァンゲリオンの世界を様々な角度からエヴァの魅力を余すところなく徹底解説するマガジンシリーズです。本誌では、重厚なストーリ ー、EVAや登場人物、使徒'],
 ['DeAgostini', '週刊', 'フェラーリF2007ラジコンカー', '『週刊フェラーリ F2007 ラジコンカー』で組み立てるフェラーリ「F2007」は、2007年のF1シーンでワールドチャンピオンに輝いたマシン。 \n1/7スケールで再現した本格的なエンジンラジオコン ト'],
 ['DeAgostini', '週刊', '江戸', '「週刊 \n江戸」は、大河ドラマや歴史小説などでもなじみの深い「江戸時代」に焦点を当てたマガジンシリーズです。7つの章からなる本誌は、歴史上の主な出来事の解説に加え、当時の諸国事情、庶民の暮らしなど、様'],
 ['DeAgostini', '週刊', 'そーなんだ！歴史編', '「週刊 そーなんだ！ 歴史編」では、日本史と世界史それぞれの知っておきたいポイントや、学校 では教えてくれない歴史の知られざる一面を紹介。見やすく分かりやすいオールカラーのページや、見開き の特大イラス'],
 ['DeAgostini', '週刊', '松本清張', '本シリーズは、昭和の文豪、松本清張とその名作の魅力を再発見できるシリーズです。第1号から第12号では、厳選した作品を毎号1つ取り上げ、その解説はもちろん、作品のバックボーンとなった清張の貴重な取材メモ'],
 ['DeAgostini', '隔週刊', '東宝特撮映画DVDコレクション', '1954年公開の「ゴジラ」は見たこともない特殊撮影とドラマチックで重厚なストーリーで当時の観客たちの心を捉えました。その後次々と公開された東宝特撮映画は、映画黄金期を代表する娯楽 の王道として卓越したイ'],
 ['DeAgostini', '隔週刊', 'DVDオペラ・コレクション', '本シリーズはオペラの本場ヨーロッパを中心に、世界中から集められた名演をDVDに収録したコレクション・シリーズです。DVDに登場するのは、一流の歌手、指揮者、オーケストラばかり。もちろん 、世界屈指の才能'],
 ['DeAgostini', '週刊', '零戦をつくる', '太平洋戦争前半の快進撃を支え、日本の主力機として最も輝いていた時代の零戦、『零式艦上戦闘機二一型』。徹底した機体の軽量化と空力的洗練が施され、当時の日本の技術の粋を集めて作られたその勇姿を、かつてない'],
 ['DeAgostini', '隔週刊', 'Xファイル DVDコレクション 改訂版', '『Xファイル』は1993年から全米で放映された超常現象を題材にした人気ドラマです。アメ リカ連邦捜査局（FBI）に保管された「The X-Files」（超常現象が関係しているとされる 未解決 事件簿）に'],
 ['DeAgostini', '週刊', 'ウルトラマン オフィシャルデータファイル', '『週刊ウルトラマンオフィシャルデータファイル』は、1966年にテレビ放映が開始された 「ウルトラQ」から、最新作の「大決戦！超ウルトラ8兄弟」まで、テレビ版・劇場版を問 わ ず全てのウルトラシリーズの作'],
 ['DeAgostini', '週刊', 'ディズニー・ドリーム・ファイル', '世界中の子どもに、そして大人にも、夢と希望、愛や冒険の喜びを提供し続けてきたウォルト・ディズニー。 \n『週刊ディズニー・ドリーム・ファイル』は、世界中で愛されているキャラクタ ーたちの詳細なデータや、ア'],
 ['DeAgostini', '週刊', 'わが家で和食改訂版', '数々の料理番組をレギュラーに持ち、料理本の執筆も手がける土井善晴氏が監修を手掛けるレシピマガジンシリーズです。 \n和食の基本からひと手間かけた和食まで、食材の力を上手に引き出す新しい調理 法やプロならで'],
 ['DeAgostini', '週刊', 'CSI:DVDコレクション', '全世界で高視聴率を記録し続けるTVドラマ「CSI：科学捜査班」から、毎号2話を収録したDVDと、DVDに収録されたエピソードや、科学捜査に関連する様々な情報を紹介するシリーズです。ドラマのエピソー ド解'],
 ['DeAgostini', '週刊', '安土城をつくる', '天下統一を目前に控えた織田信長が、当時の建築技術と贅を尽くして築きあげた安土城。 日本の城の中でもっとも豪華であったと言われ、後世の城建築にも多大な影響を残しました。 しかし完成わずか3年後、 信長が本'],
 ['DeAgostini', '週刊', '天体模型・太陽系を作る', '最新の学説に基づいた正確な太陽系の運行を示す天体模型（太陽系儀ともいう）のパーツと、太陽系の惑星や宇宙科学を紹介するマガジンがセットになったシリーズです。毎号付属のパーツを組み立てることにより、金属製'],
 ['DeAgostini', '隔週刊', '『東映時代劇 傑作ＤＶＤコレクション', '東映時代劇の傑作をDVDとマガジンで！ 隔週刊『東映時代劇 \n傑作DVDコレクション』は、面白さを前面に打ち出し、人々の一大娯楽として昭和三十年代にブームを巻き起こした東映時 代劇映画の傑作を、DVDで'],
 ['DeAgostini', '隔週刊', '落語百選ＤＶＤコレクション', '江戸時代から明治時代にかけて創作された古典落語をマガジンで解説し、DVDで演目そのものを見ることができるまったく新しい落語マガジンシリーズです。DVDには、このシリーズのためだけに演じられた実力派真打'],
 ['DeAgostini', '週刊', 'そーなんだ！3訂版', '「週刊 そーなんだ！」シリーズは、ふだんの生活の中でいだく素朴な疑問(なぜ？)を 取り上げ、マンガやイラストをたくさん使いながら分かりやすく解き明かしていきます。 思わず「そーなんだ！」と納得してしま'],
 ['DeAgostini', '週刊', 'そーなんだ！社会編 改訂版', '「首相と大統領はどう違うの？」「日曜日はどうして休みなの？」といった、世の中の仕組みに関する素朴な疑問を、マンガとコラムで丁寧に分かり易く解き明かします。毎号、6つの章の中から5つ ずつ取り上げます。さ'],
 ['DeAgostini', '隔週刊', 'スターゲイト DVDコレクション', '「隔週刊 スターゲイト DVDコレクション」は、「スターゲイト・SG-1」の 10シリーズ（全214話）と、スピンオフシリーズである「スターゲイト アトランティス」の3シリーズ（全60話）を毎 号3話ず'],
 ['DeAgostini', '週刊', 'フェラーリグランツーリズモ', '毎号付属するパーツを組み立てることで、「エンツォ・フェラーリ」の1/10スケールのダイキャストモデル（全長:470mm、重量:4.9kg）が完成します。「エンツォ・フェラーリ」はフェラーリ社 \n 創始者'],
 ['DeAgostini', '週刊', '仮面ライダーオフィシャルデータファイル', '1971年にテレビ放映を開始した、第1作「仮面ライダー」をはじめとする所謂「昭和ライダー」から、「仮面ライダークウガ」からスタートし現在も放送が続いている「平成ライダー」 まで、テレビ版・劇場版を問わず'],
 ['DeAgostini', '隔週刊', 'クール・ジャズ・コレクション', 'ジャズを聴く気分 それは楽しいとき リラックスしたいとき 落ち込んだとき スペシャルなと… どんなシーンにもスッと溶け込んでくれる それが JAZZ 初めて聴いた曲なのに懐かしい 何回も聴いたのに新し'],
 ['DeAgostini', '隔週刊', '世界名作劇場DVDセレクション', '昭和50年から22年間にわたって放送され、多くのファンから愛され続けたアニメ「世界名作劇場」。その中でも特に人気の3作品『フランダースの犬』、『母をたずねて三千里』、『あらいぐまラスカル』が隔週刊の「'],
 ['DeAgostini', '隔週刊', '科学忍者隊ガッチャマンDVDコレクション', '昭和47年に大人気を博したTVアニメ「科学忍者隊 \nガッチャマン」のシリーズ3部作・全205話を毎号3話ずつ収録したDVDと、読み応えたっぷりのマガジンがセットになったシリーズです。リアルなメカデザイ'],
 ['DeAgostini', '週刊', 'パティシェと作るケーキアンドデザート', '国内外で活躍する有名パティシエ約50名のケーキ＆デザートのオリジナルレシピを取り上げ、一流パティシエたちのとっておきのテクニックが習得できるマガジンです。レシピ以外にも様々な情報を網羅し、お菓子作り初'],
 ['DeAgostini', '週刊', 'マイ・ミュージック・スタジオ', '読み込んでいます...'],
 ['DeAgostini', '週刊', '歴史のミステリー', '誰もが知っている史実から、いまだに解明されていない謎に満ちた出来事まで、歴史に潜む数々の謎を取り上げ、これまで通説とされてきた歴史認識を再検証し、歴史の真相を読み解くマガジンシリーズ。全号揃えると歴史'],
 ['DeAgostini', '隔週刊', '地球の鉱物 コレクション', '『隔週刊地球の鉱物コレクション』には、世界中の様々な自然の鉱物・鉱石が毎号付いてきます。 創刊号は、紫水晶とも呼ばれ、2月の誕生石としても知られる「アメシスト」。シリーズでは、鉱物 コレクターを魅了する'],
 ['DeAgostini', '週刊', 'ハーレーダビッドソン', '世界中に熱狂的なファンを抱えるハーレーダビッドソン。ウィスコンシン州ミルウォーキーで産声をあげた小さな工場から、世界的な巨大メーカーへと成長した同社の歩みは、そのままアメリカのバイク史にも重なります。'],
 ['DeAgostini', '隔週刊', '刑事コロンボDVDコレクション', '1968年の初登場から約10年にわたってヒットした『刑事コロンボ』。その独特のキャラクターと斬新なストーリー展開は、今なお世界中で愛されています。『刑事コロンボ \nDVD \nコレクション』は、シリーズ'],
 ['DeAgostini', '週刊', '昭和タイムズ', '昭和――それは、日本という国が、かつてない劇的な歴史を刻んだ日々であり、今を生きる私たちの、すべてにおける礎となった時代でもあります。戦争、復興、高度経済成長……それぞれの社会を彩った、64年間にわた'],
 ['DeAgostini', '週刊', 'マイディズニーランド', '読み込んでいます...'],
 ['DeAgostini', '週刊', '蒸気機関車Ｃ62を作る', '付属のパーツを組みたてると、わが国の蒸気機関車の中でも絶大な人気を誇り、圧倒的なパワーと力感に満ちた独特のプロポーションを備えた旅客機関車「C62型2号機」のスケールモデルが完成します。完成サイズは1'],
 ['DeAgostini', '隔週刊', 'ハリーポッターチェスコレクション', '本誌の付録で付いてくるチェスの駒は、映画「ハリー・ポッターと賢者の石」の１シーンで登場する魔法のチェスを再現。ハリーたちが使っていたのと同じチェス駒は、魔法で動いたり、大きな音を立てたり、映画のように'],
 ['DeAgostini', '隔週刊', 'ピーターラビットコレクション', '「ピーターラビット」をはじめ、可愛いらしいキャラクターや魅力的なシーンが描かれたテーブルウェアを毎号付属します。テーブルウェアは、陶磁器の中でも高級感が溢れる色彩と滑らかな光沢を持った“ボーンチャイナ'],
 ['DeAgostini', '隔週刊', 'ファイティングエアクラフトDVDコレクション', '鮮やかな3Dコンピューターグラフィックや大迫力の実写映像を駆使したDVDと、パイロット自らが語る、臨場感あふれるビジュアルマガジンで、ファンの記憶に永遠に残る“大空の 戦士”たちの魅力を徹底解説します。'],
 ['DeAgostini', '週刊', 'ヨーロピアンパレス', '毎号付属のパーツを組み上げると、中世ヨーロッパの邸宅を連想させる壮麗で豪華なドールハウスが完成します。サイズは、1/12スケール（高さ91cm×幅87cm×奥行42cm）にも及びます。デザインは、フラ'], 
 ['DeAgostini', '週刊', '古代文明ビジュアルファイル', '「世界四大文明」をはじめ、世界各地に点在した40以上もの古代文明や王朝を、遺跡や伝説から多角的な視点でビジュアル豊かに、その真の姿をひもとくマガジンシリーズです。世界を8つの大陸に 分類し、「ローマ帝国'],
 ['DeAgostini', '週刊', 'アーティストジャパン', '『選び抜かれた日本絵画の巨匠60人。魅力あふれる豪華コレクション。』葛飾北斎、横山大観、尾形光琳、雪舟、東山魁夷、竹久夢ニ、東洲斎写楽等、毎号特製バインダーに綴じこんでいけば、絵画や版画を気軽に楽しめ'],
 ['DeAgostini', '週刊', 'しあわせ♪クッキング改訂版', '作って食べて、心も体も健康になる服部流レシピを、毎号ご紹介していきます。料理の基本、栄養バランス、食材をおいしく使う効果的な方法まで、料理をしながら身に付く新家庭料理百科シリーズ です。2003年に創刊'],
 ['DeAgostini', '週刊', 'ロボザック', '自分で組み立てる２足歩行ロボット「RZ-1」！『週刊 \nロボザック』では、驚きの運動性能をもつヒューマノイドロボットが簡単に制作できます！入門用アクションデータを使いこなしたら、好きな動作を自分でカ ス'],
 ['DeAgostini', '隔週刊', 'ミレニアムＤＶＤコレクション', '1996年にアメリカFOXテレビで放映された猟期犯罪を扱ったサイコサスペンスドラマ。新たな世紀の到来に、漠然とした不安が世界を覆うなか、次々と発生する猟奇犯罪の数々。 \n――事件の真相は、人間自身の心'],
 ['DeAgostini', '隔週刊', 'ビーズアクセサリー', '毎号2種類のビーズ・アクセサリーの材料、ツールのキットと、各アクセサリーの作り方を写真で分かりやすく解説するマガジンがセットとなっています。マガジンでは、ビーズやパーツなどアクセサリー キットの名前から'],
 ['DeAgostini', '週刊', 'フェラーリラジコンカー', 'F2004――それは、ドライバーとコンストラクターズの両部門で、ワールドチャンピオンに輝いた世界最高峰のF1マシン。その名門フェラーリのメモリアルモデルが、究極のRCカーでよみがります。本格的 なメカニ'],
 ['DeAgostini', '隔週刊', 'ハローキティ・アクセサリーコレクション', '飾って、身につけて、いつもキティをあなたのそばに。ハローキティ・アクセサリーコレクションのシルバーチャームは、ブレスレット、ネックレス、ピアス、 \nイアリング、ブロ ーチ、携帯ストラップ……さまざまなア'],
 ['DeAgostini', '隔週刊', 'スタートレック ベストエピソード コレクション', '壮大なスケールの「スタートレック」シリーズから、独自のテーマで選んだ三作品をDVDに収録！ マガジンは、撮影秘話・俳優インタビュー・収録作品の解説などで「スタートレック」の世界に迫ります。 『スタート'],
 ['DeAgostini', '週刊', '読み込んでいます...', '本誌は「首相と大統領はどう違うの？」「日曜日はどうして休みなの？」といった、習慣化されてはいるけれど実は「なぜ(?)」だかはっきり分からない世の中の疑問を、毎号5つずつ取り上げ、マンガとコ ラムで丁寧に'],
 ['DeAgostini', '週刊', 'マイロボット', '『週刊 マイロボット』は、2003年に販売し、創刊号が19万部もの大ヒットを記録した『週刊 \nリアルロボット』の好評を受け、さらに高性能・多機能の本格的なロボットを作りたいというロボットファンの声に応'],
 ['DeAgostini', '隔週刊', '青春のうた ベスト・コレクション', 'ギターを平和の象徴とした時代、若者の中から“生まれてきた”フォークソング。1960年代後半～80年代初頭は、自ら創り自ら歌うという新しいスタイルを確立したフォークソングが、多くの 若者の心に絶大な影響を'],
 ['DeAgostini', '週刊', '日本の100人', '古代から現代に至るまで、日本の歴史を語る上で欠かすことのできない人物を時代やジャンルを問わず、100人取り上げ、その一人ひとりの生涯を振り返ることによって、日本という国の歩みをひもといていくビジュアル'],
 ['DeAgostini', '隔週刊', '美空ひばりこころの歌', '日本人の心の中に、今も生きつづけている昭和の歌姫・美空ひばり。『隔週刊 \n美空ひばりこころの歌』は、ひばりの誕生から晩年までの、豊富な写真と魅力的なエピソードを満載したマガジンと、ヒ ット歌謡から演歌、'],
 ['DeAgostini', '隔週刊', 'ゴールデン・ポップス', 'CD付洋楽マガジンシリーズ。1950年～1970年代前半のアメリカのポップスを中心に、この年代流行した曲を当時の時代背景やヒットの裏話等と一緒に紹介。CDは世界メジャーレーベルオリジナル音源を使用。プ'],
 ['DeAgostini', '週刊', 'わが家で和食', '伝統和食から現代風まで、食卓に「おいしい！」が並ぶ新感覚和食百科！今、和食は世代を問わず幅広く見直されています。それは、和食がヘルシーでありながら食材がもつ風味や力を大切に、毎日食べても決してあきるこ'],
 ['DeAgostini', '週刊', '戦艦大和を作る', '毎号付いてくるキットを組み立て、1/250スケール（全長105.2cm/全高28.9cm/全幅15.5cm）の精密な戦艦大和の模型を作るクラフトマガジンシリーズです。組み立ては、わかりやすいステップ・'],
 ['DeAgostini', '隔週刊', '世界の昆虫データブック', '日本をはじめとする世界の昆虫の生態や習性、体のつくり、さらには昆虫採集や標本づくりのテクニックなどを詳細なデータに加え、見やすい写真やイラストを使いながらわかりやすく紹介するマガジンと、体のしわや毛の'],
 ['DeAgostini', '隔週刊', '泣いてたまるかDVDコレクション', '昭和41年4月から全国で放映された、渥美清主演の一話完結式ドラマです。後に『男はつらいよ！』で大ブレイクする渥美清が「一生懸命、歯を食いしばって生きながらも報われない、不器用が故に割を食う男」を好演。'],
 ['DeAgostini', '隔週刊', 'Xファイル DVDコレクション', '我々の住むこの世界には、常識では計り知れない、超常現象と呼ばれる、想像を超えた真実がある。その真実に迫る、1993年から2002年まで全米で放映された『Xファイル』は、実際に起こった事件や現象を背景に'],
 ['DeAgostini', '隔週刊', 'ディズニーのマジックイングリッシュ', 'みんながよく知っているディズニーのアニメーションを見ながら、その会話をくり返し聞くうちに、英語がわかるようになります。さあ、ディズニーの仲間たちと英語の世界へ遊びに行こう！ディズニーの魔法で英語が楽し'],
 ['DeAgostini', '週刊', 'インサイド・ヒューマンボディ改訂版', '実際の医療現場で行われている先端の診断と医療法に迫る、ビジュアル医療マガジンです。また、人体のしくみ、人の生命、身近な病気、薬など現代医学にまつわるあらゆるデータを網羅。特製バインダーにファイリングす'],
 ['DeAgostini', '隔週刊', 'インサイド・ヒューマン・ボディ DVDコレクション', '信頼のあるDiscovery Health \nChannelのプログラムをDVD化。本邦未公開映像も含まれます。手術シーンなど医療現場の生の映像を収めた貴重な映像資料です。'],        
 ['DeAgostini', '週刊', 'そーなんだ！改訂版', '『週刊そーなんだ！』はみんなのいろいろな不思議（？）をそーなんだ（！）にかえる科学マガジンです。ナビゲーターのガリレオ博士をはじめ楽しいキャラクターがいっぱい登場して、みんなに分かりやすく解説！200'],
 ['DeAgostini', '週刊', '和風ドールズハウス', '毎号付いてくるパーツを組み立て、壮麗な4層3階建ての木造日本旅館のミニチュア（1/20スケール。高さ66cm×幅79cm×奥行39cm）と、情緒ある家具や調度品を手作りするクラフトマガジンです。古きよ'],   
 ['DeAgostini', '週刊', 'ガンダム・ファクトファイル', 'ファーストの放映開始から25周年、ガンダムシリーズの全てを網羅する初の完全ファイルマガジンがいよいよ発動！『週刊 \nガンダム・ファクトファイル』は、ガンダム全14シリーズの魅力をあら ゆる角度から徹底詳'],
 ['DeAgostini', '隔週刊', '世界遺産DVDコレクション', '地球と人類の壮大なロマンが体感できる！マガジンとDVDで楽しむ人類の遺産への旅――『隔週刊 \n世界遺産DVDコレクション』は毎号、地域ごとに3つの世界遺産を映像と誌面で解説。本誌とセットに なったDVD'],
 ['DeAgostini', '隔週刊', 'チャンピオン･バイク･コレクション', '世界最高峰の二輪レースMotoGP、鈴鹿やカタルニアなどのサーキットで数々のドラマを繰り広げたレーシングバイクをテーマにしたマガジンと、ファンの記憶に永遠に残るチャンピオン・レーシング・バイクを精密に'],
 ['DeAgostini', '隔週刊', '水彩で描く', '心にひびく絵を描くコツとポイントを画材の使い方、色の使いこなし、デッサンなど8つの章で分かりやすく解説。しかも毎号必要な画材が付録としてつきますので、すぐにレッスンを始められ、毎号そろえると画 材コレク'],
 ['DeAgostini', '週刊', 'レッツ！ピーシーライフ', '「同級生を探したい」「航空券を予約したい」「画像や音楽をダウンロードしたい」など、誰もがパソコンでやってみたかったことを難しいパソコン用語は使わず、楽しいイラストと写真を交えてわかりやすく徹底解説。初'],
 ['DeAgostini', '週刊', 'ラジコンCAR', '毎号組み立てるとほかでは手に入らない大人気のチャンピオンマシン、スバル・インプレッサWRC2001の超高性能R/Cカーが完成します（1/10スケール）。組み立ては写真入りの詳細なステップ解説で、初心者'],    
 ['DeAgostini', '週刊', 'アロマテラピー＆ナチュラルライフ', 'アロマオイルの使い方、セルフマッサージ、自然療法、ハーブのレシピ…。アロマテラピーと自然療法は心とからだにいい香りと自然の力であなたを癒します。初めての方も基礎からしっかり 学んで、実践できるヒーリング'],
 ['DeAgostini', '週刊', '鉄道 ＤＡＴＡ ＦＩＬＥ コレクション', '迫力の走行シーンを乗せて出発進行！風のように駆け抜ける特急列車、ブロアー音をうならせる電気機関車、ドレーンを切って進む蒸気機関車…。鉄道の魅力を存分にお楽しみいただける貴重な映像が満載のDVDコレクシ'],
 ['DeAgostini', '週刊', '鉄道 ＤＡＴＡ ＦＩＬＥ', '国鉄・JR・民鉄の車両、世界の名車両を豊富な写真や図解データでビジュアルに徹底解説。9つの章構成で、車両、駅、テクノロジー、歴史など鉄道に関するさまざまなトピックスを多角的に紹介してい きます。鉄道への'],
 ['DeAgostini', '隔週刊', 'ロード･オブ･ザ･リングシネマフィギュアコレクション', '映画の感動をリアルに再現したシネマメタルフィギュアを毎号、あなたのお手元に…。 「ロード・オブ・ザ・リング / \nシネマフィギュアコレクション」は、「ロード・オブ・ザ・リング」3部作に登場するキャラク'],
 ['DeAgostini', '週刊', 'ビジュアル日本の歴史 増補版', '2000年に創刊された『ビジュアル日本の歴史』の再刊行（増補）版。上段のマンガでストーリーを追いながら時代の流れを把握し、下段の写真解説で時代を象徴する出来事や人物について知るとい う、マンガと写真の一'],
 ['DeAgostini', '週刊', '漢方ライフ', '生命力を心地よく自然に高める――これが漢方の大きな特長です。「漢方ライフ」は、症状別、病気別の対処法・治療法から、家庭でできる薬膳・ツボマッサージ・気功体操などの実践法、漢方薬・薬草のプロフィールなど'],
 ['DeAgostini', '隔週刊', 'エアコンバット DVDコレクション', '『隔週刊エアコンバット・コレクション』と同時発売の隔週刊エアコンバットDVD \nコレクションでは、貴重な軍用航空機の飛行シーンを迫力の映像とサウンドで体感することができるシリーズです。'],
 ['DeAgostini', '隔週刊', 'エアコンバット･コレクション', '軍用航空機に焦点を当て、懐かしの名機から現代の最新鋭機までを各年代別に分けられた詳細な資料と特大イラストで徹底解剖したビジュアルマガジンです。さらに、世界の戦闘機を細密に再現 した本格的なコレクションモ'],
 ['DeAgostini', '週刊', '１００人', '人類の長い歴史を語る上で欠かすことのできない人物たちを国やジャンル、時代を問わず取り上げ、彼らの人生を通じて、私たち人類がこれまでにどのような歴史を歩んできたのかを振り返るビジュアルマガジンシリーズで'],
 ['DeAgostini', '週刊', 'リアルロボット', '知能を持つ本格的ロボット「サイボット」を組み立てるためのパーツと、ロボットワールドのあらゆる情報が詰まった楽しい本誌がセットになったテクノマガジンです。プログラミングで自分だけの知能ロボットに！'],
 ['DeAgostini', '隔週刊', 'ワールド・ウェポン DVDコレクション', '本誌で紹介される世界の兵器を、迫力ある映像とサウンドで再現。各巻一つの兵器を取り上げ、その兵器の開発から現在までさまざまな角度から解説。ビデオコレクションに加えて、保存に便利なDVDコレクションです。'],
 ['DeAgostini', '週刊', 'スタートレック -ファクトファイル', '1966年よりアメリカで始まったTVシリーズで映画でも大人気の「スタートレック」。全シリーズのあらゆる情報を網羅した公式ガイドが日本初登場！エピソード、宇宙船の図面、武器、未来テクノロジー、そしてユニ'],
 ['DeAgostini', '週刊', 'しあわせCooking', 'おいしくて体にいいレシピや料理の基本を服部幸應先生自らが手ほどき！毎週盛りだくさんのお料理情報をお届けします。特製バインダーにファイリングすれば、お気に入りのレシピ集ができあがります。'],  
 ['DeAgostini', '週刊', 'ワールド・ウェポン', '20世紀に開発された兵器を、分野ごとに取り上げ、そのプロフィールと各種データ、発展の歴史や基本システム、実戦での活躍を豊富な資料と写真で詳しく解説するビジュアル兵器大百科です。多角的に分析することによ'],
 ['DeAgostini', '隔週刊', 'ワールド・ウェポンビデオコレクション', '本誌で紹介される世界の兵器を、迫力ある映像とサウンドで再現。各巻一つの兵器を取り上げ、その兵器の開発から現在までさまざまな角度から解説。ビデオコレクションに加えて、保存に便利なDVDコレクションも発売'],
 ['DeAgostini', '週刊', 'セーリング・シップ', '毎号付属のキットを使って、どなたでも簡単に本格的な帆船模型作りが楽しめる、パーツ付きクラフトマガジンです。組み立てはわかりやすいステップ・バイ・ステップの説明となっておりますので、初めての方でも大丈夫'],
 ['DeAgostini', '週刊', 'そーなんだ！', '『週刊そーなんだ！』はみんなのいろいろな不思議（？）をそーなんだ（！）にかえる科学マガジンです。ナビゲーターのガリレオ博士をはじめ楽しいキャラクターがいっぱい登場して、みんなに分かりやすく解説！ \n'],
 ['DeAgostini', '週刊', 'スター・ウォーズ―ファクトファイル', '世界中で多くのファンをもつ名作映画「スター・ウォーズ」シリーズの既公開４作の世界を満載。世界初の公式スター・ウォーズデータマガジンがついに登場です。第２デス・スターの崩壊 から23年後、新共和国家元首か'],
 ['DeAgostini', '週刊', 'ニュー・ピーシー･サクセス', '「上手に操作したいのに、なぜつまずくのか…」週刊ニューPCサクセスはそれに答えた初級者向けのマガジンです。パソコンの初級者から上級者へステップ・バイ・ステップで必ず上達します。'],   
 ['DeAgostini', '週刊', 'スピーク・イングリッシュ', '発音チェックやロールプレイイングもできる厳選されたオーディオ教材、そして、専用webサイトでクイズ、ゲームで楽しく復習できるインターラクティブ英会話シリーズです。CD-ROM付きの特別版も 発売。'],
 ['DeAgostini', '週刊', 'ビジュアル源氏物語', '牧美也子氏の漫画でストーリーを追いながら、その周りの写真や図版解説で平安王朝の時代背景、ライフスタイルなどについて知ることができる斬新なページ構成で、難解とされてきた永遠の名作を読みこなします。原文と'],
 ['DeAgostini', '週刊', 'インサイド・ヒューマン・ボディ', '実際の医療現場で行われている先端の診断と医療法に迫る、ビジュアル医療マガジンです。また、人体のしくみ、人の生命、身近な病気、薬など現代医学にまつわるあらゆるデータを網羅。特製バインダーにファイリングす'],
 ['DeAgostini', '隔週刊', 'インサイド・ヒューマン・ボディ ビデオ版', '信頼のあるDiscovery Health \nChannelのプログラムをビデオ化。本邦未公開映像も含まれます。選りすぐりの手術シーンなど生の医療現場をテーマ毎に収録。'],
 ['DeAgostini', '週刊', 'ディズニー・ダイナソー', 'ディズニーの大ヒット映画「ダイナソー」のキャラクターが神秘の恐竜ワールドをナビゲート。豊富なイラストと資料で分かり易く恐竜達の特徴を紹介します。毎号ついてくる骨パーツを集めれば、光る恐竜の骨モデルが出'],
 ['DeAgostini', '隔週刊', 'トレジャー・ストーン', '地球の自然が生み出した宝石や鉱石の魅惑的な世界を紹介。宝石・鉱物のコレクションマガジンです。毎号、専用のバインダーでファイリングしていくと、知りたいことがすぐに引き出せるようになっています。また、毎号'],
 ['DeAgostini', '週刊', 'ニュー・イージー・ピーシー', 'パソコンに触れたことがない、家にあるんだけれど使い方がわからないなど、いまからパソコンを始めようというご家族のためのパソコン・コースです。分厚いパソコンの本や難解な操作手順ガイドと違って、いまのあなた'],
 ['DeAgostini', '週刊', 'マイ・ドールズ・ハウス', 'ドールハウスの名品を紹介する本誌と精巧なミニチュア・パーツがドッキング。毎号ついてくるキットを組み立てれれば豪華なビクトリア様式のドールハウスが完成します。パーツの組み立ては豊富な写真を使って、詳細に'],
 ['DeAgostini', '月刊', 'アート・コースビデオ', 'ビデオシリーズは、本誌で解説したテクニックや知識を用いながら、映像で楽しく学べるプログラムになっています。本誌とはひと味ちがった題材、応用ノウハウに挑戦してドローイングやペインティングのバリエーション'],
 ['DeAgostini', '隔週刊', 'アート・コース', 'ドローイング、水彩、油、アクリル……など、あらゆるジャンルのアートを基礎からステップ・バイ・ステップ方式で学んでいくシリーズです。マガジンに付いてくる画材を使って実際に絵を描きながら、色づかいのポイン'],
 ['DeAgostini', '週刊', 'ビジュアル日本の歴史', '石ノ森章太郎氏のマンガと共に時代の流れを追う､誰にでも親しみやすい歴史パートワーク。上段のマンガでストーリーを追いながら時代の流れを把握し、下段の写真解説で時代を象徴する出来事や人物に ついて知るという'],
 ['DeAgostini', '週刊', 'ピーシー・サクセス', '上手に操作したいのに、なぜつまずくのか……「ピーシー・サクセス」は、それに答えた初級者向けのパソコン・コース・マガジンです。ステップ・バイ・ステップ方式で確実にスキルアップ。毎号続けて読むことで、いつ'],
 ['DeAgostini', '週刊', 'ワールド･エア･クラフト', 'ファン待望！世界の航空機の完全データファイル！迫力満点のカラー写真＆詳細なイラストによるリアルな解説で懐かしい名機から最新機まで世界各国すべての機種を網羅します。検索に便利なオリジナル・ファイリング・'],
 ['DeAgostini', '週刊', 'イングリッシュ･フォー･ユー･プラス', '創刊から2年を迎え、ご好評をいただいている「週刊ニュー・イングリッシュ・フォー・ユー」に、新たに英語の習得度がレベルチェックできるセルフテストを収録したCDエクストラを加えてパワー・アップして登場した'],
 ['DeAgostini', '週刊', 'ホームガーデン', 'すでに新しいライフスタイルとして定着しつつあるガーデニング。そのガーデニングに、より楽しく、よりアクティブに取り組みたいと思っている人々に向けてお届けするのが、花と緑のガーデニング大百科「週刊ホームガ'],
 ['DeAgostini', '週刊', 'アートギャラリー', '西洋絵画の巨匠たちを毎号1人とりあげ、傑作を紹介するとともに、それらの作品が描かれた背景、画家の独特なスタイルや才能、そして技法などを細部にわたって解説していく、マガジン・シリーズです。ル ネサンスから'],
 ['DeAgostini', '週刊', 'イージー･ピーシー', 'パソコンを買っても、家族全員機械オンチ。使いこなせるのか？！誰か助けて！こんな声にお応えした、パソコンの「ホームドクター」が、「週刊イージー・ピーシー」。いちから始める初心者から、そろそ ろホームページ'],
 ['DeAgostini', '週刊', 'ザ・ムービー', '世界映画の100年を、タテからヨコから、楽しく編集。私の生まれた年には、どんな映画がはやったの？あの映画はどんな監督が撮ったんだろう？映画ファンなら知ってうれしい情報に加え、さらに“スクリーンの裏側”'],
 ['DeAgostini', '隔週刊', 'クラシック･コレクション (再刊行)', '大好評だった『隔週刊クラシックコレクション \nI』へのアンコールにお答えしたクラシックコレクションの第2弾！ますますパワーアップして手軽に本格的に音楽を楽しむためのラインナ ップが揃います。'],
 ['DeAgostini', '週刊', 'メディ･ファイル', '気になる病気も「かかるまで知らなかった」では困ります。どんな症状で、どんな予防をすればいいのか、あらゆる角度から丁寧に解説。家族のかけがえのない健康のために知っておきたい情報を分かり易くレ クチャーしま'],
 ['DeAgostini', '週刊', 'ドゥ･フォト', '瞬間を刻む。写真は今、さまざまな世代に受けいれられています。これからカメラをはじめる方、基本から知りたい方へ。基礎から始まてステップアップ、やがてプロのテクニックまでが習得できます。価値ある写 真を残す'],
 ['DeAgostini', '週刊', 'エックス･ゾーン', '日常から一歩外れたZONEには、いまだ解明できない、さまざまな謎が眠っています。超能力やUFO、心霊現象など、宇宙の謎と人間の未知の可能性に関する、驚異の事件を紹介。あらゆる不思議にスポットをあて、あ'],
 ['DeAgostini', '週刊', 'ニュー･イングリッシュ･フォー･ユー', '会話、読み書き、文法。英語習得のポイントをおさえ、CDとカセットで、どこでもリピート。BBC（英国放送協会）監修の楽しいテキストで、基礎から上級まで、あなたの目的にあった実力が身につきます。気軽に、家'],
 ['DeAgostini', '週刊', 'マーダー･ケースブック', '何が人を殺人犯へと変えるのか？犯行の裏にある心理は何か？作家コリン・ウィルソンをはじめとする世界の著名ライターが、犯罪心理学的アプローチを駆使して、偏見のない記述で、事件の本質を鋭く 描き出します。'],
 ['DeAgostini', '隔週刊', 'クラシック･コレクション', 'チャイコフスキー、ドヴォルザーク、ベートーベン。いつかどこかで耳にした名曲の数々、クラシック音楽の喜びを、気軽に味わってください。くわしい解説と、楽しく演奏できるやさしい楽譜もつ けて、雑誌形式でお届け'],
 ['DeAgostini', '週刊', 'グレート･アーティスト 再刊行', '偉大な画家の生涯と作品と、その創造の源を探ります。画家の生きた時代に深く切り込んだり、大きく5つのテーマから多面的なアプローチをすることで従来の画集にはなかった多面的なアプロー チが実現しています。10'],
 ['DeAgostini', '週刊', '恐竜サウルス', '見たい！知りたい！触りたい！迫力の3Dメガネで、大人もオドロく恐竜のリアルな姿が目の前に。付録のプラスチック・パーツもたのしみ。集めてすてきな恐竜大百科、遊んで学べて、お子様にも大好評でした。'],
 ['DeAgostini', '隔週刊', 'グレート･コンポーザー', '歴史に残る偉大な作曲家を深く理解するために、その生涯、作品鑑賞のための手引きなどを、当時の写真や絵画も盛り込んで編集。高音質CD付で、作曲家の魅力のすべてをあますところなく伝えます。'],
 ['DeAgostini', '週刊', 'ドゥ･アート', '初心者にも、ベテランの方にも、毎号新しい発見がある。今までにない実践的なガイドブックです。画材、技法の正しい基礎知識から、制作上のトラブル解決法までの大好評だったメソードは「隔週刊アートコース 」に引き'],
 ['DeAgostini', '週刊', 'エア･クラフト', '世界最高・最新の航空機情報を満載の航空百科。精密なイラストレーション、興味深くやさしい解説、豊富なカラーで航空機のロマンを目で楽しみ、読んで味わえます。デアゴスティーニ・ジャパンがお届けした 、日本にお'],
 ['DeAgostini', '週刊', 'ロビ 再刊行版', '2013年創刊の『ロビ』は、創刊早々に品切れになるほどの爆発的ヒット商品となりました。ご好評につき、再創刊いたしました。 \n『ロビ』は世界的に有名なロボットクリエイターの高橋智隆氏が、このシリーズのた'],
 ['DeAgostini', '週刊', 'ロビ', 'ロボットを組み立ててロボットと暮らそう。 「歩く」「言葉を理解し話す」「歌って踊る」人間らしい仕草や動きを表現！ \n週刊「ロビ」は毎号付属のパーツを組み立てると、愛くるしい動きや会話を楽しめるロボット'],
 ['Hachette', '週刊', '刺しゅうでつくる ピーターラビット™の世界', 'インテリアにぴったり！！ピーターラビット™の世界を題材にした素敵なオリジナルサンプラー※をつくりましょう。\n色とりどりの刺しゅう糸で毎号少しずつモチーフを刺していくシリーズです。\n\nピーターラビット™'],
 ['Hachette', '週刊', '装甲騎兵ボトムズ スコープドッグをつくる', 'キリコが、そして最低野郎ども（ボドムズ）が命を預け戦ったAT（アーマードトルーパー）の傑作機スコープドッグをお前の手で組み上げろ\n\n1983年に放送を開始したTVアニメ『装甲 騎兵ボトムズ』は、主人公キ'],
 ['Hachette', '週刊', '聯合艦隊旗艦 戦艦武蔵 ダイキャストギミックモデルをつくる', '大艦巨砲時代の最高傑作「武蔵」が最新の研究によって現代に蘇る\n\n大艦巨砲時代の最高傑作―46cm三連装主砲を3基も備えた世界最大の戦艦にして、太平洋戦争でもっとも長いあいだ日本海軍聯合艦隊の旗艦をつと'],
 ['Hachette', '週刊', 'ラビット スーパーフローS601をつくる', '富士重工業が1959（昭和34）年に発売し大ヒットモデルとなったスクーター、ラビット スーパーフローS601を徹底再現!!\n\n読者のみなさまによる熱い応援のおかげで、『スバル360をつく る』シリーズの'],
 ['Hachette', '隔週刊', '阪神タイガース実況CDマガジン', 'ラジオと雑誌の一体型マガジン登場。\n\n『阪神タイガース実況CDマガジン』はA.R.E.GOES ONを切に願うファンのためのスペシャル・マガジンです。\n勝敗に一喜一憂せず、選手を育てながらA.R.E.'],
 ['Hachette', '週二回', 'メタル・ギミックモデル バットモービル タンブラー', 'もっとも攻撃的かつ強靭、鈍く光る漆黒のボディにハイテク装備を搭載したバットモービル「タンブラー」\n可動、ライト、サウンド、そして1/8ビッグスケールで迫りくる タンブラー\nかんたん組み立て！\n\n『バット'],
 ['Hachette', '週刊', '宇宙戦艦ヤマト', '251号からパトロール艦の組み立てがスタート！発光ギミックが映えるスマートな艦影を作り上げよう!!\n宇宙戦艦ヤマト 地球防衛軍 パトロール艦\n\n依然として好評の本シリーズは、再度の延長が決定いたしま し'],
 ['Hachette', '隔週刊', '昭和落語名演 秘蔵音源CDコレクション', '昭和の落語家による名演の数々が未発売音源でよみがえる！\nPoint 1\nマガジンとCDで落語の名演を味わい尽くす！\n\n本書は、これまで発売されたことのない音源を中心に、古今亭志ん朝をはじめとする著名な'],
 ['Hachette', '週二回', 'メタル・ギミックモデル 幻の豪華客船 タイタニック号をつくる', '壮大な夢をのせた“世界最大”の豪華客船\n\n1912年4月のある夜、\n当時世界最大の客船「タイタニック号」が消息を絶った。\n現代にも語り継がれる、20世紀最 大の海難事故である。\nこの悲劇の裏には、\n乗員'],
 ['Hachette', '週刊', '週刊ガールズ＆パンツァーⅣ号戦車H型（D型改）をつくる', 'あんこうチーム、パンツァー・フォー！『ガルパン』のⅣ号戦車が究極のスケールモデルとして登場です！\n\n「女子高生と戦車」という、これまでになかったテーマを真正面から描いて10周年を迎えてもなお大ヒットを'],
 ['Hachette', '隔週刊', '昭和傑作テレビドラマDVDコレクション', '誰もが胸を熱くした青春ドラマの金字塔が時代を超えてDVDとマガジンでよみがえる！\n中村雅俊主演の青春ドラマ4作品をコンプリート\n\n1975年に放送され大ヒットを記録した『俺たち の旅』を筆頭に、『俺たち'],
 ['Hachette', '週刊', '週刊ディズニーマジカルミュージックシアター', 'ディズニー映画の名シーンをミニチュアで再現 動きと光と音で楽しむシアターオブジェをつくりましょう\n\n時代を超えてたくさんの夢を与えつづけてくれるディズニ－・アニメー ション。\n厳選された心に残る名シーン'],
 ['Hachette', '週刊', 'アルカディア号ダイキャストギミックモデルをつくる', 'キャプテンハーロック率いる 宇宙海賊戦艦を精密に再現!!\nアルカディア号 どくろの旗をかかげ、信じるもののために 命をかけて戦う男の艦がいまここに！！\nこちらはプ レミアム定期購読のアイテムを含めた完成'],
 ['Hachette', '週刊', 'THETERMINATORT-800をつくる', 'サラ・コナーを抹殺せよ− 未来から転送された最強殺人マシン、T-800\n映画『ターミネーター』TM のオリジナルモデルから設計された 人間抹殺用アンドロイドT-800エンドスケルトンを組み立てる！\nス'],
 ['Hachette', '週刊', '鉄の城マジンガーＺ巨大メタルギミックモデルをつくる（延長）：偉大な勇者グレートマジンガー', '101号からグレートマジンガーがスタート!迫力の巨大モデルがついに登場!\n\n読者のみなさまによる熱い声援により、本シリーズ の延長が決定いたしました。\n101号からは、みなさまからご要望が多かった「グレ'],
 ['Hachette', '週刊', '西部警察MACHINE RS-1ダイキャストギミックモデルをつくる（延長）：SUPER Z日産フェアレディ 280Z', '101号から「スーパーZ」がスタート！！金色のダイキャストモデルがあなたの手に！！\n\n読者のみなさまによる熱い応援のおかげで、本シリーズの延長が決定しました。101号からはRS-1と人気を二分するスー'],
 ['Hachette', '週刊', '週刊 ランチアストラトスをつくる', '\n\n1973年にラリーの世界選手権としてスタートしたワールド・ラリー・チャンピオンシップ（WRC）。\nランチア ストラトスは、このラリー戦で勝つために開発された生粋の“パーパス・ビルド・マシン”であっ'],
 ['Hachette', '週刊', '江戸川乱歩と名作ミステリーの世界', '絢爛たる装丁で幻想とロマンあふれるミステリーの世界へ誘います\n幻想とロマンに満ちたミステリーのラビリンスへようこそ。『江戸川乱歩と名作ミステリーの世界』は、江戸川乱歩の作品をはじめ、ミステリー史に残る'],
 ['Hachette', '週二回', '週刊エイリアンゼノモーフをつくる', 'いまだかつて存在しなかった大きさ、ディテール、ギミックすべてが圧倒的！\n1979年、初めてその姿を現した「ゼノモーフ」前代未聞の120cm、ビッグサイズで登場！\n\n1979年に公開され た『エイリアン』'],
 ['Hachette', '週刊', 'ウォーハンマー40,000：IMPERIUM', '帝国へようこそ\n手に汗握るテーブルトップ・ウォーゲーム『ウォーハンマー40,000：IMPERIUM』の世界へようこそ！これは人類が存亡を賭けて、異種族や反逆者、その他の凶悪な敵と戦っている41千年紀'],
 ['Hachette', '週刊', 'スバル360をつくる', '夢と希望を乗せて走った“てんとう虫”。\n全長37.4cm！1/8ならではの精密さを実現ボディは重厚なダイキャスト製！価値のある増加試作車を綿密取材により再現！\nサウンドコントローラー付きディスプレイベ'],
 ['Hachette', '隔週刊', '鷲沢玲子のはじめてのホワイトキルト', '白いモチーフをつなげて、タペストリーを仕上げましょう\n白い布に立体感を出せる「トラプント技法」は、光の陰影で模様が美しく引き立ちます。\nホワイトキルトのタペストリー\n\n30数年前、トラプントキルトに初'],
 ['Hachette', '週刊', 'ピーターラビット?の世界イングリッシュガーデン＆ハウス', '眺めているだけで物語に入り込んでしまいそうなピーターラビットの仲間たちがあそぶ、憧れのお家とお庭。小さくてかわいいミニチュアをつくって組み立ててあなたの お部屋にとっておきの夢の世界をつくりましょう。\n'],
 ['Hachette', '週刊', '空母 赤城ダイキャストギミックモデルをつくる', '圧倒的かつ緻密なディティールで現代によみがえる空母「赤城」\n真珠湾攻撃で活躍した伝説の大型空母「赤城」が、\n1/250スケールのダイキャストギミックモデルとして復活！\n完成後はリモコン操作で、司令長官'],
 ['Hachette', '隔週刊', '恋愛小説の世界名作ブックコレクション', '甘くて切ない極上の物語を美しい装丁で味わいましょう\n甘酸っぱい初恋や、許されない禁断の恋、試練を乗り越え見つけた真実の愛……。\n『恋愛小説の世界 名作ブックコレクション』 は、世界の名作恋愛小説を豪華ハ'],
 ['Hachette', '週刊', '宇宙戦艦ヤマト（再延長）ヒュウガ', '171号から戦闘空母ヒュウガがスタート!!迫力のダイキャストギミックモデルついに登場!!\n本シリーズは依然として好評につき、さらなる延長が決定いたしました。 171号からは、新たなヤマ ト艦隊、第65護'],
 ['Hachette', '週刊', 'ENJOY!OUTDOOR', 'このシリーズは、毎号付属のマガジンとツールを集めながらアウトドアのテクニックを楽しくマスターするツール付き体験コースです。\n付属ツール 毎号ついてくるツールや素材で手軽に体験+マガジン 4つのカテ ゴリ'],
 ['Hachette', '隔週刊', 'マーベルグラフィックノベル・コレクション', ' 購入に関して-よくあるご質問はこちら\nすべてのファンに贈るマーベル・コミック決定版コレクション\nウルヴァリン、ハルク、キャプテン・アメリカ、スパイダーマン、アイアンマン、デッドプール、\nアルティメッ'],
 ['Hachette', '週刊', '宇宙戦艦ヤマト（延長）アンドロメダ', '111号からアンドロメダがスタート!!大スケールのギミックモデルで設定を忠実に再現!!\n本シリーズは好評につき延長が決定いたしました。111号からは、皆様からご要望の多かった「アンドロメダ」を、ヤマト'],
 ['Hachette', '週二回', '鉄の城マジンガーＺ巨大メタル・ギミックモデルをつくる', '皆が夢見た 真の「鉄の城」が ついに実現\n\nTVアニメーション『マジンガーZ』は1972年12月より放送開始。巨体から繰り出される武器の圧倒的なパワーは、全国の子 供たちを魅了。それから半世紀、その魅力'],
 ['Hachette', '週刊', 'TOYOTA2000GTダイキャストギミックモデルをつくる', '美しき日本の伝説が今よみがえる。\nロングノーズ・ファストバックの美しいスタイルと当時最先端のメカニズムで世界にその名を知らしめたスポーツカー、TOYOTA 2000GT。こ の幻の名車を徹底した取材と貴'],
 ['Hachette', '週刊', '西洋・東洋占術のすべて占いの世界改訂版', '広大な“占いの世界”を正しい知識とともに巡りましょう\nシリーズでは、アイテムとともに世界中のさまざまな占いを紹介。正しい占いの知識が少しずつ身につきます。\n複数のジャンルを組み合わせて総合的に占いを活'],
 ['Hachette', '週刊', 'はじめてのディズニークロスステッチ', 'ステップバイステップでディズニーキャラクターを刺しながら本誌オリジナルの作品をつくりましょう。\n\nおなじみのディズニーキャラクターを刺しゅうして、本誌オリジナルの作品を5点 つくりましょう。\n必要な材料'],
 ['Hachette', '隔週刊', '国産名車プレミアムコレクション', '至極のアーカイブス。1/43 高品質モデルで揃える傑作国産車のコレクション\n時代時代の先端技術と開発者たちの情熱を乗せ、市場に放たれてきた幾多の国産車たち。\n日本が世界に誇る国産 自動車の傑作の数々が、'],
 ['Hachette', '週刊', 'ウルトラセブンポインターをつくる', 'ウルトラ警備隊の万能車両が最新の技術と詳細な考証で甦る！！\n1967年から放映され、今なお高い人気を誇る『ウルトラセブン』。\n劇中で異星人の侵略から人類を守るウルトラ警備隊の脚となって大活躍を見せた特'],
 ['Hachette', '隔週刊', 'しあわせを願うつるし飾り', '伝統的な縁起ものをつくって、つるし飾りを仕上げましょう。\nたくさんの願いがこめられたモチーフを毎号ひとつずつつくり、輪につるして飾りましょう。\nつるし飾り用とつまみ細工用の必要な材料は、全部付いてきま'],
 ['Hachette', '週刊', 'ランボルギーニミウラをつくる', '宝石のごとき至上のスーパーカー、ランボルギーニ ミウラ P400 Sをつくる\n“Questo è stato il momento in cui ho deciso di creare un’auto'],
 ['Hachette', '週刊', '西部警察MACHINE RS-1ダイキャストギミックモデルをつくる', '伝説の戦闘用スーパーパトカー令和に再び吼える！\n1979年から放送された大人気アクションドラマ『西部警察』シリーズで大活躍した大門軍団のスーパーマシン「RS-1」を、1/8スケール（全長約58cm）で'],
 ['Hachette', '隔週刊', 'はじめての刺し子', '毎号1枚ずつのモチーフと小物を刺しながら、刺し子を楽しく学びましょう。\n刺し子は布を重ね合わせ、ひと針ひと針、刺し縫いする日本の伝統的な工芸です。\nこのシリーズでは、付属の材料で毎号1枚ずつモチーフを'],
 ['Hachette', '隔週刊', 'やさしいアロマ生活', '毎号付属する天然オイルを集めながらアロマテラピーで生活を彩りましょう\n\n『やさしいアロマ生活』は、\nハーブとアロマテラピーの専門店\n「生活の木」の天然オイルが毎号付いてくる\nアロマコレクションです。\n'],
 ['Hachette', '週刊', 'かぎ針で編む立体花モチーフ', 'ステップ・バイ・ステップで、立体的な花のモチーフを編みながら、かぎ針編みを楽しく学びましょう。\n花モチーフに必要なカラフルな毛糸が毎号付いてきます。\n1枚ずつ編んだ花モチーフをつな げてマルチカバーを完'],
 ['Hachette', '週刊', 'ブルートレイン3車両をつくる', '動く！光る！轟く！五感を刺激する多彩なギミックを搭載！\n車窓に街の灯を映し、群青の宵闇へ消えていくブルートレイン。鉄輪の響きを聴いて眠りについたあのころの夜汽車旅はなんと旅情にあ ふれていたことだろう─'],
 ['Hachette', '隔週刊', '懐かしの商用車コレクション', '街から街へ、商店から商店へ、 日本の元気を運んだクルマたち。\n\n昭和・平成の商用車は、輝かしい経済成長の真の主役だった。とりどりの荷物を積んで道という道を走り回っていた軽貨物、小 型トラック、商用バンや'],
 ['Hachette', '隔週刊', 'はじめての立体刺しゅう', '毎号少しずつモチーフをつくりながら立体刺しゅうを楽しく学びましょう。\n付属の材料で毎号さまざまなモチーフをつくり、立体刺しゅうの技を覚えましょう。\n作ったモチーフを組み合わせて、可愛いフレームを完成さ'],
 ['Hachette', '週刊', '週刊ディズニー ドールハウス', 'ディズニーの人気キャラクターたちが集まる夢のドールハウスがあなたのもとに！ 実寸の35%スケール ミッキーマウスをはじめとした時代を超えて愛されるキャラクターたちがひとつのドールハウスに大集合！夢のド'],
 ['Hachette', '週刊', '陸上自衛隊74式戦車をつくる', '最後の輝きを放つ「74式戦車」、究極のスケールモデルが登場！\n陸上自衛隊 74式戦車 JGSDF TYPE74 MAIN BATTLE TANK\n全長:58.8cm 全幅:19.8cm 全高:標準姿勢'],
 ['Hachette', '週刊', 'はじめてのレース編み', 'ステップ・バイ・ステップでモチーフを編みながら、レース編みを楽しく学びましょう。\n必要なレース糸が付いてきて詳しい編み方をマガジンで学べるので、気軽にレース編みが始められます。\n繊細な透かし模様やスペ'],
 ['Hachette', '週刊', 'ディズニー ゴールデン・ブックコレクション', '世界中の子どもたちから愛され続ける珠玉のディズニー絵本コレクションが登場！\n子どもの読書を愛する心を育む名作ディズニー絵本シリーズ\n\n「ゴールデン・ブック」は、1942 年にアメリカで創刊された絵本シリ'],
 ['Hachette', '隔週刊', '歌舞伎特選DVDコレクション', '胸を躍らせる、あの歌舞伎の舞台が、あなたの手元に！\n一部音声ガイド付き！わかりやすい解説を聞きながら舞台映像をご覧いただけます。※DVDに音声ガイドの付かない号もございます。日本が世 界に誇る伝統芸能、'],
 ['Hachette', '週刊', '樹脂粘土でつくるミニチュアフード', '小さくてかわいい! 本物そっくりなミニチュアフードをつくりましょう。\n樹脂粘土でスイーツやパンをつくって飾って、あなただけのブーランジェリー＆パティスリーを完成させましょう！\n\nリアルな質感が表現でき'],
 ['Hachette', '週刊', '宇宙戦艦ヤマト', '\n宇宙戦艦の代名詞――ヤマト 西暦2202年に改装された姿を設定に忠実に再現!!\n『宇宙戦艦ヤマト2202 愛の戦士たち』に登場したヤマトを、\n特徴的な形状をはじめ、各種武装をディテールに至るまで忠実'],   
 ['Hachette', '隔週刊', 'はじめてのレザークラフト', '専用の道具を集めて、使い方を学びながらレザークラフトを楽しみましょう。\nレザークラフトを始めるために必要な道具がお手元に！\nこのコレクションでは、毎号付属する道具や材料を使って作品を完成させながら、レ'],
 ['Hachette', '週刊', '本物の貨幣コレクション', '時間とともに歴史的価値を増す、本物の紙幣と硬貨がコレクションで登場!\n見て、触って、読んで学べる貨幣コレクション!\n各国で実際に使用されていた\n本物の紙幣や硬貨が、毎号ついてくる！\nデータファイルでは'],
 ['Hachette', '隔週刊', 'ピーターラビット?キルト', 'キルトカバーを完成させるうちに裁縫のスキルが上達します。\n付属の材料でピーターラビットのキルトカバーをつくりながら、パッチワークやアップリケ、刺しゅうのテクニックを少しずつ学ぶこと ができます。わかりや'],
 ['Hachette', '週刊', '戦艦大和', '戦艦大和の最期―天一号作戦時の雄姿を再現！\n最新考証をふんだんに取り入れ模型の限界に挑む精細な造形！\n最新の3D化・モデリング技術で今までにない精密な再現が可能に！\n初心者の方も無理なく始められます\n'],
 ['Hachette', '隔週刊', 'ディズニーツムツムのニット＆クロシェ', ' かわいい「ディズニーツムツム」を、自分で編んで集めよう！\nミッキーやミニーをはじめとするディズニーキャラクターたちがコロンとまあるくなって集合した「ツムツム」は、ディ ズニーストアのぬいぐるみやLIN'],
 ['Hachette', '週刊', '世界の貨幣コレクション', '\n世界の国々で実際に使用されていた100ヵ国の本物の紙幣をラインナップ\n\n世界5大陸・100カ国の知らざる文化と歴史がつまった、紙幣と貨幣のオリジナルコレクション！\n\n    イギリス\n    ボス ニ']
]

// data.js
const dataForTwoChoice = [
    ['DeAgostini', 'トランスフォーマー オプティマスプライムをつくる', '映画『トランスフォーマー』（2007）に登場した オプティマスプライムを あなたの手で組み立てる！ 本シリーズでは金属パーツと ABSパーツを使って、サイバトロンの伝説的なヒーロー「オプティマスプライ'],
    ['DeAgostini', 'SUBARU BRZ GT300', '2021 Super GT GT300 Class シリーズチャンピオンマシンを あなたの手で組み立てよう!!'],
    ['DeAgostini', '日本の名馬・名勝負', '日本競馬史上に残る名馬たちの蹄跡を DVDとマガジンで完全収録! '],
    ['DeAgostini', 'ワイルド・スピード カー コレクション', '大スクリーンを疾走したあのキャストのあの車が、1/43スケールモデルになって大集合！コレクションする車は、各作品の名場面の記憶を呼び覚ます象徴的な車ばかり。'],
    ['DeAgostini', 'あぶない刑事 DVDコレクション', ' TVシリーズ2作品、TVSP1作品、 劇場7作品を初のHDリマスター版で コレクション!  今シリーズでは、“あぶデカ”シリーズDVD初のHDリマスター版で本編が楽しめるほか、豪華特典映像も満載。 '],
    ['DeAgostini', 'ホンダCB750FOUR再刊行版', '圧倒的な完成度を誇る究極のディスプレイモデル  重厚感のある金属パーツ     ステンレス製のカットフェンダーやダイキャスト製のクランクケースなど、実車の質感を表現するために、金属パーツを多数使用。 '],
    ['DeAgostini', 'エヴァンゲリオン初号機をつくる', 'マガジンとパーツで組み立てる 新劇場版の設定を徹底的に考証して立体化した圧倒的なクオリティの《エヴァ初号機》  キ ットに付いてくるドライバーと瞬間接着剤、そして毎号付属の塗装済みパーツでエヴァ初号機を'],
    ['DeAgostini', 'ルパン三世 THE DVD コレクション', '日本のアニメ史上を代表する作品［ルパン三世］。 初回放送から50年以上が経ったいまでも色褪せない驚きを放つ 作品のPART 1～Ⅲ、TVスペシャルから24作品を、全80号の 隔週刊［ルパン三世 THE'],
    ['DeAgostini', '決定版 日本の名城', '文化遺産として、また観光スポットとして、近年ますます人気を高めている「日本の城」。 本シリーズではブームの火付け役となった「日本100名城」「続日本100名城」の全200名城を詳細に取り上げます。'],
    ['DeAgostini', 'Gメン’75 DVDコレクション', 'DVDとマガジンで鮮烈によみがえる 刑事ドラマの永遠の金字塔  滑走路を並び行くGメンたちの印象的なオープニング、 他の刑事ドラマにはないハードなシナリオと切れ味の鋭い演出、 そして迫真の演技でドラマ'],
    ['DeAgostini', '鉄道車両金属モデルコレクション', '高精度＆大型の先頭車模型と 詳細なマガジンで楽しむ あなただけの鉄道車両ミュージアム。  金属モデルの手応えを味わいながら、 尽きない物語に思いを馳せるー     日本各地の鉄路を駆けた時代時代の人気'],
    ['DeAgostini', '東宝怪獣コレクション', 'キングギドラ、メカゴジラ、ヘドラ、ガイガン、ラドン！作品と時代を超えて、怪獣たちをラインナップ！  昭和・平成の時代を通じて東宝が生み出し、人々を魅了してきた怪獣たち。 隔週刊『東宝怪獣コレクション』'],
    ['DeAgostini', 'ワイルド・スピード 日産スカイラインGT-R（R34）', '日産スカイラインGT-R（R34）はユニバーサル・ピクチャーズの『ワイルド・スピード』シリーズで、数あ るカーアクションのなかでも最も印象的なシーンに登場する主役級の一台。スピードと卓越したパフォーマン'],
    ['DeAgostini', 'ブルーノート・ベスト・ジャズコレクション 高音質版', '『BLUE NOTE best jazz collection』では毎号１人のアーティストを取り上げ て、その生き様や〈ブルーノート〉での活躍、〈ブルーノート〉の歴史を 紐解いていく。付属のCDは今ま'],
    ['DeAgostini', 'JR全路線 DVDコレクション', '駅や路線ヒストリーを解説する本誌と、貴重な撮り下ろし映像満載のDVDでお届けするDVD付きマガジン。  北海道から九州までのJR全路線を特集し、現存する車両だけでなく廃止された列車や、起点駅から終着駅'],
    ['DeAgostini', 'HELLO KITTY なつかしのアイテムコレクション', '隔週刊 『HELLO KITTYなつかしのアイテムコレクション』 毎号、70年代から90年代の発売商品を再現したハロ ーキティのアイテムが1つ付きます。  創刊号は、1975年に発売したハローキティのデ'],
    ['DeAgostini', '男はつらいよDVDコレクション', '隔週刊「男はつらいよDVDコレクション」は、国民的人気作「男はつらいよ」全50作をコンプリートできるDVD付きマガジンです 。DVDは映像も音もクリアな〈HDリマスター版〉を使用し、マガジンも盛りだくさ'],
    ['DeAgostini', 'スター・ウォーズ スターシップ＆ビークル・コレクション', '本シリーズでは、スター・デストロイヤーや戦艦などの大型軍用船に、 スターファイターや爆撃機、さらに貨物船や輸送機、シャトル機に加えて、 地上や危険地帯で活動するスターシップやビークルを紹介する。 映画'],
    ['DeAgostini', 'アメリカンカー コレクション', '古き良き憧れのアメ車がここに集結! ダイキャスト製ミニチュアコレクション 1960~1970年代を中心とした憧れのアメ車たち全80種を、1/43スケールでリアルに再現したダイキャスト製ミニチュアでコレ'],
    ['DeAgostini', 'メタルヒーロー DVDコレクション', '地球と人類のために戦う宇宙刑事の活動記録がついに登場!隔週刊『メタルヒーロー DVDコレクション』創刊 「メタルヒーローシリーズ」初期3作品をテレビ放映順に完全収録した、隔週刊『メタルヒーロー DVD'],
    ['DeAgostini', '日本の名車コレクション', 'だれもが憧れた日本の名車たちが1/64スケールで蘇る\u3000隔週刊『日本の名車コレクション』創刊1/64統一スケールのダイキャスト製モデルと、貴重な資料を満載したマガジンでお届けする、隔週刊『日本の名車コレ'],
    ['DeAgostini', 'たのしい つまみ細工', '必要な道具もセットで初心者でも日本の伝統工芸を楽しめる 隔週刊『たのしい つまみ細工』創刊\u3000隔週刊『たのしい つまみ細工』は、小さな布をピンセットでつまみ、ボンドで貼るだけのシンプルな作業で、初心者の'],
    ['DeAgostini', 'ディズニー マジカル オーディオ えほん', '目と耳でディズニーの名作をたのしむ、知育に最適なオーディオブック ディズニーの人気キャラクターのフィギュアを専用スピーカーに乗せると、プロの声優による朗読で、ディズニーの不朽の名作の物語を目と耳で楽し'],
    ['DeAgostini', '必殺シリーズDVDコレクション', 'ハードボイルド時代劇の金字塔「必殺シリーズ」と劇場版をDVDとマガジンで楽しむ 本シリーズは、「必殺仕掛人」から「必殺 剣劇人」までの21シリーズに加えて、劇場版も収録。マガジンでは、毎号付いてくるDV'],
    ['DeAgostini', '鉄道 ザ・プロジェクト', '伝説となった鉄道プロジェクトに光を当てる 本シリーズでは、毎号鉄道にまつわるプロジェクトを取り上げ、当時の貴重な映像や再現ドラマ、関係者へのインタビューを収録したDVDと、プロジェクトをひも解く資料を'],
    ['DeAgostini', '陸上自衛隊 90式戦車をつくる', '圧倒的重量感を誇る第3世代国産戦車 週刊『陸上自衛隊 90式戦車をつくる』創刊  1990年に制式化された陸上自衛隊の3代目の 国産戦車「90式戦車」が完成する、週刊『陸上自衛隊 90式戦車をつくる』を'],
    ['DeAgostini', '暴れん坊将軍 DVDコレクション', 'シーズン1・シーズン2をDVD付きマガジンに初完全収録 隔週刊『暴れん坊将軍DVDコレクション』創刊 大スター・松平健が演じる八代目将軍・徳川吉宗の凛々しくも爽やかな姿やホームドラマ的要素が人気を集め'],
    ['DeAgostini', '仮面ライダーDVDコレクション 平成編', '仮面ライダー生誕50周年！平成を彩った『クウガ』から『ディケイド』までが集結！ 2021年4月に生誕50周年を迎えた「仮面ライダー」作品の中から、ミレニアムイヤーに復活を果たした平成ライダーの10作品'],
    ['DeAgostini', 'Honda NSX-R', ' 世界を驚かせたピュアスポーツカーが史上初の1/8スケールで蘇る 週刊『Honda NSX-R』創刊  ■NSX-Rの美しいフォルムを初の1/8スケールで徹底再現 外観のデザインはもちろんのこと、外か'],
    ['DeAgostini', '刺しゅうで楽しむ スヌーピー&フレンズ', ' スヌーピーと仲間たちが、かわいい刺しゅうになって登場！隔週刊 『刺しゅうで楽しむ スヌーピー＆フレンズ』 創刊  世界中で愛されるコミック 『ピーナッツ』 に登場するスヌーピーと仲間たちの世界が、か'],
    ['DeAgostini', 'たのしいムーミンキルト', ' ムーミン谷の仲間たちと楽しむ《材料キット付き》ソーイング 毎号届くキットを使って人気のムーミンキャラクターが並ぶインテリアカバーと、日常生活で使える雑貨小物を作っていくソーイングシリーズ。当シリーズ'],
    ['DeAgostini', 'ウルトラホーク1号', ' 地球を守ったあの銀翼の勇姿が[全長87.5cm]のビッグスケールでよみがえる！週刊『ウルトラホーク1号』創刊\n特撮ドラマの金字塔『ウ ルトラセブン』に登場する、ウルトラ警備隊の誇る多目的戦闘機「ウルト'],
    ['DeAgostini', '仮面ライダー DVDコレクション', '仮面ライダー生誕50周年！平成を彩った『クウガ』から『ディケイド』までが集結！\n2021年4月に生誕50周年を迎えた「仮面 ライダー」作品の中から、ミレニアムイヤーに復活を果たした平成ライダーの10作品'],
    ['DeAgostini', 'スプリンタートレノ AE86', '走り屋たちの熱き伝説“ハチロクトレノ”をつくる\u3000週刊『スプリンタートレノ AE86』創刊\n“ハチロク”の愛称で人気を誇る「TOYOTA スプリンタートレノ AE86」（前期型）が完成する週刊『スプリン'],
    ['DeAgostini', 'ビッグスケールF1コレクション', 'F1(TM)オフィシャルライセンス\u3000歴代F1の伝説が1/24スケールのダイキャストモデルで蘇る！隔週刊『ビッグスケール F1(TM)コレクション』\n\nF1の栄光の歴史にその名を刻んだ名車たち全80種を'],
    ['DeAgostini', '航空自衛隊 F-2戦闘機をつくる', ' 実機取材で忠実に再現! 世界初の1/24ビッグスケール・ダイキャスト製モデル 週刊『航空自衛隊 F-2戦闘機をつくる』創刊\n\n「バイパーゼロ」の異名を持ち、日本の防空最前線を翔ける航空自衛隊の戦闘機'],
    ['DeAgostini', 'Honda NSX', ' 世界を驚かせたピュアスポーツカーが史上初の1/8スケールで蘇る 週刊『Honda NSX-R』創刊\n\n■NSX-Rの美しいフォルムを初の1/8スケールで徹底再現\n外観のデザインはもちろんのこと、外か'],
    ['DeAgostini', '日本の島', ' ～島を知り、日本を知る。～世界遺産から上陸困難な島まで、日本の島を愉しむビジュアルマガジンシリーズ\u3000週刊『日本の島』 創刊\n\n自然・歴史・文化・くらしなど島に関するあらゆる情報を網羅するビジュアルマ'],
    ['DeAgostini', '護衛艦いずもをつくる', ' 圧倒的な精度で完全再現! 全長約100cmの大迫力のスケールモデルを組み立てる!\nダイキャスト製、1/250スケールで再現。さまざまな可動ギミックが組み込まれており、模型を組み立てるだけではなくオペ'],
    ['DeAgostini', 'JAL旅客機コレクション', 'JAL歴代の航空機が1/400 統一スケールのダイキャスト製モデルで揃うかつてないコレクション!\n\nJAL製作協力のもと、待望のシリーズが誕生!\n\n戦後初の航空会社として設立されたJAL。長きにわたる'],
    ['DeAgostini', 'キャシーといっしょにハワイアンキルト', '暮らしが明るく元気になる\nキャシーワールドへようこそ\n\n隔週刊『キャシーといっしょにハワイアンキルト』は毎号ついてくるキットを使って、ハワイアンな作品を作っていくソーイングシリーズです。\n気楽に始めら'],
    ['DeAgostini', 'マーベル・ファクト・ファイル', ' 世界を悪の手から救う正義の使者マーベルヒーローが一堂に集結!\n\n1939年、多数のスーパーヒーローを輩出し、コミック界だけでなく\n映画やテレビ、アニメやゲームを席巻する「マーベル・コミック」が誕生し'],
    ['DeAgostini', '西遊記DVDコレクション', ' 特撮伝奇エンターテインメントの傑作『西遊記』、『西遊記II』が今蘇る！隔週刊 『西遊記 DVDコレクション』 創刊\n1978年放送の日本テレビ制作のドラマ『西遊記』シリーズをDVD付きマガジン化した'],
    ['DeAgostini', '古畑任三郎DVDコレクション', ' 「田村正和 × 三谷幸喜」 傑作ミステリ・ドラマがDVDコレクションで蘇る! 隔週刊 『古畑任三郎 DVDコレクション』 創刊\n\n1994年放送開始の三谷幸喜脚本・田村正和主演の「古畑任三郎」シリー'],
    ['DeAgostini', 'ナイトライダー', ' 世界中の人々が熱狂した伝説の電子頭脳搭載車「ナイト2000」史上初、1/8ビッグスケールギミックモデル\n毎号付属のパーツを組み立てると、海外ドラマ「ナイトライダー」に登場するドリーム・カー「ナイト2'],
    ['DeAgostini', 'スカイライン2000GT-R【KPGC110】', '幻のGT-Rとも呼ばれる「ケンメリGT-R」を日産自動車完全監修で再現!\n1/8スケールの組み立てシリーズで、可動部が多く 、ランプやエンジン音も再現した本格志向のモデルとなっています。\n■全長約56c'],
    ['DeAgostini', 'ザ・マジック', 'マガジンとDVDのわかりやすい解説で\n"憧れのマジック"ができるようになる!!\n\n隔週刊「ザ・マジック」は、世界22ヶ国、数百名ものマジシ ャンをクライアントとする\nマジシャンMAGUS(メイガス)が、'],
    ['DeAgostini', '日本の城 DVDコレクション', ' 隔週刊「日本の城 DVDコレクション」は、2015年よりBS朝日で放送された 『歴史ミステリー日本の城見聞録』を再編集して収録したDVDと、 番組の内容をさらに深堀りして楽しめるマガジンがセットにな'],
    ['DeAgostini', 'つくって あつめる スヌーピー＆フレンズ', ' ピーナッツの名シーンがミニチュアになって大集合!\nミニチュアボックスは、犬小屋型ディスプレイケースに収めて飾ることができます。\n\n■つくってあつめて楽しめる! 犬小屋型ボックスコレクション\n1950'],
    ['DeAgostini', '第二次世界大戦傑作戦車コレクション', '株式会社デアゴスティーニ･ジャパンは、第二次世界大戦に登場した世界の主力戦車を、\n1/43のビッグスケールでコレ クションできる『第二次世界大戦 傑作戦車コレクション』を\n2021年12月8日（水）より'],
    ['DeAgostini', 'Lotus 97T', '（説明なし）'],
    ['DeAgostini', 'サンバ VW Samba Bus', '（説明なし）'],
    ['DeAgostini', 'アイアンマン', '（説明なし）'],
    ['DeAgostini', 'インフィニティ・ガントレットをつくる', '（説明なし）'],
    ['DeAgostini', 'フェラーリ 250 GTO', '（説明なし）'],
    ['DeAgostini', 'マクラーレン ホンダ MP4/4', '（説明なし）'],
    ['DeAgostini', 'ムーミンハウスをつくる', '（説明なし）'],
    ['DeAgostini', 'スタートレック エンタープライズD', '（説明なし）'],
    ['DeAgostini', 'かわいい刺しゅう', '夢あふれる童話の刺しゅう絵と、雑貨小物を刺しながらさまざまなステッチに出会えるシリーズです。 『隔週刊 \nかわいい刺しゅう』は、毎号キットとして、フランスの老舗刺しゅう糸メーカー『DMC』の刺しゅう糸'],
    ['DeAgostini', 'オーシャンアタック＆Co.ビッグ', '大人気「＆Co.ビッグ」シリーズ「オーシャンアタック＆Co.ビッグ」登場！ はらぺこハンターの食べた獲物をみつけよう！ \n「オーシャンアタック＆Co.（アンド・コ）ビッグ」の一番の魅力は、深海にひそむ'],
    ['DeAgostini', 'ストレッチーズ ミュータント', 'のび～る！自由自在に形が変わる！新シリーズ「ストレッチーズ」誕生 \n新シリーズ「ストレッチーズ」は、新素材を使用。これまで以上の伸張性と、自由に形を変形できる面白さを兼ね備えた、ユニークな玩具です。シ'],
    ['DeAgostini', '恐竜＆Co.ビッグ', 'レアキャラも登場する特大サイズ！全16種類の“のび～る”恐竜 \nシリーズ発売以来、世界中の子どもたちを楽しませてきたアンドコシリーズ。なかでも前作の『シーモンスターズ＆Co.ビッグ』は、これまでにない'],
    ['DeAgostini', 'ロビ2', '新時代のフレンドリーロボット「ロビ」が、新機能を搭載してパワーアップ！ ロビとあなたの新しい暮らしがはじまる！ 日本で一番売れた二足歩行の コミュニケーションロボット〈ロビ（Robi）〉。 新しいロビは'],
    ['DeAgostini', 'ロビ 第三版', '新時代のフレンドリーロボット「ロビ」を、自分の手で簡単に組み立てることができる！ \nスマートなデザインに加え、愛らしい“動き”と“会話”を通して心を和ませてくれる新時代のフレンドリーロボット「ロビ」。'],
    ['DeAgostini', 'ガンダム・モビルスーツ・バイブル', '1冊で1機のMSを極限にまで掘り下げたガンダムファン必携のマガジン！ 『機動戦士ガンダム』シリーズにおける戦場の主 役であり、幾多の戦闘に投入されては峻烈な印象を残した人型兵器モビルスーツ(MS)。 作'],
    ['DeAgostini', 'アイアンマン', 'ダイキャスト製、全長60cm・52か所の関節と6か所のLED発光ギミック！ \n主人公であるトニー・スタークが開発した数十モデルのアイアンマン の中で、2008年公開の実写映画『アイアンマン』に登場し、現'],
    ['DeAgostini', 'ワイルド・スピード ダッジ・チャージャー R/T', '『ワイルド・スピード』で圧倒的な存在感を放つダッジ・チャージャーR/T。 《大迫力モデル》×《充実のマガジン》 究極の“ワイルド・スピード”体験！ \n第1作の公開から15年以上を経た『ワイルド・スピー'],
    ['DeAgostini', 'サンダーバード秘密基地', '南太平洋に浮かぶ孤島の地下に築かれた秘密基地。 これは、サンダーバードメカの発進プロセスから格納庫の内部構造まで、徹底的 に作りこむ“前代未聞”のシリーズだ！ \n創刊号には島内の基地に秘められたすべての'],
    ['DeAgostini', 'ゴジラをつくる', '日本が誇る偉大なキャラクター「ゴジラ」。 \n1954(昭和29)年の記念すべき映画「ゴジラ」の封切りから65年、ゴジラ映画は30作以上を数え 、2019年には新たなハリウッド版ゴジラの公開があり、国と世'],
    ['DeAgostini', '日本刀', '1000年を超える日本刀の美と歴史を完全網羅。 美と技の粋を味わい尽くす。 日本刀の魅力 そのすべてがわかる！ 美しさと強靱さを併せ持ち、高い精神性を宿す日本刀。 刀剣ブームのなか、その魅力を余すとこ'],
    ['DeAgostini', 'YAMAHA YZR-M1 バレンティーノ・ロッシ モデル', 'バレンティーノ・ロッシの愛機“YAMAHA YZR-M1”をビッグスケールで組み立てる! ! 2004年のヤマハ移籍後、バレンティーノ・ロッシと共に記録と伝説をつくり続けてきたYAMAHA YZR-M'],
    ['DeAgostini', '自衛隊DVDコレクション', '陸海空、全『自衛隊』真の姿！ その全貌をコレクション！ \n迫力のドキュメント映像を体感しながら、誌面の解説でその全貌を掘り 下げる待望のDVD付きマガジンがついに登場！今では見られなくなった貴重なシーン'],
    ['DeAgostini', '神社百景 DVDコレクション 再刊行版', '日本全国の神社の中から選りすぐりの名社をマガジンの解説とともに、映像とナレーションでご紹介します。 古より、人々の信仰を集めてきた神の社。 人々を見守り、畏れ敬われてきた神々は、今も全国の社と人々の心'],
    ['DeAgostini', 'クイーン・LPレコード・コレクション', '歴史の一部となった作品の数々… \nクイーンの音楽を全25号にまとめた独自のLPレコード・コレクション。2枚組、3枚組を含む、すべてのアルバムを180gの重量盤レコードとして再プレスした。毎号付いてくる'],
    ['DeAgostini', 'NISSAN GT-R NISMO', '世界が憧れる走りの頂点 NISSAN GT-R NISMO(MY17) "NISSAN GT-R×NISMO 目指したのは究極のドライビングプレジャーの追求" ― Pursuit of Ultimat'],
    ['DeAgostini', 'かわいい刺しゅう', '夢あふれる童話の刺しゅう絵と、雑貨小物を刺しながらさまざまなステッチに出会えるシリーズです。 『隔週刊 \nかわいい刺しゅう』は、毎号キットとして、フランスの老舗刺しゅう糸メーカー『DMC』の刺しゅう糸'],
    ['DeAgostini', 'オーシャンアタック＆Co.ビッグ', '大人気「＆Co.ビッグ」シリーズ「オーシャンアタック＆Co.ビッグ」登場！ はらぺこハンターの食べた獲物をみつけよう！ \n「オーシャンアタック＆Co.（アンド・コ）ビッグ」の一番の魅力は、深海にひそむ'],
    ['DeAgostini', 'ストレッチーズ ミュータント', 'のび～る！自由自在に形が変わる！新シリーズ「ストレッチーズ」誕生 \n新シリーズ「ストレッチーズ」は、新素材を使用。これまで以上の伸張性と、自由に形を変形できる面白さを兼ね備えた、ユニークな玩具です。シ'],
    ['DeAgostini', '恐竜＆Co.ビッグ', 'レアキャラも登場する特大サイズ！全16種類の“のび～る”恐竜 \nシリーズ発売以来、世界中の子どもたちを楽しませてきたアンドコシリーズ。なかでも前作の『シーモンスターズ＆Co.ビッグ』は、これまでにない'],
    ['DeAgostini', 'ロビ2', '新時代のフレンドリーロボット「ロビ」が、新機能を搭載してパワーアップ！ ロビとあなたの新しい暮らしがはじまる！ 日本で一番売れた二足歩行の コミュニケーションロボット〈ロビ（Robi）〉。 新しいロビは'],
    ['DeAgostini', 'ロビ 第三版', '新時代のフレンドリーロボット「ロビ」を、自分の手で簡単に組み立てることができる！ \nスマートなデザインに加え、愛らしい“動き”と“会話”を通して心を和ませてくれる新時代のフレンドリーロボット「ロビ」。'],
    ['DeAgostini', 'ガンダム・モビルスーツ・バイブル', '1冊で1機のMSを極限にまで掘り下げたガンダムファン必携のマガジン！ 『機動戦士ガンダム』シリーズにおける戦場の主 役であり、幾多の戦闘に投入されては峻烈な印象を残した人型兵器モビルスーツ(MS)。 作'],
    ['DeAgostini', 'アイアンマン', 'ダイキャスト製、全長60cm・52か所の関節と6か所のLED発光ギミック！ \n主人公であるトニー・スタークが開発した数十モデルのアイアンマン の中で、2008年公開の実写映画『アイアンマン』に登場し、現'],
    ['DeAgostini', 'ワイルド・スピード ダッジ・チャージャー R/T', '『ワイルド・スピード』で圧倒的な存在感を放つダッジ・チャージャーR/T。 《大迫力モデル》×《充実のマガジン》 究極の“ワイルド・スピード”体験！ \n第1作の公開から15年以上を経た『ワイルド・スピー'],
    ['DeAgostini', 'サンダーバード秘密基地', '南太平洋に浮かぶ孤島の地下に築かれた秘密基地。 これは、サンダーバードメカの発進プロセスから格納庫の内部構造まで、徹底的 に作りこむ“前代未聞”のシリーズだ！ \n創刊号には島内の基地に秘められたすべての'],
    ['DeAgostini', 'ゴジラをつくる', '日本が誇る偉大なキャラクター「ゴジラ」。 \n1954(昭和29)年の記念すべき映画「ゴジラ」の封切りから65年、ゴジラ映画は30作以上を数え 、2019年には新たなハリウッド版ゴジラの公開があり、国と世'],
    ['DeAgostini', '日本刀', '1000年を超える日本刀の美と歴史を完全網羅。 美と技の粋を味わい尽くす。 日本刀の魅力 そのすべてがわかる！ 美しさと強靱さを併せ持ち、高い精神性を宿す日本刀。 刀剣ブームのなか、その魅力を余すとこ'],
    ['DeAgostini', 'YAMAHA YZR-M1 バレンティーノ・ロッシ モデル', 'バレンティーノ・ロッシの愛機“YAMAHA YZR-M1”をビッグスケールで組み立てる! ! 2004年のヤマハ移籍後、バレンティーノ・ロッシと共に記録と伝説をつくり続けてきたYAMAHA YZR-M'],
    ['DeAgostini', '自衛隊DVDコレクション', '陸海空、全『自衛隊』真の姿！ その全貌をコレクション！ \n迫力のドキュメント映像を体感しながら、誌面の解説でその全貌を掘り 下げる待望のDVD付きマガジンがついに登場！今では見られなくなった貴重なシーン'],
    ['DeAgostini', '神社百景 DVDコレクション 再刊行版', '日本全国の神社の中から選りすぐりの名社をマガジンの解説とともに、映像とナレーションでご紹介します。 古より、人々の信仰を集めてきた神の社。 人々を見守り、畏れ敬われてきた神々は、今も全国の社と人々の心'],
    ['DeAgostini', 'クイーン・LPレコード・コレクション', '歴史の一部となった作品の数々… \nクイーンの音楽を全25号にまとめた独自のLPレコード・コレクション。2枚組、3枚組を含む、すべてのアルバムを180gの重量盤レコードとして再プレスした。毎号付いてくる'],
    ['DeAgostini', 'NISSAN GT-R NISMO', '世界が憧れる走りの頂点 NISSAN GT-R NISMO(MY17) "NISSAN GT-R×NISMO 目指したのは究極のドライビングプレジャーの追求" ― Pursuit of Ultimat'],
    ['DeAgostini', 'ジャガー・Eタイプ', '時代を超えたイギリススポーツカーの最高峰「ジャガー・Eタイプ」。 本シリーズでは、精密につくられたモデルを組み立てるとともに、 ジャガーの世界観を紹介していきます。 毎号提供されるのは、可動式ボンネット'],
    ['DeAgostini', '栄光の日本海軍 パーフェクトファイル', '世界初！彩色写真とCGでオールカラー化を実現！ 日本海軍パーフェクト大百科！！ 「週刊 \n栄光の日本海軍パーフェクトファイル」は、日本海軍にまつわるあらゆる事実を、全編にわたるカラー彩色写真とCG画像'],
    ['DeAgostini', '鉄道 ザ・ラストラン', '今はもう見ることのできない 名列車、名車両たちのありし日の姿を マガジンとDVDでたどっていきます！寝台特急列車や新幹線、また電気機関車から気動車まで… そのラストランの貴重な記録をコレクション！ 最'],
    ['DeAgostini', 'ニードルフェルトでねこあつめ', 'ニードルフェルトを楽しんで『ねこあつめ』しましょう！ 人気ゲーム『ねこあつめ』のねこたちが全員フェルトマスコットに なりました。 眺めているだけで癒されるあのねこたちが、毎号付いてくる素材で、毎号ひとつ'],
    ['DeAgostini', 'スター・ウォーズ R2-D2', '『スター・ウォーズ』の人気アストロメク・ドロイドをあなたの手で組み立てよう! \n映画そのままのR2-D2を精巧に再現したオリジ ナル組み立て式スケールモデルが登場。世界でもっとも有名なアストロメク・ドロ'],
    ['DeAgostini', 'マツダ・コスモスポーツ', 'あれから50年の歳月を経て－伝説のエンジンと共に、名車「マツダ・コスモスポーツ」が帰ってきた。 作動原理が分かる。実物の1/2スケールロータリーエンジンモデル付き! 週刊「マツダ・コスモスポーツ」では'],
    ['DeAgostini', 'ムーミンハウスをつくる', '誰もがあたたかく迎え入れられる、世界中でたったひとつの場所、ムーミンハウス。 \n芸術家で小説家のトーベ・ヤンソンが生み出 した『ムーミン』の世界から、時代を越えて親しまれるムーミンハウスが精巧な組み立て'],
    ['DeAgostini', 'ザ・ビートルズ・LPレコード・コレクション', '音楽史に名を刻むあの名盤をもう一度。 180g重量盤LPで聴く \nビートルズ・ファン必携のアルバム・コレクション。2枚組、3枚組アルバムを含む全23号のビートルズ名盤シリーズだ。本シリーズのために特別'],
    ['DeAgostini', '籐でつくる小物とバッグ', '自分でつくる籐のバッグと小物で、普段の暮らしをもっと素敵に、もっと豊かに。 天然素材の籐を使って、手づくりのかごバッグや 小物をつくりましょう。 隔週刊『籐でつくる小物とバッグ』は、楽しみながら籐の作品'],
    ['DeAgostini', '日本の名峰 DVD付きマガジン', '個性豊かな日本各地の名峰を訪ね、山の魅力に迫る！ DVDには毎号、BS-TBS『日本の名峰 絶景探訪』から1話を再編集して収録。 \n絶景はもちろん、その地で見る「朝日」にもこだわり、季節、天気、気温な'],
    ['DeAgostini', 'バック・トゥ・ザ・フューチャー デロリアン', '『バック・トゥ・ザ・フューチャー』で一躍名を馳せ、世界で最も有名となったタイムマシン、デロリアン。 斬新なメタルボディ、近未来的なガルウイングドア。 あのデロリアンが、8分の1ビッグスケールモデルで帰'],
    ['DeAgostini', 'ムーミンハウスをつくる', '誰もがあたたかく迎え入れられる、世界中でたったひとつの場所、ムーミンハウス。 \n芸術 家で小説家のトーベ・ヤンソンが生み出した『ムーミン』の世界から、時代を越えて親しまれるムーミンハウスが精巧な組み立て'],
    ['DeAgostini', 'ザ・ビートルズ・LPレコード・コレクション', '音楽史に名を刻むあの名盤をもう一度。 180g重量盤LPで聴く \nビートルズ・ファン必携のアルバム・コレクション。2枚組、3枚組アルバムを含む全23号のビートルズ名盤シリーズだ。本シリーズのために特別'],
    ['DeAgostini', '籐でつくる小物とバッグ', '自分でつくる籐のバッグと小物で、普段の暮らしをもっと素敵に、もっと豊かに。 天然素材の籐を 使って、手づくりのかごバッグや小物をつくりましょう。 隔週刊『籐でつくる小物とバッグ』は、楽しみながら籐の作品'],
    ['DeAgostini', '日本の名峰 DVD付きマガジン', '個性豊かな日本各地の名峰を訪ね、山の魅力に迫る！ DVDには毎号、BS-TBS『日本の名峰 絶景 探訪』から1話を再編集して収録。 \n絶景はもちろん、その地で見る「朝日」にもこだわり、季節、天気、気温な'],
    ['DeAgostini', 'バック・トゥ・ザ・フューチャー デロリアン', '『バック・トゥ・ザ・フューチャー』で一躍名を馳せ、世界で最も有名となっ たタイムマシン、デロリアン。 斬新なメタルボディ、近未来的なガルウイングドア。 あのデロリアンが、8分の1ビッグスケールモデルで帰'],    
    ['DeAgostini', 'F1マシンコレクション', '時代を駆け抜けたレジェンドマシンをその手に！ 待ちに待ったスケールモデルの傑作、1950年の発足 以来F1史に燦然と輝く名車の数々が、チームの枠を超えてここに集結した。 \n本シリーズの1/43スケール・'],
    ['DeAgostini', 'おしえて！ おしゃべりガイコツ', '骨はからだを支えているんだボーン！ それにね…なんで骨はあるんだろう？ \nしゃべる人体模型、ホネッキーを完成させるシリーズです。骨や内臓を組み立てながら、人のからだのしくみがどうなっているのかが、楽し'],
    ['DeAgostini', '日本の城 改訂版', '『日本の城 改訂版』大好評につき再刊行。日本の城を知り尽くす！ \n現存する天守から、櫓、門、わずか に残っている山城や砦まで、日本全国に残る数々の城を詳細に解説。当時の姿を再現した復元CGや内部の断面図'],
    ['DeAgostini', 'ジャズ・LPレコード・コレクション', 'すべてのジャズ・アルバムの背景に、すばらしいストーリーがある。 \nミュージシャン 同士の奇跡的な化学反応、クラブやバーでの記憶に残るセッション、そして時に訪れる悲劇的最期。パーソネルを紹介する「演奏者た'],
    ['DeAgostini', 'マイ3Dプリンター 再刊行版', '3Dプリンターの世界にようこそ！ \n工業デザイナーでなくても、アーティストでなくても、自分のイメージしたものを実際に作ることができたら！それを実現できるのが、3Dプリンターの世界です。たとえば、デスク'],
    ['DeAgostini', '傑作カンフー映画 ブルーレイ コレクション', '最強の"観るエナジー・ドリンク" カンフー映画の原動力は"怒り"である。世に はびこる理不尽と不正義に対し、かつてヒーローやヒロインたちは湧き上がる "怒り" \nを胸に、拳ひとつで戦いを挑んだ。それは、'],
    ['DeAgostini', 'レ・グランディ・フェラーリ・コレクション', '大迫力の1/24スケール！ダイキャストモデルとカタログのように美しいマガジンで楽しむフェラーリの世界 ビッグスケール・ディティール・マテリアルにこだわった、待望のフェラーリコレクション。 \n世界に名を'],        
    ['DeAgostini', '日本の神社大全', '日本の神社は、古くから日本人の思想や宗教意識を培ってきたのであり、今も日本人の日常生活に計り知れない影響を及ぼしております。神社は目に見えない大切なものを多く包蔵していますが、この「日本の神社大全（全'],
    ['DeAgostini', '神社百景DVDコレクション', '古より人々の信仰を集めてきた神の社 人々を見守り、畏れ敬われてきた神々は、今も全国の社と人々の心に鎮まる。 『隔週刊 神社百景DVDコレクション』は、BSジャパンで放映された 「神社百景 GRACE '],
    ['DeAgostini', '円谷プロ特撮ドラマDVDコレクション', '昭和の日本が生み出した 円谷プロによる珠玉の作品群 特撮黎明期に放映された革新的 な連続ドラマシリーズ『ウルトラQ』。 \n"特撮の神様"円谷英二が手がけた『Q』の大ヒット以降、円谷プロは高度経済成長期の'],
    ['DeAgostini', '第二次世界大戦 傑作機コレクション', 'ダイキャストモデルと詳細な解説マガジンで第二次世界大戦の傑作機のすべてを手に入 れる！ \nダイキャストならではの重量感あふれる精密モデルと、貴重な写真やリアルなイラスト、CGを満載したマガジンで、古き良'],
    ['DeAgostini', '釣りバカ日誌 映画DVDコレクション', '『釣りバカ日誌』シリーズの全22作品を完全収録！！ 毎号のDVDの見どころシーンを場面写真とセリフで紹介します。 \n並んでいるだけで面白いハマちゃんとスーさんの釣りシーン、事件が巻き起こる浜崎家のリビ'],
    ['DeAgostini', 'サンダーバード２号＆救助メカ', '細部まで忠実に再現した本格コレクション。感動と熱狂が今、よみがえる。 \n国際救助隊の 超音速輸送機「サンダーバード2号」に加え、「ジェットモグラ」、「高速エレベーターカー」など特殊任務を遂行する救助メカ'],
    ['DeAgostini', 'ディズニー・ドリーム・シアター', 'ディズニーの舞台が、あなたの部屋にやってくる！ \nプリンセスとプリンスの運命的な出 会い。きらびやかな舞台で、ふたりの物語がはじまります。ディズニー不朽の名作といわれる３つの作品の美しい場面を、洗練され'],
    ['DeAgostini', '空から日本を見てみようDVDコレクション', '日本列島を空中散歩！『空から日本を見てみよう』は、テレビ東京系列で2009年10 月15日から2011年9月15日まで約2年間放映された、新感覚バラエティー。 \n「くもじい」と「くもみ」のキャラクターが'],
    ['DeAgostini', 'スター・ウォーズ ミレニアム・ファルコン', '『帝国の逆襲』 －撮影用モデルを精巧に再現－ \n『スター・ウォーズ』初期3部作の製作にあたり、ミレニアム・ファルコンは、いくつかの撮影用模型がつくられた。とりわけ、第2作『帝国の逆襲』のアクションシー'],       
    ['DeAgostini', '昭和にっぽん 鉄道ジオラマ', '昭和の日本をディテールにこだわったミニチュアで精細に再現。 \n昭和39(1964)年10月1日、東 海道新幹線が開通し、10月10日には東京オリンピックが開幕しました。日本が元気一杯だった高度成長期のあ'],
    ['DeAgostini', 'リバティプリントでハンドメイド', 'リバティプリントで手作りを楽しみ、豊かに、ていねいに時間を重ねて。 \n毎号キットと して付いてくる、リバティプリントとその他の材料で手作りを楽しんでいただく、ソーイングコースです。70種類以上のリバティ'],
    ['DeAgostini', '必殺仕事人DVDコレクション', '『必殺仕事人DVDコレクション』は、藤田まこと演ずる中村主水の「必殺仕事人」9シリーズと、 映画、スペシャル版を網羅。 マガジンではビジュアルを多用して、ドラマの見どころや江戸時代の暮らしを解説します。'],
    ['DeAgostini', '映画クレヨンしんちゃん DVDコレクション', '大人から子供まで、幅広い層のファンに人気を誇る、歴代の『映画クレヨンしんちゃん』をDVDとマガジンで多面的に楽しむ！ \n1993年に公開された、『アクション仮面VSハイグレ魔王』以来1年に1本のペース'],
    ['DeAgostini', 'スカイライダー・ドローン', 'Sky Rider DroneでRC フライトは新次元へ！ 世界レベルのデザイン性と最先端デジタル技術の融 合、今、世界中が注目する最新RCモデル「ドローン」(RC \nはラジオコントロールの略)。従来の'],
    ['DeAgostini', '蒸気機関車C57を作る', '圧倒的なスケール感と際立つディテール、金属の質感あふれるC57があなたの手で蘇る。 \n細めのボイ ラとボックス動輪から生まれる美しいフォルムが魅力のC57。その佇まいを24分の1のダイナミックなスケール'],
    ['DeAgostini', 'ジッポー コレクション 80th Anniversary', '世界中のファンに愛されてきた ライターの逸品、Zippo。強風をものともしない着火性。 \n破損という言葉とは無縁の堅牢性。極めてシンプルな構造によるメインテナンスの容易さ。 そして、男たちの魂をとらえ'],
    ['DeAgostini', 'マイ3Dプリンター', '3Dプリンターの世界にようこそ！ \n工業デザイナーでなくても、アーティストでなくても、自分のイメー ジしたものを実際に作ることができたら！それを実現できるのが、3Dプリンターの世界です。たとえば、デスク'],
    ['DeAgostini', '東映任侠映画傑作DVDコレクション', 'あの頃の憧れていた男達にもう一度出会える！ \n日本の映画史上に一時代を築いた高倉健をはじめとするスター俳優たちの名演が楽しめる東映の任侠映画を毎号1作品収録したDVDと、豊富なビジュアルで作品を解説す'],
    ['DeAgostini', '仮面ライダー オフィシャルパーフェクトファイル', 'その世界観を時代ごとにさまざまに進化させながら、昭和と平成の時空間 を越えて疾走する変身ヒーロー、仮面ライダー。 『週刊 \n仮面ライダーオフィシャルパーフェクトファイル』は、各ライダーのプロフィールはも'],
    ['DeAgostini', '大映特撮映画DVDコレクション', 'ガメラ＆大魔神 すべての大映特撮映画ファンに贈る！ \n格調高い文芸作品や、日本映画の底 力を呈した海外グランプリ受賞作、そして重厚な時代劇映画など、多くの傑作、名作を製作してきた大映が得意とするジャンル'],
    ['DeAgostini', '北斗の拳 DVDコレクション', '199X年に起きた核戦争によって、暴力が支配する時代となった弱肉強食の世界に現れた、伝説の暗殺拳“北斗神拳”の伝承者・ケンシロウ。 \n『北斗の拳』は、ケンシロウとその仲間そして強敵たちの生き様を描いた'],
    ['DeAgostini', 'スタートレック・スターシップコレクション', 'スタートレックのテレビシリーズと映画に登場する、主要な宇宙船を網羅した、まったく新しいスケールモデルコレクションです。 どの宇宙船もダイキャストと高品質ABS素材を使用し、美しい塗装を施すことで、細部'],      
    ['DeAgostini', 'ジャッキー・チェン DVD コレクション', 'ジャッキーの名作映画をずらりと ラインナップした世界初のシリーズ！ \n本誌は、 アジアが誇る世界的大スター、ジャッキー・チェンの100本を超える出演作の中から厳選した作品DVDを、ファンをうならせるビジ'],
    ['DeAgostini', '日本の神社', '日本の神々が坐す はるかなる聖地を訪ねて。 \n日本の神話と歴史にゆかりの深い名社を毎号一社取り上げ、その魅力を徹底解説する。いつかは行ってみたい神社の由来から、社殿をはじめとする建造物、歴史を物語るご'],
    ['DeAgostini', '東宝・新東宝戦争映画DVD コレクション', '日本映画史に刻まれた、珠玉の戦争映画の数々がここに！明治・大正・昭和と、日本は数々の戦争を経験してきました。一方で、映画技術が日本にもたらされ劇映画が製作されるようになった頃から《戦争》は主要なテーマ'],      
    ['DeAgostini', '日本の名車', '#NAME?'],
    ['DeAgostini', '剣客商売 DVD コレクション', '藤田まこと主演の人気時代劇シリーズ 「剣客商売」を収録したDVDと、そのストーリーや見どこ ろ、時代背景などを紹介するマガジンがセットになったマガジンシリーズです。 \n「剣客商売」は1998年に放映開始'],
    ['DeAgostini', 'ランボルギーニカウンタック LP500S', '"ランボルギーニカウンタック LP500S" 70年代半ばにさっそうと登場し、日本人の心を わしづかみにしたスーパーカーの代名詞。 \n目にも鮮やかなレッド、リアウイング、スイングアップドアといった個性溢'],
    ['DeAgostini', 'パッチワーク 改訂版', 'パターンレッスンと小物作りの２部構成だから初めてでも大丈夫！"パターン"とは、パッチワークを構 成する図案のこと。パターン作りを通して、ゆがみのない美しい縫い方や、図柄をきれいに見せる縫い代の倒し方など'],
    ['DeAgostini', 'ラリーカーコレクション', '－伝説を乗せた永遠の名車－ 70年代～現在までの 新旧ラリーカーミュージアム級の コレクション をあなたの手に ラリーの歴史を彩ってきた究極のレスポ ンスを競うレース仕様のマシンを貴重な 情報と共に精密'],
    ['DeAgostini', 'スズキ HAYABUSA GSX1300R', '"究極"をコンセプトに開発された世界最速マシン「SUZUKI GSX1300R \nハヤブサ」。ハイスペックでありながら、抜群の安定性と運動性能を誇り、1999年の発売以来、世界中のライダーを魅了し続け'],
    ['DeAgostini', '新刑事コロンボDVDコレクション', '「新・刑事コロンボ」もカバーしたコレクションがついに登場！ 1968年の初登場から2003年の最終話まで、35年間にわたってヒットした『刑事コロンボ』。 その独特のキャラクターと斬新なストーリー展開は'],
    ['DeAgostini', '自衛隊モデル・コレクション', '陸・海・空が勢揃いする初めてのコレクション！！ \n隔週刊『自衛隊モデル･コレクション』は戦闘機、戦車、護衛艦など陸海空の各自衛隊が保有した主要装備の精巧なスケールモデルが、毎号1つ付属するマガジンシリ'],
    ['DeAgostini', 'ハーレーダビッドソン・プレミアムコレクション', 'アメリカン・ブランドの伝説のハーレーダビッドソン。 \n名車たちと100年を超える歴史を精巧な1/24スケールのダイキャストモデルと貴重な写真でビジュアル豊富に解説したマガジンでたどるコレクションシリー'],      
    ['DeAgostini', 'そーなんだ！からだの不思議', 'お子様の”知りたい気持ち”を刺激する学習漫画、もっと学びたい子に、わかりやすい図版が満載。授業の補足学習も。文字だけの本が苦手な子に、魅力的なキャラクターやストーリーの流れがあるからスラスラ読める。夏'],
    ['DeAgostini', 'マクロス・クロニクル 新訂版', '1982年からTVアニメとしてスタートし30周年を迎えた『超時空要塞マクロス』から最新作『マ クロスFB7オレノウタヲキケ！ \n』まで、全ての作品を徹底網羅したオフィシャルファクトファイルです。 \n「リ'],
    ['DeAgostini', '日本の城', '週刊「日本の城」は日本全国の城の当時の姿を再現した復元 CG \nや内部の断面図、古絵図、古写真など、貴重なビジュアルを多用しながら、あらゆる角度から城の魅力をつぶさに伝えるマガジンです。 専用リングバ'],
    ['DeAgostini', '戦艦大和を作る 改訂版', '週刊「戦艦大和を作る」は、毎号付属の金属･木製パーツを組み立てると、世界最大最強といわれ、日本海軍の象徴であった｢戦艦大和｣(1/250スケール)が完成するマガジンシリーズです。 \n本シリーズでは、沖'],
    ['DeAgostini', 'そーなんだ！歴史編 改訂版', '「週刊 そーなんだ！」シリーズは、ふだんの生活の中でいだくそぼくな？を取り上げ、マンガやイラストをたくさん使いながら分かりやすくとき明かしていきます。 思わず「そーなんだ！」となっとくしてしまう、楽し'],
    ['DeAgostini', 'マクラーレン ホンダ MP4/4', '伝説のF1レーサー“アイルトン・セナ”に初タイトルをもたらした｢MP4/4｣は、1988年、全16戦中15勝の偉業を達成したF1最強マシンです。 \n本シリーズは、｢マクラーレン｣と｢ホンダ｣そして「セ'],
    ['DeAgostini', '銀河鉄道999 DVDコレクション', 'マガジンとDVDで楽しむ「銀河鉄道999」の世界 少年・星野鉄郎と、謎の美女メーテルの冒険を描いた「銀河鉄道999」は、1978（昭和53）年9月から放送されたSFテレビアニメです。 『銀河鉄道999'],
    ['DeAgostini', 'HMSヴィクトリーを作る', '帆船模型ファン憧れのヴィクトリー号をあなたの手で。 \n1805年、「トラファルガーの海戦」でホレーショ・ネルソンが旗艦としたヴィクトリー号を、ミュージアムモデル級の大迫力模型として再現します。帆船模型'],
    ['DeAgostini', 'コンバット・タンク・コレクション', '精密モデルと詳細な解説で迫る、戦車&装甲戦闘車両の進化と戦いの歴史！ \n存在感あふれる精密モデルと貴重な写真や詳細な解説が満載されたマガジンで、戦車＆装甲戦闘車両の魅力を余すところなく伝えます。技術的'],
    ['DeAgostini', '歴史のミステリー 改訂版', '週刊『歴史のミステリー』は、古代から現代に至るさまざまな事象について、その真偽を含めた多 くの謎や疑問を掘り起こすことによって、歴史の知られざる一面に迫るビジュアルマガジンシリーズです。 \n歴史書といわ'],
    ['DeAgostini', 'ディズニー・パレード', 'パレードが始まる！ ディズニー・ワールドのとびきりすてきなエンターテインメントをあなたに。ミ ッキー、プーさん、シンデレラ、アリス… \n楽しくかわいいフロートの数々が夢と魔法でいっぱいのパークの中を音楽'],
    ['DeAgostini', 'ブルーノート・ベスト・ジャズコレクション', '『BLUE NOTE best jazz \ncollection』では毎号1人のアーティストを取り上げ て、その生き様や〈ブルーノート〉での活躍、〈ブルーノート〉の歴史を紐解いていくCD付きマガジンシリ'],
    ['DeAgostini', '日本の100人 改訂版', '100人のドラマで紐解く日本の歩み『週刊 日本の１００人 \n改訂版』は、古代から現代にいたるまで、 日本の歴史を語る上で欠かすことのできない人物を時代やジャンルを問わず、１００人とりあげ、そのひとりひと'],
    ['DeAgostini', '蒸気機関車D51を作る', '待望のD51本格スケールモデルが誕生。 \n｢D51｣は、わが国の蒸気機関車の代表と言える機関車で、蒸気機関車の代名詞として、四国を除く日本全国で活躍しました。本シリーズは、その｢D51標準形｣の重厚感'],
    ['DeAgostini', 'トヨタ2000GT', '「TOYOTA 2000GT（前期型）」は、日本車史上最も美しいフォルムと言われ、 わずか337台しか世に出ることが なかった幻の名車です。『週刊 トヨタ 2000GT』は、 トヨタ博物館が所蔵する実車'],
    ['DeAgostini', '赤毛のアンの家', '週刊「赤毛のアンの家」は、毎号付属のパーツを組み立て、小説｢赤毛のアン｣に登場する「アンの家（グリーン･ゲイブルズ）」のドールズハウスと、アヴォンリー村の情景を凝縮したジオラマ（1/24スケール）を作'],
    ['DeAgostini', 'ガンダム パーフェクト・ファイル', '様々な時代や世界を超えて描かれているガンダムの物語。 そこに登場する白いモビルスーツは、戦いの象徴なのか、それとも希望の象徴となるのか？想いを叶えるために人々が踏み出した一歩が新たなる物語を紡いでゆく'],
    ['DeAgostini', '和時計をつくる', '当時の機構を忠実に再現した『和時計』復刻モデル 西洋の機械時計をもとに、江戸の職人たちによって改良 が重ねられ、発展をとげた和時計。 \n当時の人々の"不定時法"の生活に合わせるために、日本ならではの独自'],
    ['DeAgostini', 'ジェリー・アンダーソンSF特撮DVDコレクション', '世界で、そして日本でも大ブームを巻き起こした『サンダーバード』の生み の親である名プロデューサー『ジェリー・アンダーソン』。彼が手掛けた作品は、今もなお見る者を魅了し続けており、日本の特撮番組やアニメー'],
    ['DeAgostini', 'もっとデジイチLIFE', '週刊『もっとデジイチLIFE』では、デジタル一眼カメラの使い方はもちろんのこと、さまざまなシーン別撮影のプロセスをステップ・バイ・ステップで毎号紹介。撮影テクニックを基礎から応用まで少しずつ学べ、さら'],
    ['DeAgostini', 'パッチワーク', '「隔週刊 \nパッチワーク」は、楽しみながら自然にパッチワークのテクニックが身につくマガジンシリーズで す。毎号ベーシックなパッチワークのパターンを１つ作ります。 \nまた、｢ティッシュボックスカバー｣｢ポ'],
    ['DeAgostini', 'ロボゼロ', 'ロボットヒーローを彷彿させるスタイリッシュな外観そのままに、素早い動きと軽やかな身のこなし、安定したバランスで抜群の運動性能を発揮する"ROBO \nXERO"。様々なアクションを可能にする先進的な機能'],
    ['DeAgostini', '名探偵ポワロ DVDコレクション', '“ミステリーの女王”アガサ・クリスティーが生み出した、名探偵エルキュール・ポワロ。このおしゃれでキザなベルギー人探偵が、解き明かすトリックの数々！ 魅力的で難解な事件を、ビジュアル満載のマガジンととも'],
    ['DeAgostini', 'NHK 名曲アルバム CDコレクション', '隔週刊『ＮＨＫ名曲アルバム \nＣＤコレクション』は、ＮＨＫで30年以上続いている人気番組『名曲アルバム』で放送された珠玉の名曲を収録したＣＤと、解説やエッセイを収めたビジュアル豊富なマガジンがセットに'],
    ['DeAgostini', '戦国甲冑をつくる', '「週刊 戦国甲冑をつくる」は当時の伝統工芸の粋を集めて作られた政宗の甲冑を 同時代・同型の甲冑も詳細に調査・研究しながら復元し、当時と同じ素材、技法を随所に用いて再現。 1/2スケールの本格甲冑模型を'],
    ['DeAgostini', 'コメディドラマで ENGLISH', '『週刊 コメディドラマで \nENGLISH』は、ドラマで使われている日常会話を見て、聞いて、発音 練習をするだけで、海外旅行やビジネスでの日常会話など、ネイティブの生きた英語を身に付けられるシリーズです'],
    ['DeAgostini', '日本の古寺・仏像 DVDコレクション', '『隔週刊 日本の古寺・仏像 \nDVDコレクション』は、毎号マガジンとともに提供するDVDには、寺院で撮影された美しい映像が収録されています。伽藍の佇まい、日本建築の様式美、仏像の魅力などを映像で細部に'],
    ['DeAgostini', '大草原の小さな家 DVDコレクション', 'アメリカ人作家ローラ・インガルス・ワイルダーの自叙伝的小説をドラマ化した「大草原の小さな家」は、1974年の放送開始直後から全米で賞賛を浴び、1983年までに9シーズンにわたって製作された大ヒットドラ'],
    ['DeAgostini', 'マクラーレンMP4-23', '「MP4-23」は、2008年にデビュー2年目にしてF1史上最年少でシリーズチャンピオンとなった「ルイス・ ハミルトン」の快進撃を支えたマシンです。 \n最先端のテクノロジーを結集した「MP4-23」を生'],
    ['DeAgostini', '鬼平犯科帳DVDコレクション', '傑作時代劇『鬼平犯科帳』の魅力満載、ファン必見のＤＶＤマガジン化！ \n『鬼平犯科帳』は、江戸時代に実在した火付盗賊改方長官｢長谷川平蔵｣をモデルに、昭和を代表する作家・池波正太郎が描き出した時代小説シ'],
    ['DeAgostini', 'バレエDVDコレクション', 'わかりやすいビジュアルマガジンと美しいDVDで、バレエの魅力に酔いしれる。 『隔週刊 \nバレエDVDコレクション』は世界のバレエの名作・名演を紹介するDVDコレクション・シリーズです。ダンサーの磨き抜'],
    ['DeAgostini', 'ホンダ CB750FOUR', '1969年。当時最高の技術の粋を集約し、ホンダが世界のバイク市場に向けて発表した「Honda DREAM CB750 \nFOUR（K0）」。大排気量4気筒エンジンの咆哮と、その圧倒的な存在感に全世界が'],
    ['DeAgostini', 'ハマーH1 ラジコンカー', '軍用車の流れを汲むハマーH1は、その特徴を色濃く残し、一般的なSUVとは一線を画した風 格で、フ ァン垂涎の的となっています。そのH1を、骨太な外観・スピード・走破力まで実 車さながらにラジオコントロー'],
    ['DeAgostini', '戦国武将データファイル', '『週刊 \n戦国武将データファイル』は応仁の乱から始まる日本の戦国時代において天下の覇権を巡 って戦いを繰り広げた名代の戦国武将たちを網羅したマガジンシリーズです。 \n戦国時代に活躍した300名以上にのぼ'],
    ['DeAgostini', '航空母艦 赤城を作る', '空母機動部隊の旗艦であり、日本初の大型空母として知られる「航空母艦赤城」。太平洋戦争初期、欧 米列強国の艦艇に対して破竹の連勝を収めたことで「世界最強」と恐れられ、数々の輝かしい戦歴を残し最強空母艦隊の'],
    ['DeAgostini', '野鳥の世界', '『週刊 \n野鳥の世界』は、バードウォッチングや野鳥を楽しむための情報を、美しく、躍動感あふれる写真やイ ラストとともに紹介するマガジンシリーズです。野鳥の生態や行動、習性、見分け方、観察できる場所を丁寧'],
    ['DeAgostini', 'スパイ大作戦 DVDコレクション', 'TVドラマ『スパイ大作戦』は、1966年からアメリカのCBSネットワークで7シーズンにわたっ  て放送され、日本でも1967年から放送が開始されました。本部から指令された「遂行不可 能と思われる作戦＝ミ'],
    ['DeAgostini', '宇宙戦艦ヤマト オフィシャル・ファクトファイル', '本シリーズは、1974年にTV放映された「宇宙戦艦ヤマト」から、2009年12 月12日より公開さ れた、劇場用アニメーション映画「宇宙戦艦ヤマト・復活篇」まで、全ての作品を徹底網 羅したオフィシャルフ'],
    ['DeAgostini', '日本のうた こころの歌 改訂版', '『隔週刊 日本のうた \nこころの歌』は、童謡・唱歌・抒情歌など、故郷への想いを綴った歌や、美しい自然と四季折々の歌、スコットランド・ロシア民謡といった日本人に親しまれてきた海外の歌まで、毎号7～8曲ず'],
    ['DeAgostini', 'エヴァンゲリオン・クロニクル 新訂版', 'GAINAX完全監修、エヴァ専用公式ガイドブック！エヴァンゲリオンの世界を様々な角 度からエヴァの魅力を余すところなく徹底解説するマガジンシリーズです。本誌では、重厚なストーリー、EVAや登場人物、使徒'],
    ['DeAgostini', 'フェラーリF2007ラジコンカー', '『週刊フェラーリ F2007 ラジコンカー』で組み立てるフェラーリ「F2007」は、2007年のF1シ ーンでワールドチャンピオンに輝いたマシン。 \n1/7スケールで再現した本格的なエンジンラジオコント'],
    ['DeAgostini', '江戸', '「週刊 \n江戸」は、大河ドラマや歴史小説などでもなじみの深い「江戸時代」に焦点を当てたマガジンシリーズです。7つの章からなる本誌は、歴史上の主な出来事の解説に加え、当時の諸国事情、庶民の暮らしなど、様'],
    ['DeAgostini', 'そーなんだ！歴史編', '「週刊 そーなんだ！ 歴史編」では、日本史と世界史それぞれの知っておきたいポイントや、学校 では 教えてくれない歴史の知られざる一面を紹介。見やすく分かりやすいオールカラーのページや、見開きの特大イラス'],
    ['DeAgostini', '松本清張', '本シリーズは、昭和の文豪、松本清張とその名作の魅力を再発見できるシリーズです。第1号から第12号では、厳選 した作品を毎号1つ取り上げ、その解説はもちろん、作品のバックボーンとなった清張の貴重な取材メモ'],
    ['DeAgostini', '東宝特撮映画DVDコレクション', '1954年公開の「ゴジラ」は見たこともない特殊撮影とドラマチックで重厚なストーリーで当時 の観客たちの心を捉えました。その後次々と公開された東宝特撮映画は、映画黄金期を代表する娯楽の王道として卓越したイ'],
    ['DeAgostini', 'DVDオペラ・コレクション', '本シリーズはオペラの本場ヨーロッパを中心に、世界中から集められた名演をDVDに収録したコレクション・シリーズです。DVDに登場するのは、一流の歌手、指揮者、オーケストラばかり。もちろん、世界屈指の才能'],
    ['DeAgostini', '零戦をつくる', '太平洋戦争前半の快進撃を支え、日本の主力機として最も輝いていた時代の零戦、『零式艦上戦闘機二一型』。徹底した機体の軽量化と空力的洗練が施され、当時の日本の技術の粋を集めて作られたその勇姿を、かつてない'],
    ['DeAgostini', 'Xファイル DVDコレクション 改訂版', '『Xファイル』は1993年から全米で放映された超常現象を題材にした人気ドラマです。ア メ リカ連邦捜査局（FBI）に保管された「The X-Files」（超常現象が関係しているとされる 未解決事件簿）に'],
    ['DeAgostini', 'ウルトラマン オフィシャルデータファイル', '『週刊ウルトラマンオフィシャルデータファイル』は、1966年にテレビ放映が開 始された 「ウルトラQ」から、最新作の「大決戦！超ウルトラ8兄弟」まで、テレビ版・劇場版を問 わず全てのウルトラシリーズの作'],
    ['DeAgostini', 'ディズニー・ドリーム・ファイル', '世界中の子どもに、そして大人にも、夢と希望、愛や冒険の喜びを提供し続けてきたウォルト・ディズニー。 \n『週刊ディズニー・ドリーム・ファイル』は、世界中で愛されているキャラクターたちの詳細なデータや、ア'],
    ['DeAgostini', 'わが家で和食改訂版', '数々の料理番組をレギュラーに持ち、料理本の執筆も手がける土井善晴氏が監修を手掛けるレシピマガジンシリーズです。 \n和食の基本からひと手間かけた和食まで、食材の力を上手に引き出す新しい調理法やプロならで'],
    ['DeAgostini', 'CSI:DVDコレクション', '全世界で高視聴率を記録し続けるTVドラマ「CSI：科学捜査班」から、毎号2話を収録したDVDと、DVDに 収録されたエピソードや、科学捜査に関連する様々な情報を紹介するシリーズです。ドラマのエピソード解'],
    ['DeAgostini', '安土城をつくる', '天下統一を目前に控えた織田信長が、当時の建築技術と贅を尽くして築きあげた安土城。 日本の城の中でも っとも豪華であったと言われ、後世の城建築にも多大な影響を残しました。 しかし完成わずか3年後、信長が本'],
    ['DeAgostini', '天体模型・太陽系を作る', '最新の学説に基づいた正確な太陽系の運行を示す天体模型（太陽系儀ともいう）のパーツと、太陽系の惑星や宇宙科学を紹介するマガジンがセットになったシリーズです。毎号付属のパーツを組み立てることにより、金属製'],
    ['DeAgostini', '『東映時代劇 傑作ＤＶＤコレクション', '東映時代劇の傑作をDVDとマガジンで！ 隔週刊『東映時代劇 \n傑作DVDコレクション 』は、面白さを前面に打ち出し、人々の一大娯楽として昭和三十年代にブームを巻き起こした東映時代劇映画の傑作を、DVDで'],
    ['DeAgostini', '落語百選ＤＶＤコレクション', '江戸時代から明治時代にかけて創作された古典落語をマガジンで解説し、DVDで演目その ものを見ることができるまったく新しい落語マガジンシリーズです。DVDには、このシリーズのためだけに演じられた実力派真打'],
    ['DeAgostini', 'そーなんだ！3訂版', '「週刊 そーなんだ！」シリーズは、ふだんの生活の中でいだく素朴な疑問(なぜ？)を 取り上げ、マンガ やイラストをたくさん使いながら分かりやすく解き明かしていきます。 思わず「そーなんだ！」と納得してしま'],
    ['DeAgostini', 'そーなんだ！社会編 改訂版', '「首相と大統領はどう違うの？」「日曜日はどうして休みなの？」といった、世の中の仕組みに 関する素朴な疑問を、マンガとコラムで丁寧に分かり易く解き明かします。毎号、6つの章の中から5つずつ取り上げます。さ'],
    ['DeAgostini', 'スターゲイト DVDコレクション', '「隔週刊 スターゲイト DVDコレクション」は、「スターゲイト・SG-1」の 10シリーズ（全214話）と、スピンオフシリーズである「スターゲイト アトランティス」の3シリーズ（全60話）を毎号3話ず'],
    ['DeAgostini', 'フェラーリグランツーリズモ', '毎号付属するパーツを組み立てることで、「エンツォ・フェラーリ」の1/10スケールのダイキャストモデル（全長:470mm、重量:4.9kg）が完成します。「エンツォ・フェラーリ」はフェラーリ社 \n創始者'],
    ['DeAgostini', '仮面ライダーオフィシャルデータファイル', '1971年にテレビ放映を開始した、第1作「仮面ライダー」をはじめとする所謂「昭 和ライダー」から、「仮面ライダークウガ」からスタートし現在も放送が続いている「平成ライダー」まで、テレビ版・劇場版を問わず'],        
    ['DeAgostini', 'クール・ジャズ・コレクション', 'ジャズを聴く気分 それは楽しいとき リラックスしたいとき 落ち込んだとき スペシャルなと… どんなシーンにもスッと溶け込んでくれる それが JAZZ 初めて聴いた曲なのに懐かしい 何回も聴いたのに新し'],
    ['DeAgostini', '世界名作劇場DVDセレクション', '昭和50年から22年間にわたって放送され、多くのファンから愛され続けたアニメ「世界名作劇 場」。その中でも特に人気の3作品『フランダースの犬』、『母をたずねて三千里』、『あらいぐまラスカル』が隔週刊の「'],
    ['DeAgostini', '科学忍者隊ガッチャマンDVDコレクション', '昭和47年に大人気を博したTVアニメ「科学忍者隊 \nガッチャマン」のシリーズ3部 作・全205話を毎号3話ずつ収録したDVDと、読み応えたっぷりのマガジンがセットになったシリーズです。リアルなメカデザイ'],
    ['DeAgostini', 'パティシェと作るケーキアンドデザート', '国内外で活躍する有名パティシエ約50名のケーキ＆デザートのオリジナルレシピを取り上げ、一流パティシエたちのとっておきのテクニックが習得できるマガジンです。レシピ以外にも様々な情報を網羅し、お菓子作り初'],        
    ['DeAgostini', 'マイ・ミュージック・スタジオ', '読み込んでいます...'],
    ['DeAgostini', '歴史のミステリー', '誰もが知っている史実から、いまだに解明されていない謎に満ちた出来事まで、歴史に潜む数々の謎を取り上げ、これまで通説とされてきた歴史認識を再検証し、歴史の真相を読み解くマガジンシリーズ。全号揃えると歴史'],
    ['DeAgostini', '地球の鉱物 コレクション', '『隔週刊地球の鉱物コレクション』には、世界中の様々な自然の鉱物・鉱石が毎号付いてきます。 創刊号は、紫水晶とも呼ばれ、2月の誕生石としても知られる「アメシスト」。シリーズでは、鉱物コレクターを魅了する'],
    ['DeAgostini', 'ハーレーダビッドソン', '世界中に熱狂的なファンを抱えるハーレーダビッドソン。ウィスコンシン州ミルウォーキーで産声をあげた小さな工場から、世界的な巨大メーカーへと成長した同社の歩みは、そのままアメリカのバイク史にも重なります。'],
    ['DeAgostini', '刑事コロンボDVDコレクション', '1968年の初登場から約10年にわたってヒットした『刑事コロンボ』。その独特のキャラクター と斬新なストーリー展開は、今なお世界中で愛されています。『刑事コロンボ \nDVD \nコレクション』は、シリーズ'],
    ['DeAgostini', '昭和タイムズ', '昭和――それは、日本という国が、かつてない劇的な歴史を刻んだ日々であり、今を生きる私たちの、すべてにおける礎となった時代でもあります。戦争、復興、高度経済成長……それぞれの社会を彩った、64年間にわた'],
    ['DeAgostini', 'マイディズニーランド', '読み込んでいます...'],
    ['DeAgostini', '蒸気機関車Ｃ62を作る', '付属のパーツを組みたてると、わが国の蒸気機関車の中でも絶大な人気を誇り、圧倒的なパワーと力感に満ちた独特のプロポーションを備えた旅客機関車「C62型2号機」のスケールモデルが完成します。完成サイズは1'],
    ['DeAgostini', 'ハリーポッターチェスコレクション', '本誌の付録で付いてくるチェスの駒は、映画「ハリー・ポッターと賢者の石」の１シーンで登場する魔法のチェスを再現。ハリーたちが使っていたのと同じチェス駒は、魔法で動いたり、大きな音を立てたり、映画のように'],
    ['DeAgostini', 'ピーターラビットコレクション', '「ピーターラビット」をはじめ、可愛いらしいキャラクターや魅力的なシーンが描かれたテーブルウェアを毎号付属します。テーブルウェアは、陶磁器の中でも高級感が溢れる色彩と滑らかな光沢を持った“ボーンチャイナ'],
    ['DeAgostini', 'ファイティングエアクラフトDVDコレクション', '鮮やかな3Dコンピューターグラフィックや大迫力の実写映像を駆使したDVDと、パイロット自らが語る、臨場感あふれるビジュアルマガジンで、ファンの記憶に永遠に残る“大空の戦士”たちの魅力を徹底解説します。'],        
    ['DeAgostini', 'ヨーロピアンパレス', '毎号付属のパーツを組み上げると、中世ヨーロッパの邸宅を連想させる壮麗で豪華なドールハウスが完成します。サイズは、1/12スケール（高さ91cm×幅87cm×奥行42cm）にも及びます。デザインは、フラ'],
    ['DeAgostini', '古代文明ビジュアルファイル', '「世界四大文明」をはじめ、世界各地に点在した40以上もの古代文明や王朝を、遺跡や伝説から多角的な視点でビジュアル豊かに、その真の姿をひもとくマガジンシリーズです。世界を8つの大陸に分類し、「ローマ帝国'],
    ['DeAgostini', 'アーティストジャパン', '『選び抜かれた日本絵画の巨匠60人。魅力あふれる豪華コレクション。』葛飾北斎、横山大観、尾形光琳、雪舟、東山魁夷、竹久夢ニ、東洲斎写楽等、毎号特製バインダーに綴じこんでいけば、絵画や版画を気軽に楽しめ'],
    ['DeAgostini', 'しあわせ♪クッキング改訂版', '作って食べて、心も体も健康になる服部流レシピを、毎号ご紹介していきます。料理の基本、栄 養バランス、食材をおいしく使う効果的な方法まで、料理をしながら身に付く新家庭料理百科シリーズです。2003年に創刊'],
    ['DeAgostini', 'ロボザック', '自分で組み立てる２足歩行ロボット「RZ-1」！『週刊 \nロボザック』では、驚きの運動性能をもつヒューマノイ ドロボットが簡単に制作できます！入門用アクションデータを使いこなしたら、好きな動作を自分でカス'],
    ['DeAgostini', 'ミレニアムＤＶＤコレクション', '1996年にアメリカFOXテレビで放映された猟期犯罪を扱ったサイコサスペンスドラマ。新たな 世紀の到来に、漠然とした不安が世界を覆うなか、次々と発生する猟奇犯罪の数々。 \n――事件の真相は、人間自身の心'],
    ['DeAgostini', 'ビーズアクセサリー', '毎号2種類のビーズ・アクセサリーの材料、ツールのキットと、各アクセサリーの作り方を写真で分かり やすく解説するマガジンがセットとなっています。マガジンでは、ビーズやパーツなどアクセサリーキットの名前から'],
    ['DeAgostini', 'フェラーリラジコンカー', 'F2004――それは、ドライバーとコンストラクターズの両部門で、ワールドチャンピオンに輝いた世界 最高峰のF1マシン。その名門フェラーリのメモリアルモデルが、究極のRCカーでよみがります。本格的なメカニ'],
    ['DeAgostini', '24DVDコレクション', 'Events occur in real time. ～リアルタイムで事件が進行中～ \nストーリーの進行と現実社会の時間進 行が同じ速度で進むという「24」は、斬新なリアルタイムアクションドラマとして世'],
    ['DeAgostini', 'ハローキティ・アクセサリーコレクション', '飾って、身につけて、いつもキティをあなたのそばに。ハローキティ・アクセサリーコレクションのシルバーチャームは、ブレスレット、ネックレス、ピアス、 \nイアリング、ブローチ、携帯ストラップ……さまざまなア'],       
    ['DeAgostini', 'スタートレック ベストエピソード コレクション', '壮大なスケールの「スタートレック」シリーズから、独自のテーマで選んだ三作品をDVDに収録！ マガジンは、撮影秘話・俳優インタビュー・収録作品の解説などで「スタートレック」の世界に迫ります。 『スタート'],   
    ['DeAgostini', '読み込んでいます...', '本誌は「首相と大統領はどう違うの？」「日曜日はどうして休みなの？」といった、習慣化されてはい るけれど実は「なぜ(?)」だかはっきり分からない世の中の疑問を、毎号5つずつ取り上げ、マンガとコラムで丁寧に'],
    ['DeAgostini', 'マイロボット', '『週刊 マイロボット』は、2003年に販売し、創刊号が19万部もの大ヒットを記録した『週刊 \nリアルロボット』の好評を受け、さらに高性能・多機能の本格的なロボットを作りたいというロボットファンの声に応'],
    ['DeAgostini', '青春のうた ベスト・コレクション', 'ギターを平和の象徴とした時代、若者の中から“生まれてきた”フォークソング。1960年代 後半～80年代初頭は、自ら創り自ら歌うという新しいスタイルを確立したフォークソングが、多くの若者の心に絶大な影響を'],
    ['DeAgostini', '日本の100人', '古代から現代に至るまで、日本の歴史を語る上で欠かすことのできない人物を時代やジャンルを問わず、100人取り上げ、その一人ひとりの生涯を振り返ることによって、日本という国の歩みをひもといていくビジュアル'],
    ['DeAgostini', '美空ひばりこころの歌', '日本人の心の中に、今も生きつづけている昭和の歌姫・美空ひばり。『隔週刊 \n美空ひばりこころの 歌』は、ひばりの誕生から晩年までの、豊富な写真と魅力的なエピソードを満載したマガジンと、ヒット歌謡から演歌、'],
    ['DeAgostini', 'ゴールデン・ポップス', 'CD付洋楽マガジンシリーズ。1950年～1970年代前半のアメリカのポップスを中心に、この年代流行した曲を当時の時代背景やヒットの裏話等と一緒に紹介。CDは世界メジャーレーベルオリジナル音源を使用。プ'],
    ['DeAgostini', 'わが家で和食', '伝統和食から現代風まで、食卓に「おいしい！」が並ぶ新感覚和食百科！今、和食は世代を問わず幅広く見直されています。それは、和食がヘルシーでありながら食材がもつ風味や力を大切に、毎日食べても決してあきるこ'],
    ['DeAgostini', '戦艦大和を作る', '毎号付いてくるキットを組み立て、1/250スケール（全長105.2cm/全高28.9cm/全幅15.5cm）の精密な戦艦大和の模型を作るクラフトマガジンシリーズです。組み立ては、わかりやすいステップ・'],
    ['DeAgostini', '世界の昆虫データブック', '日本をはじめとする世界の昆虫の生態や習性、体のつくり、さらには昆虫採集や標本づくりのテクニックなどを詳細なデータに加え、見やすい写真やイラストを使いながらわかりやすく紹介するマガジンと、体のしわや毛の'],
    ['DeAgostini', '泣いてたまるかDVDコレクション', '昭和41年4月から全国で放映された、渥美清主演の一話完結式ドラマです。後に『男はつらいよ！』で大ブレイクする渥美清が「一生懸命、歯を食いしばって生きながらも報われない、不器用が故に割を食う男」を好演。'],
    ['DeAgostini', 'Xファイル DVDコレクション', '我々の住むこの世界には、常識では計り知れない、超常現象と呼ばれる、想像を超えた真実があ る。その真実に迫る、1993年から2002年まで全米で放映された『Xファイル』は、実際に起こった事件や現象を背景に'],
    ['DeAgostini', 'ディズニーのマジックイングリッシュ', 'みんながよく知っているディズニーのアニメーションを見ながら、その会話をくり返し聞くうちに、英語がわかるようになります。さあ、ディズニーの仲間たちと英語の世界へ遊びに行こう！ディズニーの魔法で英語が楽し'],        
    ['DeAgostini', 'インサイド・ヒューマンボディ改訂版', '実際の医療現場で行われている先端の診断と医療法に迫る、ビジュアル医療マガジンです。また、人体のしくみ、人の生命、身近な病気、薬など現代医学にまつわるあらゆるデータを網羅。特製バインダーにファイリングす'],        
    ['DeAgostini', 'インサイド・ヒューマン・ボディ DVDコレクション', '信頼のあるDiscovery Health \nChannelのプログラムをDVD化。本邦未公 開映像も含まれます。手術シーンなど医療現場の生の映像を収めた貴重な映像資料です。'],
    ['DeAgostini', 'そーなんだ！改訂版', '『週刊そーなんだ！』はみんなのいろいろな不思議（？）をそーなんだ（！）にかえる科学マガジンです。ナビゲーターのガリレオ博士をはじめ楽しいキャラクターがいっぱい登場して、みんなに分かりやすく解説！200'],
    ['DeAgostini', '和風ドールズハウス', '毎号付いてくるパーツを組み立て、壮麗な4層3階建ての木造日本旅館のミニチュア（1/20スケール。高さ66cm×幅79cm×奥行39cm）と、情緒ある家具や調度品を手作りするクラフトマガジンです。古きよ'],
    ['DeAgostini', 'ガンダム・ファクトファイル', 'ファーストの放映開始から25周年、ガンダムシリーズの全てを網羅する初の完全ファイルマガジンがいよいよ発動！『週刊 \nガンダム・ファクトファイル』は、ガンダム全14シリーズの魅力をあらゆる角度から徹底詳'],
    ['DeAgostini', '世界遺産DVDコレクション', '地球と人類の壮大なロマンが体感できる！マガジンとDVDで楽しむ人類の遺産への旅――『隔週刊 \n 世界遺産DVDコレクション』は毎号、地域ごとに3つの世界遺産を映像と誌面で解説。本誌とセットになったDVD'],
    ['DeAgostini', 'チャンピオン･バイク･コレクション', '世界最高峰の二輪レースMotoGP、鈴鹿やカタルニアなどのサーキットで数々のドラマを繰り広げたレーシングバイクをテーマにしたマガジンと、ファンの記憶に永遠に残るチャンピオン・レーシング・バイクを精密に'],
    ['DeAgostini', '水彩で描く', '心にひびく絵を描くコツとポイントを画材の使い方、色の使いこなし、デッサンなど8つの章で分かりやすく解説 。しかも毎号必要な画材が付録としてつきますので、すぐにレッスンを始められ、毎号そろえると画材コレク'],
    ['DeAgostini', 'レッツ！ピーシーライフ', '「同級生を探したい」「航空券を予約したい」「画像や音楽をダウンロードしたい」など、誰もがパソコンでやってみたかったことを難しいパソコン用語は使わず、楽しいイラストと写真を交えてわかりやすく徹底解説。初'],
    ['DeAgostini', 'ラジコンCAR', '毎号組み立てるとほかでは手に入らない大人気のチャンピオンマシン、スバル・インプレッサWRC2001の超高性能R/Cカーが完成します（1/10スケール）。組み立ては写真入りの詳細なステップ解説で、初心者'],
    ['DeAgostini', 'アロマテラピー＆ナチュラルライフ', 'アロマオイルの使い方、セルフマッサージ、自然療法、ハーブのレシピ…。アロマテラピ ーと自然療法は心とからだにいい香りと自然の力であなたを癒します。初めての方も基礎からしっかり学んで、実践できるヒーリング'],
    ['DeAgostini', '鉄道 ＤＡＴＡ ＦＩＬＥ コレクション', '迫力の走行シーンを乗せて出発進行！風のように駆け抜ける特急列車、ブロアー音を うならせる電気機関車、ドレーンを切って進む蒸気機関車…。鉄道の魅力を存分にお楽しみいただける貴重な映像が満載のDVDコレクシ'],
    ['DeAgostini', '鉄道 ＤＡＴＡ ＦＩＬＥ', '国鉄・JR・民鉄の車両、世界の名車両を豊富な写真や図解データでビジュアルに徹底解説。9つの章 構成で、車両、駅、テクノロジー、歴史など鉄道に関するさまざまなトピックスを多角的に紹介していきます。鉄道への'],
    ['DeAgostini', 'ロード･オブ･ザ･リングシネマフィギュアコレクション', '映画の感動をリアルに再現したシネマメタルフィギュアを毎号、あな たのお手元に…。 「ロード・オブ・ザ・リング / \nシネマフィギュアコレクション」は、「ロード・オブ・ザ・リング」3部作に登場するキャラク'],
    ['DeAgostini', 'ビジュアル日本の歴史 増補版', '2000年に創刊された『ビジュアル日本の歴史』の再刊行（増補）版。上段のマンガでストーリ ーを追いながら時代の流れを把握し、下段の写真解説で時代を象徴する出来事や人物について知るという、マンガと写真の一'],
    ['DeAgostini', '日本のうたこころの歌', '古き良き日本の歌があの想いとともに蘇る―。 \n永遠の名曲を見て、読んで、口ずさめる、初めての童謡・唱歌・叙情歌コレクションマガジンです。毎号ついてくる音楽CDの表紙はすべて「郷愁の叙情画家」谷内六郎の'],
    ['DeAgostini', '漢方ライフ', '生命力を心地よく自然に高める――これが漢方の大きな特長です。「漢方ライフ」は、症状別、病気別の対処法・治療法から、家庭でできる薬膳・ツボマッサージ・気功体操などの実践法、漢方薬・薬草のプロフィールなど'],
    ['DeAgostini', 'エアコンバット DVDコレクション', '『隔週刊エアコンバット・コレクション』と同時発売の隔週刊エアコンバットDVD \nコレクションでは、貴重な軍用航空機の飛行シーンを迫力の映像とサウンドで体感することができるシリーズです。'],
    ['DeAgostini', 'エアコンバット･コレクション', '軍用航空機に焦点を当て、懐かしの名機から現代の最新鋭機までを各年代別に分けられた詳細 な資料と特大イラストで徹底解剖したビジュアルマガジンです。さらに、世界の戦闘機を細密に再現した本格的なコレクションモ'],
    ['DeAgostini', '１００人', '人類の長い歴史を語る上で欠かすことのできない人物たちを国やジャンル、時代を問わず取り上げ、彼らの人生を通じて、私たち人類がこれまでにどのような歴史を歩んできたのかを振り返るビジュアルマガジンシリーズで'],
    ['DeAgostini', 'リアルロボット', '知能を持つ本格的ロボット「サイボット」を組み立てるためのパーツと、ロボットワールドのあらゆる情報が詰まった楽しい本誌がセットになったテクノマガジンです。プログラミングで自分だけの知能ロボットに！'],
    ['DeAgostini', 'ワールド・ウェポン DVDコレクション', '本誌で紹介される世界の兵器を、迫力ある映像とサウンドで再現。各巻一つの兵器を取り上げ、その兵器の開発から現在までさまざまな角度から解説。ビデオコレクションに加えて、保存に便利なDVDコレクションです。'],
    ['DeAgostini', 'スタートレック -ファクトファイル', '1966年よりアメリカで始まったTVシリーズで映画でも大人気の「スタートレック」。全シリーズのあらゆる情報を網羅した公式ガイドが日本初登場！エピソード、宇宙船の図面、武器、未来テクノロジー、そしてユニ'],
    ['DeAgostini', 'しあわせCooking', 'おいしくて体にいいレシピや料理の基本を服部幸應先生自らが手ほどき！毎週盛りだくさんのお料理情報を お届けします。特製バインダーにファイリングすれば、お気に入りのレシピ集ができあがります。'],
    ['DeAgostini', 'ワールド・ウェポン', '20世紀に開発された兵器を、分野ごとに取り上げ、そのプロフィールと各種データ、発展の歴史や基本システム、実戦での活躍を豊富な資料と写真で詳しく解説するビジュアル兵器大百科です。多角的に分析することによ'],
    ['DeAgostini', 'ワールド・ウェポンビデオコレクション', '本誌で紹介される世界の兵器を、迫力ある映像とサウンドで再現。各巻一つの兵器を取り上げ、その兵器の開発から現在までさまざまな角度から解説。ビデオコレクションに加えて、保存に便利なDVDコレクションも発売'],
    ['DeAgostini', 'セーリング・シップ', '毎号付属のキットを使って、どなたでも簡単に本格的な帆船模型作りが楽しめる、パーツ付きクラフトマガジンです。組み立てはわかりやすいステップ・バイ・ステップの説明となっておりますので、初めての方でも大丈夫'],
    ['DeAgostini', 'そーなんだ！', '『週刊そーなんだ！』はみんなのいろいろな不思議（？）をそーなんだ（！）にかえる科学マガジンです。ナビゲーターのガリレオ博士をはじめ楽しいキャラクターがいっぱい登場して、みんなに分かりやすく解説！ \n'],
    ['DeAgostini', 'スター・ウォーズ―ファクトファイル', '世界中で多くのファンをもつ名作映画「スター・ウォーズ」シリーズの既公開４作の世 界を満載。世界初の公式スター・ウォーズデータマガジンがついに登場です。第２デス・スターの崩壊から23年後、新共和国家元首か'],
    ['DeAgostini', 'ニュー・ピーシー･サクセス', '「上手に操作したいのに、なぜつまずくのか…」週刊ニューPCサクセスはそれに答えた初級者向けのマガジンです。パソコンの初級者から上級者へステップ・バイ・ステップで必ず上達します。'],
    ['DeAgostini', 'スピーク・イングリッシュ', '発音チェックやロールプレイイングもできる厳選されたオーディオ教材、そして、専用webサイト でクイズ、ゲームで楽しく復習できるインターラクティブ英会話シリーズです。CD-ROM付きの特別版も発売。'],
    ['DeAgostini', 'ビジュアル源氏物語', '牧美也子氏の漫画でストーリーを追いながら、その周りの写真や図版解説で平安王朝の時代背景、ライフスタイルなどについて知ることができる斬新なページ構成で、難解とされてきた永遠の名作を読みこなします。原文と'],
    ['DeAgostini', 'モト・コレクション', '1/18スケール \nダイキャストモデルがついてくるMOTOマガジン。世界のマシンのデータファイル、数々 のサーキットやレーストラックを紹介すると同時に、伝説に残るトップライダーたちの輝かしい戦績に迫りま'],
    ['DeAgostini', 'インサイド・ヒューマン・ボディ', '実際の医療現場で行われている先端の診断と医療法に迫る、ビジュアル医療マガジンです。また、人体のしくみ、人の生命、身近な病気、薬など現代医学にまつわるあらゆるデータを網羅。特製バインダーにファイリングす'],
    ['DeAgostini', 'インサイド・ヒューマン・ボディ ビデオ版', '信頼のあるDiscovery Health \nChannelのプログラムをビデオ化。本邦未公開映 像も含まれます。選りすぐりの手術シーンなど生の医療現場をテーマ毎に収録。'],
    ['DeAgostini', 'ディズニー・ダイナソー', 'ディズニーの大ヒット映画「ダイナソー」のキャラクターが神秘の恐竜ワールドをナビゲート。豊富なイラストと資料で分かり易く恐竜達の特徴を紹介します。毎号ついてくる骨パーツを集めれば、光る恐竜の骨モデルが出'],
    ['DeAgostini', 'トレジャー・ストーン', '地球の自然が生み出した宝石や鉱石の魅惑的な世界を紹介。宝石・鉱物のコレクションマガジンです。毎号、専用のバインダーでファイリングしていくと、知りたいことがすぐに引き出せるようになっています。また、毎号'],
    ['DeAgostini', 'ニュー・イージー・ピーシー', 'パソコンに触れたことがない、家にあるんだけれど使い方がわからないなど、いまからパソコンを始めようというご家族のためのパソコン・コースです。分厚いパソコンの本や難解な操作手順ガイドと違って、いまのあなた'],
    ['DeAgostini', 'マイ・ドールズ・ハウス', 'ドールハウスの名品を紹介する本誌と精巧なミニチュア・パーツがドッキング。毎号ついてくるキットを組み立てれれば豪華なビクトリア様式のドールハウスが完成します。パーツの組み立ては豊富な写真を使って、詳細に'],
    ['DeAgostini', 'アート・コースビデオ', 'ビデオシリーズは、本誌で解説したテクニックや知識を用いながら、映像で楽しく学べるプログラムになっています。本誌とはひと味ちがった題材、応用ノウハウに挑戦してドローイングやペインティングのバリエーション'],
    ['DeAgostini', 'アート・コース', 'ドローイング、水彩、油、アクリル……など、あらゆるジャンルのアートを基礎からステップ・バイ・ステップ方式で学んでいくシリーズです。マガジンに付いてくる画材を使って実際に絵を描きながら、色づかいのポイン'],
    ['DeAgostini', 'ビジュアル日本の歴史', '石ノ森章太郎氏のマンガと共に時代の流れを追う､誰にでも親しみやすい歴史パートワーク。上段のマ ンガでストーリーを追いながら時代の流れを把握し、下段の写真解説で時代を象徴する出来事や人物について知るという'],
    ['DeAgostini', 'ピーシー・サクセス', '上手に操作したいのに、なぜつまずくのか……「ピーシー・サクセス」は、それに答えた初級者向けのパソコン・コース・マガジンです。ステップ・バイ・ステップ方式で確実にスキルアップ。毎号続けて読むことで、いつ'],
    ['DeAgostini', 'ワールド･エア･クラフト', 'ファン待望！世界の航空機の完全データファイル！迫力満点のカラー写真＆詳細なイラストによるリアルな解説で懐かしい名機から最新機まで世界各国すべての機種を網羅します。検索に便利なオリジナル・ファイリング・'],
    ['DeAgostini', 'イングリッシュ･フォー･ユー･プラス', '創刊から2年を迎え、ご好評をいただいている「週刊ニュー・イングリッシュ・フォー・ユー」に、新たに英語の習得度がレベルチェックできるセルフテストを収録したCDエクストラを加えてパワー・アップして登場した'],
    ['DeAgostini', 'ホームガーデン', 'すでに新しいライフスタイルとして定着しつつあるガーデニング。そのガーデニングに、より楽しく、よりアクティブに取り組みたいと思っている人々に向けてお届けするのが、花と緑のガーデニング大百科「週刊ホームガ'],
    ['DeAgostini', 'アートギャラリー', '西洋絵画の巨匠たちを毎号1人とりあげ、傑作を紹介するとともに、それらの作品が描かれた背景、画家の 独特なスタイルや才能、そして技法などを細部にわたって解説していく、マガジン・シリーズです。ルネサンスから'],
    ['DeAgostini', 'イージー･ピーシー', 'パソコンを買っても、家族全員機械オンチ。使いこなせるのか？！誰か助けて！こんな声にお応えした、 パソコンの「ホームドクター」が、「週刊イージー・ピーシー」。いちから始める初心者から、そろそろホームページ'],
    ['DeAgostini', 'ザ・ムービー', '世界映画の100年を、タテからヨコから、楽しく編集。私の生まれた年には、どんな映画がはやったの？あの映 画はどんな監督が撮ったんだろう？映画ファンなら知ってうれしい情報に加え、さらに“スクリーンの裏側”'],
    ['DeAgostini', 'クラシック･コレクション (再刊行)', '大好評だった『隔週刊クラシックコレクション \nI』へのアンコールにお答えしたクラシックコレクションの第2弾！ますますパワーアップして手軽に本格的に音楽を楽しむためのラインナップが揃います。'],
    ['DeAgostini', 'メディ･ファイル', '気になる病気も「かかるまで知らなかった」では困ります。どんな症状で、どんな予防をすればいいのか、 あらゆる角度から丁寧に解説。家族のかけがえのない健康のために知っておきたい情報を分かり易くレクチャーしま'],
    ['DeAgostini', 'ドゥ･フォト', '瞬間を刻む。写真は今、さまざまな世代に受けいれられています。これからカメラをはじめる方、基本から知り たい方へ。基礎から始まてステップアップ、やがてプロのテクニックまでが習得できます。価値ある写真を残す'],
    ['DeAgostini', 'エックス･ゾーン', '日常から一歩外れたZONEには、いまだ解明できない、さまざまな謎が眠っています。超能力やUFO、心霊現象など、宇宙の謎と人間の未知の可能性に関する、驚異の事件を紹介。あらゆる不思議にスポットをあて、あ'],
    ['DeAgostini', 'ニュー･イングリッシュ･フォー･ユー', '会話、読み書き、文法。英語習得のポイントをおさえ、CDとカセットで、どこでもリピ ート。BBC（英国放送協会）監修の楽しいテキストで、基礎から上級まで、あなたの目的にあった実力が身につきます。気軽に、家'],
    ['DeAgostini', 'マーダー･ケースブック', '何が人を殺人犯へと変えるのか？犯行の裏にある心理は何か？作家コリン・ウィルソンをはじめとす る世界の著名ライターが、犯罪心理学的アプローチを駆使して、偏見のない記述で、事件の本質を鋭く描き出します。'],
    ['DeAgostini', 'クラシック･コレクション', 'チャイコフスキー、ドヴォルザーク、ベートーベン。いつかどこかで耳にした名曲の数々、クラシ ック音楽の喜びを、気軽に味わってください。くわしい解説と、楽しく演奏できるやさしい楽譜もつけて、雑誌形式でお届け'],
    ['DeAgostini', 'グレート･アーティスト 再刊行', '偉大な画家の生涯と作品と、その創造の源を探ります。画家の生きた時代に深く切り込んだり、大きく5つのテーマから多面的なアプローチをすることで従来の画集にはなかった多面的なアプローチが実現しています。10'],
    ['DeAgostini', '恐竜サウルス', '見たい！知りたい！触りたい！迫力の3Dメガネで、大人もオドロく恐竜のリアルな姿が目の前に。付録のプラスチック・パーツもたのしみ。集めてすてきな恐竜大百科、遊んで学べて、お子様にも大好評でした。'],
    ['DeAgostini', 'グレート･コンポーザー', '歴史に残る偉大な作曲家を深く理解するために、その生涯、作品鑑賞のための手引きなどを、当時の 写真や絵画も盛り込んで編集。高音質CD付で、作曲家の魅力のすべてをあますところなく伝えます。'],
    ['DeAgostini', 'ドゥ･アート', '初心者にも、ベテランの方にも、毎号新しい発見がある。今までにない実践的なガイドブックです。画材、技法 の正しい基礎知識から、制作上のトラブル解決法までの大好評だったメソードは「隔週刊アートコース」に引き'],
    ['DeAgostini', 'エア･クラフト', '世界最高・最新の航空機情報を満載の航空百科。精密なイラストレーション、興味深くやさしい解説、豊富な カラーで航空機のロマンを目で楽しみ、読んで味わえます。デアゴスティーニ・ジャパンがお届けした、日本にお'],
    ['DeAgostini', 'ロビ 再刊行版', '2013年創刊の『ロビ』は、創刊早々に品切れになるほどの爆発的ヒット商品となりました。ご好評につき、再 創刊いたしました。 \n『ロビ』は世界的に有名なロボットクリエイターの高橋智隆氏が、このシリーズのた'],
    ['DeAgostini', 'ロビ', 'ロボットを組み立ててロボットと暮らそう。 「歩く」「言葉を理解し話す」「歌って踊る」人間らしい仕草や動きを表 現！ \n週刊「ロビ」は毎号付属のパーツを組み立てると、愛くるしい動きや会話を楽しめるロボット'],
    ['DeAgostini', 'Magiki（マジキ） プリンセス', '「マジキ」シリーズの第4弾、「マジキ プリンセス」（全12種類） 全12種類のフィギュアとブックレットのセット 「マジキ \nプリンセス」は全12種類のかわいいプリンセスフィギュアと、各キャラクターのス'],
    ['DeAgostini', 'シーモンスターズ＆Co. ビッグ', '大人気「シーモンスター」シリーズがビッグサイズで登場！ 売り切れ店続出だった『シーモ ンスターズ&Co.』『イグアナ&Co.』『シャーク&Co.』に続くシリーズ第４弾。 \n『シーモンスターズ&Co.ビッ'],
    ['DeAgostini', 'Magiki（マジキ） こねこちゃん', 'マジキシリーズ第3弾︕全12種類のかわいいこねこちゃんフィギュア \n「Magiki（マジキ） こねこちゃん」は12種類のかわいいこねこのフィギュアと各キャラクターのストーリーが書かれたミニブック、温度で'],
    ['DeAgostini', 'シャーク＆Co.', '「&Co.」シリーズが日本第3弾！ シャークと仲間たち \n全16種類のサメの仲間たちのフィギュアは全⻑約20cm前後のド迫⼒なビッグサイズ︕よく伸びて、触ると中がじゃりじゃりする感触がクセになります。'],
    ['DeAgostini', 'Magiki (マジキ）ペンギン', 'イタリア発のヒット玩具「Magiki(マジキ)」シリーズ、日本第２弾「Magiki（マジキ）ペンギン」発売。 \n「Magiki（マジキ）ペンギン」は12種類のかわいいペンギンフィギュアに各キャラクター'],
    ['DeAgostini', 'Magiki (マジキ）マーメイド', '世界で4,500万個以上売れているイタリア生まれのマスコット！ イタリア発のヒット玩具「Magiki(マジキ)」シリーズから、日本第一弾「Magiki（マジキ）マーメイド」が遂に発売。 \n「Magik'],
    ['DeAgostini', 'イグアナ＆Co.', '世界中で大 ヒ ッ ト し てい る玩 具 「 ＆ C o . ( ア ン ド コ ) 」 シ リ ー ズ の 第 2 弾！ 22種の イ グ ア ナ や ト カ ゲ の 仲 間 が 集 め ら れ る'],
    ['DeAgostini', 'シーモンスターズ＆Co.', '世界で4,000万個販売の「&Co.」シリーズが日本上陸！\nイタリアをはじめ、ヨーロッパ各地・中南米など１０か国で大ヒットしたイタリア発の玩具「＆Co.（アンドコ）」シリーズの日本販売第一弾。\u3000全２１'],
    ['DeAgostini', 'Among Us フィギュア キーチェーン 追放ver.', '「Among Us」公式ライセンスグッズ第２弾！ PMI社の「Among Us」公式ライセ ンスグッズ第２弾『Among Us フィギュア キーチェーン 追放ver.』シリーズ。 新カラーのキャラクター'],
    ['DeAgostini', 'Among Us フィギュア キーチェーン', '「Among Us」公式ライセンスグッズがデアゴスティーニから登場 PMI社の「Among Us」公式ライセンスグッズの新作である『Among Us フィギュア キーチェーン』シリーズ。 ゲームに登場'],
    ['DeAgostini', 'ミレニアムファルコン をつくる', '（説明なし）'],
    ['Hachette', '刺しゅうでつくる ピーターラビット™の世界', 'インテリアにぴったり！！ピーターラビット™の世界を題材にした素敵なオリジナ ルサンプラー※をつくりましょう。\n色とりどりの刺しゅう糸で毎号少しずつモチーフを刺していくシリーズです。\n\nピーターラビット™'],      
    ['Hachette', '装甲騎兵ボトムズ スコープドッグをつくる', 'キリコが、そして最低野郎ども（ボドムズ）が命を預け戦ったAT（アーマードトル ーパー）の傑作機スコープドッグをお前の手で組み上げろ\n\n1983年に放送を開始したTVアニメ『装甲騎兵ボトムズ』は、主人公キ'],
    ['Hachette', '聯合艦隊旗艦 戦艦武蔵 ダイキャストギミックモデルをつくる', '大艦巨砲時代の最高傑作「武蔵」が最新の研究によって現代に蘇る\n\n大艦巨砲時代の最高傑作―46cm三連装主砲を3基も備えた世界最大の戦艦にして、太平洋戦争でもっとも長いあいだ日本海軍聯合艦隊の旗艦を つと'],
    ['Hachette', 'ラビット スーパーフローS601をつくる', '富士重工業が1959（昭和34）年に発売し大ヒットモデルとなったスクーター、ラビット スーパーフローS601を徹底再現!!\n\n読者のみなさまによる熱い応援のおかげで、『スバル360をつくる』シリーズの'],
    ['Hachette', '阪神タイガース実況CDマガジン', 'ラジオと雑誌の一体型マガジン登場。\n\n『阪神タイガース実況CDマガジン』はA.R.E.GOES ON を切に願うファンのためのスペシャル・マガジンです。\n勝敗に一喜一憂せず、選手を育てながらA.R.E.'],
    ['Hachette', 'メタル・ギミックモデル バットモービル タンブラー', 'もっとも攻撃的かつ強靭、鈍く光る漆黒のボディにハイテク装備を搭載したバットモービル「タンブラー」\n可動、ライト、サウンド、そして1/8ビッグスケールで迫りくるタンブラー\nかんたん組み立て！\n\n『バット'],
    ['Hachette', '宇宙戦艦ヤマト', '251号からパトロール艦の組み立てがスタート！発光ギミックが映えるスマートな艦影を作り上げよう!!\n宇宙 戦艦ヤマト 地球防衛軍 パトロール艦\n\n依然として好評の本シリーズは、再度の延長が決定いたしまし'],
    ['Hachette', '昭和落語名演 秘蔵音源CDコレクション', '昭和の落語家による名演の数々が未発売音源でよみがえる！\nPoint 1\nマガジンとCDで落語の名演を味わい尽くす！\n\n本書は、これまで発売されたことのない音源を中心に、古今亭志ん朝をはじめとする著名な'],
    ['Hachette', 'メタル・ギミックモデル 幻の豪華客船 タイタニック号をつくる', '壮大な夢をのせた“世界最大”の豪華客船\n\n1912年4月のある 夜、\n当時世界最大の客船「タイタニック号」が消息を絶った。\n現代にも語り継がれる、20世紀最大の海難事故である。\nこの悲劇の裏には、\n 乗員'],
    ['Hachette', '週刊ガールズ＆パンツァーⅣ号戦車H型（D型改）をつくる', 'あんこうチーム、パンツァー・フォー！『ガルパン』のⅣ号戦車が究極のスケールモデルとして登場です！\n\n「女子高生と戦車」という、これまでになかったテーマを真正面から描いて10周年を迎えてもなお大ヒット を'],
    ['Hachette', '昭和傑作テレビドラマDVDコレクション', '誰もが胸を熱くした青春ドラマの金字塔が時代を超えてDVDとマガジンでよみがえる！\n中村雅俊主演の青春ドラマ4作品をコンプリート\n\n1975年に放送され大ヒットを記録した『俺たちの旅』を筆頭に、『俺たち'],
    ['Hachette', '週刊ディズニーマジカルミュージックシアター', 'ディズニー映画の名シーンをミニチュアで再現 動きと光と音で楽しむシアター オブジェをつくりましょう\n\n時代を超えてたくさんの夢を与えつづけてくれるディズニ－・アニメーション。\n厳選された心に残る名シーン'],  
    ['Hachette', 'アルカディア号ダイキャストギミックモデルをつくる', 'キャプテンハーロック率いる 宇宙海賊戦艦を精密に再現!!\nアルカディ ア号 どくろの旗をかかげ、信じるもののために 命をかけて戦う男の艦がいまここに！！\nこちらはプレミアム定期購読のアイテムを含めた完成'],
    ['Hachette', 'THETERMINATORT-800をつくる', 'サラ・コナーを抹殺せよ− 未来から転送された最強殺人マシン、T-800\n映画『ターミネーター』TM のオリジナルモデルから設計された 人間抹殺用アンドロイドT-800エンドスケルトンを組み立てる！\nス'],
    ['Hachette', '鉄の城マジンガーＺ巨大メタルギミックモデルをつくる（延長）：偉大な勇者グレートマジンガー', '101号からグレートマジンガ ーがスタート!迫力の巨大モデルがついに登場!\n\n読者のみなさまによる熱い声援により、本シリーズの延長が決定いたしました。\n101号からは、みなさまからご要望が多かった「グレ'],
    ['Hachette', '西部警察MACHINE RS-1ダイキャストギミックモデルをつくる（延長）：SUPER Z日産フェアレディ 280Z', '101号から「スーパーZ」がスタート！！金色のダイキャストモデルがあなたの手に！！\n\n読者のみなさまによる熱い応援のおかげで、本シリーズの延長が決定しました。101号からはRS-1と人気を二分するスー'],
    ['Hachette', '週刊 ランチアストラトスをつくる', '\n\n1973年にラリーの世界選手権としてスタートしたワールド・ラリー・チャンピオンシッ プ（WRC）。\nランチア ストラトスは、このラリー戦で勝つために開発された生粋の“パーパス・ビルド・マシン”であっ'],
    ['Hachette', '江戸川乱歩と名作ミステリーの世界', '絢爛たる装丁で幻想とロマンあふれるミステリーの世界へ誘います\n幻想とロマンに満ちたミステリーのラビリンスへようこそ。『江戸川乱歩と名作ミステリーの世界』は、江戸川乱歩の作品をはじめ、ミステリー史に残る'],
    ['Hachette', '週刊エイリアンゼノモーフをつくる', 'いまだかつて存在しなかった大きさ、ディテール、ギミックすべてが圧倒的！\n1979年、初めてその姿を現した「ゼノモーフ」前代未聞の120cm、ビッグサイズで登場！\n\n1979年に公開された『エイリアン』'],
    ['Hachette', 'ウォーハンマー40,000：IMPERIUM', '帝国へようこそ\n手に汗握るテーブルトップ・ウォーゲーム『ウォーハンマー40,000：IMPERIUM』の世界へようこそ！これは人類が存亡を賭けて、異種族や反逆者、その他の凶悪な敵と戦っている41千年紀'],
    ['Hachette', 'スバル360をつくる', '夢と希望を乗せて走った“てんとう虫”。\n全長37.4cm！1/8ならではの精密さを実現ボディは重厚なダイキャスト製！価値のある増加試作車を綿密取材により再現！\nサウンドコントローラー付きディスプレイベ'],
    ['Hachette', '鷲沢玲子のはじめてのホワイトキルト', '白いモチーフをつなげて、タペストリーを仕上げましょう\n白い布に立体感を出せる「トラプント技法」は、光の陰影で模様が美しく引き立ちます。\nホワイトキルトのタペストリー\n\n30数年前、トラプントキルトに初'],
    ['Hachette', 'ピーターラビット?の世界イングリッシュガーデン＆ハウス', '眺めているだけで物語に入り込んでしまいそうなピーターラビット の仲間たちがあそぶ、憧れのお家とお庭。小さくてかわいいミニチュアをつくって組み立ててあなたのお部屋にとっておきの夢の世界をつくりまし ょう。\n'],
    ['Hachette', '空母 赤城ダイキャストギミックモデルをつくる', '圧倒的かつ緻密なディティールで現代によみがえる空母「赤城」\n真珠湾攻撃 で活躍した伝説の大型空母「赤城」が、\n1/250スケールのダイキャストギミックモデルとして復活！\n完成後はリモコン操作で、司令長官'],     
    ['Hachette', '恋愛小説の世界名作ブックコレクション', '甘くて切ない極上の物語を美しい装丁で味わいましょう\n甘酸っぱい初恋や、許されない禁断の恋、試練を乗り越え見つけた真実の愛……。\n『恋愛小説の世界 名作ブックコレクション』は、世界の名作恋愛小説を豪華ハ'],
    ['Hachette', '宇宙戦艦ヤマト（再延長）ヒュウガ', '171号から戦闘空母ヒュウガがスタート!!迫力のダイキャストギミックモデルついに登場!!\n本シリーズは依然として好評につき、さらなる延長が決定いたしました。 171号からは、新たなヤマト艦隊、第65護'],
    ['Hachette', 'ENJOY!OUTDOOR', 'このシリーズは、毎号付属のマガジンとツールを集めながらアウトドアのテクニックを楽しくマスターするツー ル付き体験コースです。\n付属ツール 毎号ついてくるツールや素材で手軽に体験+マガジン 4つのカテゴリ'],
    ['Hachette', 'マーベルグラフィックノベル・コレクション', ' 購入に関して-よくあるご質問はこちら\nすべてのファンに贈るマーベル・コミック決定版コレクション\nウルヴァリン、ハルク、キャプテン・アメリカ、スパイダーマン、アイアンマン、デッドプール、\nアルティメッ'],      
    ['Hachette', '宇宙戦艦ヤマト（延長）アンドロメダ', '111号からアンドロメダがスタート!!大スケールのギミックモデルで設定を忠実に再現!!\n本シリーズは好評につき延長が決定いたしました。111号からは、皆様からご要望の多かった「アンドロメダ」を、ヤマト'],
    ['Hachette', '鉄の城マジンガーＺ巨大メタル・ギミックモデルをつくる', '皆が夢見た 真の「鉄の城」が ついに実現\n\nTVアニメーション『マジンガーZ』は1972年12月より放送開始。巨体から繰り出される武器の圧倒的なパワーは、全国の子供たちを魅了。それから半世紀、その魅力'],   
    ['Hachette', 'TOYOTA2000GTダイキャストギミックモデルをつくる', '美しき日本の伝説が今よみがえる。\nロングノーズ・ファストバックの美しいスタイルと当時最先端のメカニズムで世界にその名を知らしめたスポーツカー、TOYOTA 2000GT。この幻の名車を徹底した取材と貴'],
    ['Hachette', '西洋・東洋占術のすべて占いの世界改訂版', '広大な“占いの世界”を正しい知識とともに巡りましょう\nシリーズでは、アイテムとともに世界中のさまざまな占いを紹介。正しい占いの知識が少しずつ身につきます。\n複数のジャンルを組み合わせて総合的に占いを活'],        
    ['Hachette', 'はじめてのディズニークロスステッチ', 'ステップバイステップでディズニーキャラクターを刺しながら本誌オリジナルの作品をつくりましょう。\n\nおなじみのディズニーキャラクターを刺しゅうして、本誌オリジナルの作品を5点つくりましょう。\n必要な材料'],
    ['Hachette', '国産名車プレミアムコレクション', '至極のアーカイブス。1/43 高品質モデルで揃える傑作国産車のコレクション\n時代時代の先 端技術と開発者たちの情熱を乗せ、市場に放たれてきた幾多の国産車たち。\n日本が世界に誇る国産自動車の傑作の数々が、'],
    ['Hachette', 'ウルトラセブンポインターをつくる', 'ウルトラ警備隊の万能車両が最新の技術と詳細な考証で甦る！！\n1967年から放映され、今なお高い人気を誇る『ウルトラセブン』。\n劇中で異星人の侵略から人類を守るウルトラ警備隊の脚となって大活躍を見せた特'],
    ['Hachette', 'しあわせを願うつるし飾り', '伝統的な縁起ものをつくって、つるし飾りを仕上げましょう。\nたくさんの願いがこめられたモチーフを毎号ひとつずつつくり、輪につるして飾りましょう。\nつるし飾り用とつまみ細工用の必要な材料は、全部付いてきま'],
    ['Hachette', 'ランボルギーニミウラをつくる', '宝石のごとき至上のスーパーカー、ランボルギーニ ミウラ P400 Sをつくる\n“Questo è stato il momento in cui ho deciso di creare un’auto'],
    ['Hachette', '西部警察MACHINE RS-1ダイキャストギミックモデルをつくる', '伝説の戦闘用スーパーパトカー令和に再び吼える！\n1979年から放送された大人気アクションドラマ『西部警察』シリーズで大活躍した大門軍団のスーパーマシン「RS-1」を、1/8スケール（全長約58cm）で'],     
    ['Hachette', 'はじめての刺し子', '毎号1枚ずつのモチーフと小物を刺しながら、刺し子を楽しく学びましょう。\n刺し子は布を重ね合わせ、ひ と針ひと針、刺し縫いする日本の伝統的な工芸です。\nこのシリーズでは、付属の材料で毎号1枚ずつモチーフを'],
    ['Hachette', 'やさしいアロマ生活', '毎号付属する天然オイルを集めながらアロマテラピーで生活を彩りましょう\n\n『やさしいアロマ生活』は、\nハーブとアロマテラピーの専門店\n「生活の木」の天然オイルが毎号付いてくる\nアロマコレクションです。\n'],
    ['Hachette', 'かぎ針で編む立体花モチーフ', 'ステップ・バイ・ステップで、立体的な花のモチーフを編みながら、かぎ針編みを楽しく学びましょう。\n花モチーフに必要なカラフルな毛糸が毎号付いてきます。\n1枚ずつ編んだ花モチーフをつなげてマルチカバーを完'],
    ['Hachette', 'ブルートレイン3車両をつくる', '動く！光る！轟く！五感を刺激する多彩なギミックを搭載！\n車窓に街の灯を映し、群青の宵闇 へ消えていくブルートレイン。鉄輪の響きを聴いて眠りについたあのころの夜汽車旅はなんと旅情にあふれていたことだろう─'],
    ['Hachette', '懐かしの商用車コレクション', '街から街へ、商店から商店へ、 日本の元気を運んだクルマたち。\n\n昭和・平成の商用車は、輝 かしい経済成長の真の主役だった。とりどりの荷物を積んで道という道を走り回っていた軽貨物、小型トラック、商用バンや'],
    ['Hachette', 'はじめての立体刺しゅう', '毎号少しずつモチーフをつくりながら立体刺しゅうを楽しく学びましょう。\n付属の材料で毎号さまざまなモチーフをつくり、立体刺しゅうの技を覚えましょう。\n作ったモチーフを組み合わせて、可愛いフレームを完成さ'],
    ['Hachette', '週刊ディズニー ドールハウス', 'ディズニーの人気キャラクターたちが集まる夢のドールハウスがあなたのもとに！ 実寸の35%ス ケール ミッキーマウスをはじめとした時代を超えて愛されるキャラクターたちがひとつのドールハウスに大集合！夢のド'],
    ['Hachette', '陸上自衛隊74式戦車をつくる', '最後の輝きを放つ「74式戦車」、究極のスケールモデルが登場！\n陸上自衛隊 74式戦車 JGSDF TYPE74 MAIN BATTLE TANK\n全長:58.8cm 全幅:19.8cm 全高:標準姿勢'],
    ['Hachette', 'はじめてのレース編み', 'ステップ・バイ・ステップでモチーフを編みながら、レース編みを楽しく学びましょう。\n必要なレース糸が付いてきて詳しい編み方をマガジンで学べるので、気軽にレース編みが始められます。\n繊細な透かし模様やスペ'],
    ['Hachette', 'ディズニー ゴールデン・ブックコレクション', '世界中の子どもたちから愛され続ける珠玉のディズニー絵本コレクションが登場 ！\n子どもの読書を愛する心を育む名作ディズニー絵本シリーズ\n\n「ゴールデン・ブック」は、1942年にアメリカで創刊された絵本シリ'],      
    ['Hachette', '歌舞伎特選DVDコレクション', '胸を躍らせる、あの歌舞伎の舞台が、あなたの手元に！\n一部音声ガイド付き！わかりやすい解説 を聞きながら舞台映像をご覧いただけます。※DVDに音声ガイドの付かない号もございます。日本が世界に誇る伝統芸能、'],
    ['Hachette', '樹脂粘土でつくるミニチュアフード', '小さくてかわいい! 本物そっくりなミニチュアフードをつくりましょう。\n樹脂粘土でスイーツやパンをつくって飾って、あなただけのブーランジェリー＆パティスリーを完成させましょう！\n\nリアルな質感が表現でき'],
    ['Hachette', '宇宙戦艦ヤマト', '\n宇宙戦艦の代名詞――ヤマト 西暦2202年に改装された姿を設定に忠実に再現!!\n『宇宙戦艦ヤマト2202 愛の戦士たち』に登場したヤマトを、\n特徴的な形状をはじめ、各種武装をディテールに至るまで忠実'],
    ['Hachette', 'はじめてのレザークラフト', '専用の道具を集めて、使い方を学びながらレザークラフトを楽しみましょう。\nレザークラフトを始めるために必要な道具がお手元に！\nこのコレクションでは、毎号付属する道具や材料を使って作品を完成させながら、レ'],
    ['Hachette', '本物の貨幣コレクション', '時間とともに歴史的価値を増す、本物の紙幣と硬貨がコレクションで登場!\n見て、触って、読んで学 べる貨幣コレクション!\n各国で実際に使用されていた\n本物の紙幣や硬貨が、毎号ついてくる！\nデータファイルでは'],
    ['Hachette', 'ピーターラビット?キルト', 'キルトカバーを完成させるうちに裁縫のスキルが上達します。\n付属の材料でピーターラビットのキ ルトカバーをつくりながら、パッチワークやアップリケ、刺しゅうのテクニックを少しずつ学ぶことができます。わかりや'],
    ['Hachette', '戦艦大和', '戦艦大和の最期―天一号作戦時の雄姿を再現！\n最新考証をふんだんに取り入れ模型の限界に挑む精細な造形！\n最新 の3D化・モデリング技術で今までにない精密な再現が可能に！\n初心者の方も無理なく始められます\n'],
    ['Hachette', 'ディズニーツムツムのニット＆クロシェ', ' かわいい「ディズニーツムツム」を、自分で編んで集めよう！\nミッキーやミニーを はじめとするディズニーキャラクターたちがコロンとまあるくなって集合した「ツムツム」は、ディズニーストアのぬいぐるみやLIN'],
    ['Hachette', '世界の貨幣コレクション', '\n世界の国々で実際に使用されていた100ヵ国の本物の紙幣をラインナップ\n\n世界5大陸・100カ国の 知らざる文化と歴史がつまった、紙幣と貨幣のオリジナルコレクション！\n\n    イギリス\n    ボスニ'],
    ['Hachette', '超時空要塞マクロスVF-1 VALKYRIE VF-1バルキリー', '（説明なし）'],
    ['Hachette', '日本の貨幣コレクション', '（説明なし）'],
    ['Hachette', '国産名車コレクションスペシャルスケール1/24', '（説明なし）'],
    ['Hachette', 'ディズニーツムツム編みぐるみコレクション', '（説明なし）'],
    ['Hachette', 'Honda S800Mエスハチをつくる', '（説明なし）'],
    ['Hachette', '週刊トヨタセリカLB2000GT', '（説明なし）'],
    ['Hachette', 'ル・マン24時間レースカーコレクション', '（説明なし）'],
    ['Hachette', '学習ロボットをつくる', '（説明なし）'],
    ['Hachette', 'エアファイターコレクション', '（説明なし）'],
    ['Hachette', 'Tyrrell P34をつくる', '（説明なし）'],
    ['Hachette', '零戦五二型', '（説明なし）'],
    ['Hachette', 'パンサー戦車をつくる', '（説明なし）'],
    ['Hachette', 'ウイリスMBジープRをつくる', '（説明なし）'],
    ['Hachette', 'ZARDCD＆DVDCOLLECTION', '（説明なし）'],
    ['Hachette', '立体パズルと思考ゲームパズルコレクション', '（説明なし）'],
    ['Hachette', 'ふだん使いのかわいいかぎ針編み', '（説明なし）'],
    ['Hachette', '週刊航空自衛隊F-4EJ改をつくる！', '（説明なし）'],
    ['Hachette', '週刊スバルインプレッサをつくる', '（説明なし）'],
    ['Hachette', 'チャップリン公式DVDコレクション', '（説明なし）'],
    ['Hachette', '週刊伊四〇〇', '（説明なし）'],
    ['Hachette', '古の時計改訂版', '（説明なし）'],
    ['Hachette', '週刊ラ フェラーリをつくる', '（説明なし）'],
    ['Hachette', 'クロスステッチ', '（説明なし）'],
    ['Hachette', '週刊陸上自衛隊10式戦車をつくる', '（説明なし）'],
    ['Hachette', '週刊NISSANスカイライン2000GT-R KPGC10ハコスカ', '（説明なし）'],
    ['Hachette', 'ディズニー・トレインをつくる', '（説明なし）'],
    ['Hachette', 'F-14 Tomcat', '（説明なし）'],
    ['Hachette', '世界の切手コレクション', '（説明なし）'],
    ['Hachette', '宇宙の神秘', '（説明なし）'],
    ['Hachette', '太平洋戦争の記憶', '（説明なし）'],
    ['Hachette', 'リラックスアロマテラピー', '（説明なし）'],
    ['Hachette', 'ニット＆クロシェ', '（説明なし）'],
    ['Hachette', '国産鉄道コレクション', '（説明なし）'],
    ['Hachette', '体のふしぎ改訂版', '（説明なし）'],
    ['Hachette', '日本の貨物列車', '（説明なし）'],
    ['Hachette', 'ミステリー・ゾーンDVDコレクション', '（説明なし）'],
    ['Hachette', '棒針あみ', '（説明なし）'],
    ['Hachette', '趣味のカリグラフィーレッスン', '（説明なし）'],
    ['Hachette', '占いの世界', '（説明なし）'],
    ['Hachette', '水彩画レッスン', '（説明なし）'],
    ['Hachette', 'かぎ針あみ', '（説明なし）'],
    ['Hachette', 'パイレーツ・オブ・カリビアン', '（説明なし）'],
    ['Hachette', '公式フェラーリF1コレクション', '（説明なし）'],
    ['Hachette', '奥さまは魔女公式DVDコレクション', '（説明なし）'],
    ['Hachette', 'リサとガスパールテーブルウェアコレクション', '（説明なし）'],
    ['Hachette', '週刊日本の魚釣り', '（説明なし）'],
    ['Hachette', 'ビッグモンスタートラック', '（説明なし）'],
    ['Hachette', '日本陸海軍機大百科', '（説明なし）'],
    ['Hachette', '戦艦ビスマルク', '（説明なし）'],
    ['Hachette', 'ジェームズ・ボンド公式DVDコレクション', '（説明なし）'],
    ['Hachette', '日産名車', '（説明なし）'],
    ['Hachette', 'まんがの達人', '（説明なし）'],
    ['Hachette', 'フェラーリコレクション', '（説明なし）'],
    ['Hachette', '体のふしぎ', '（説明なし）'],
    ['Hachette', '国産名車コレクション', '（説明なし）'],
    ['Hachette', 'パズルコレクション', '（説明なし）'],
    ['Hachette', 'タイタニック', '（説明なし）']
]



