// セクションの要素を取得
const homeSection = document.getElementById('homeSection');
const aboutSection = document.getElementById('aboutSection');
const contactSection = document.getElementById('contactSection');

// ボタンの要素を取得
const homeButton = document.getElementById('homeButton');
const aboutButton = document.getElementById('aboutButton');
const contactButton = document.getElementById('contactButton');

// クリックイベントをそれぞれのボタンに設定
homeButton.addEventListener('click', function() {
    showSection(homeSection);
});
aboutButton.addEventListener('click', function() {
    showSection(aboutSection);
});
contactButton.addEventListener('click', function() {
    showSection(contactSection);
});

// セクションを表示する関数
function showSection(section) {
    // すべてのセクションを非表示にする
    homeSection.classList.remove('active');
    aboutSection.classList.remove('active');
    contactSection.classList.remove('active');

    // 選択したセクションを表示する
    section.classList.add('active');
}
