function format(cmd, value) {
    document.execCommand(cmd, false, value);
}

var pdfOrientation = 'portrait';

// text color
document.getElementById('fontColor').addEventListener('change', function() {
    format('foreColor', this.value);
});

document.getElementById('fontName').addEventListener('change', function() {
    format('fontName', this.value);
});

document.getElementById('fontSize').addEventListener('change', function() {
    format('fontSize', 7);
    var fonts = document.getElementsByTagName('font');
    for (var i = 0; i < fonts.length; i++) {
        if (fonts[i].size == '7') {
            fonts[i].removeAttribute('size');
            fonts[i].style.fontSize = this.value;
        }
    }
});

document.getElementById('orientation').addEventListener('change', function() {
    pdfOrientation = this.value;
    saveState();
});

function addChapter() {
    var chapter = document.createElement('div');
    chapter.className = 'chapter page';
    chapter.contentEditable = true;
    chapter.innerHTML = '<h2>New Chapter</h2><p>Start writing...</p>';
    document.getElementById('content').appendChild(chapter);
}

function addPage() {
    var page = document.createElement('div');
    page.className = 'page';
    page.contentEditable = true;
    page.innerHTML = '<p>New page...</p>';
    document.getElementById('book').insertBefore(page, document.getElementById('back'));
}

document.getElementById('coverInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('cover').style.backgroundImage = 'url(' + evt.target.result + ')';
        document.getElementById('cover').style.backgroundSize = 'cover';
    };
    if (file) reader.readAsDataURL(file);
});

document.getElementById('backInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('back').style.backgroundImage = 'url(' + evt.target.result + ')';
        document.getElementById('back').style.backgroundSize = 'cover';
    };
    if (file) reader.readAsDataURL(file);
});

document.getElementById('imgInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(evt) {
        var img = document.createElement('img');
        img.src = evt.target.result;
        insertAtCursor(img);
        saveState();
    };
    if (file) reader.readAsDataURL(file);
    this.value = '';
});

function insertAtCursor(node) {
    var sel = window.getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(node);
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    saveState();
}

function saveState() {
    localStorage.setItem('bookWriterContent', document.getElementById('book').innerHTML);
    localStorage.setItem('bookWriterDark', document.body.classList.contains('dark'));
    localStorage.setItem('bookWriterOrientation', pdfOrientation);
}

function loadState() {
    var saved = localStorage.getItem('bookWriterContent');
    if (saved) {
        document.getElementById('book').innerHTML = saved;
    }
    var dark = localStorage.getItem('bookWriterDark');
    if (dark === 'true') {
        document.body.classList.add('dark');
    }
    var orient = localStorage.getItem('bookWriterOrientation');
    if (orient) {
        pdfOrientation = orient;
        document.getElementById('orientation').value = orient;
    }
}

document.addEventListener('DOMContentLoaded', loadState);
document.getElementById('book').addEventListener('input', saveState);

function exportPDF() {
    const element = document.getElementById('book');
    const opt = {
        margin:       10,
        filename:     'book.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'pt', format: 'a4', orientation: pdfOrientation }
    };
    html2pdf().set(opt).from(element).save();
}
