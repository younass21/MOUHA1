function closeImage() {
    modal.style.display = "none";
}

const map = {
    'ا': '*', 'أ': '×', 'ب': '÷', 'ت': '+', 'ث': '-', 'ج': ':',
    'ح': '/', 'خ': '\\', 'د': '|', 'ذ': '!', 'ر': '٪', 'ز': '%',
    'س': '•', 'ش': '°', 'ص': '«', 'ض': '»', 'ط': '^', 'ع': '?',
    '؟': '?', 'غ': '¿', 'ف': "'", 'ق': '"', 'ك': '$', 'ل': '✓',
    'م': '=', 'ن': '∆', 'ه': '&', 'و': '~', 'ي': '#', ' ': '…'
};

const reverseMap = {};
for (let key in map) {
    reverseMap[map[key]] = key;
}

function encodeText() {
    const arabicText = document.getElementById("arabicText").value;
    let code = '';
    for (let char of arabicText) {
        code += map[char] || char;
    }
    document.getElementById("codeText").value = code;
}

function decodeText() {
    const codeText = document.getElementById("codeText").value;
    let text = '';
    for (let char of codeText) {
        text += reverseMap[char] || char;
    }
    document.getElementById("arabicText").value = text;
}

function copyText(id) {
    const textArea = document.getElementById(id);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    try {
        document.execCommand('copy');
        alert('✅ تم النسخ!');
    } catch (err) {
        alert('⚠️ هذا المتصفح لا يدعم النسخ التلقائي.');
    }
}

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

// تأكد ان النافذة المخفية عند بداية التحميل
modal.style.display = "none";

function openImage() {
    modal.style.display = "flex";
    currentScale = 1;
    modalImg.style.transform = `scale(${currentScale})`;
}



let currentScale = 1;
const scaleStep = 0.1;
const minScale = 1;
const maxScale = 3;

modalImg.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (e.deltaY < 0) {
        currentScale += scaleStep;
    } else {
        currentScale -= scaleStep;
    }
    currentScale = Math.min(Math.max(currentScale, minScale), maxScale);
    modalImg.style.transform = `scale(${currentScale})`;
});

modalImg.addEventListener('click', function (e) {
    e.stopPropagation();
});

document.getElementById("encodeBtn").addEventListener("click", encodeText);
document.getElementById("decodeBtn").addEventListener("click", decodeText);
