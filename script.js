const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');

// 1. 페이지 로드 시 기존 메모 불러오기
document.addEventListener('DOMContentLoaded', getMemos);

// 2. 메모 추가 이벤트
addBtn.addEventListener('click', addMemo);

// 엔터 키 지원
memoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addMemo();
});

function addMemo() {
    const memoText = memoInput.value.trim();
    if (memoText === "") return;

    const memoObj = {
        id: Date.now(),
        text: memoText
    };

    createListElement(memoObj);
    saveMemo(memoObj);
    memoInput.value = "";
}

// 화면에 리스트 아이템 생성
function createListElement(memoObj) {
    const li = document.createElement('li');
    li.setAttribute('data-id', memoObj.id);
    li.innerHTML = `
        <span>${memoObj.text}</span>
        <button class="delete-btn" onclick="deleteMemo(${memoObj.id})">삭제</button>
    `;
    memoList.appendChild(li);
}

// 로컬 스토리지 저장
function saveMemo(memo) {
    let memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.push(memo);
    localStorage.setItem('memos', JSON.stringify(memos));
}

// 로컬 스토리지 로드
function getMemos() {
    let memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.forEach(memo => createListElement(memo));
}

// 메모 삭제
function deleteMemo(id) {
    // 화면에서 삭제
    const li = document.querySelector(`li[data-id="${id}"]`);
    li.remove();

    // 로컬 스토리지에서 삭제
    let memos = JSON.parse(localStorage.getItem('memos'));
    const filteredMemos = memos.filter(memo => memo.id !== id);
    localStorage.setItem('memos', JSON.stringify(filteredMemos));
}