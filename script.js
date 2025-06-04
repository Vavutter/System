function format(cmd, value) {
    document.execCommand(cmd, false, value);
}

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

function addChapter() {
    var chapter = document.createElement('div');
    chapter.className = 'chapter page';
    chapter.contentEditable = true;
    chapter.innerHTML = '<h2>New Chapter</h2><p>Start writing...</p>';
    document.getElementById('content').appendChild(chapter);
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

function exportPDF() {
    const element = document.getElementById('book');
    const opt = {
        margin:       10,
        filename:     'book.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}
