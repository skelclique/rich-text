let editor = document.querySelector('.editor');

let defaultText = `<font size="7"> RICH TEXT <br></font>
created by
<a href="https://www.github.com/skelclique" target="_blank">
  skelclique
</a>
<br><br>
- click on <i class="fas fa-edit" aria-hidden="true"></i> to start editing -`;

editor.style.textAlign = 'center';
editor.innerHTML = defaultText;

function switchEditable(condition) {
  editor.contentEditable = `${condition}`;
}

document.querySelectorAll('i').forEach((item, index) => {
  switch (index) {
    case 0:
      item.onmousedown = () => {
        increaseFontSize();
      }
      break;

    case 1:
      item.onmousedown = () => {
        boldText();
      }
      break;

    case 2:
      item.onmousedown = () => {
        italicText();
      }
      break;

    case 3:
      item.onmousedown = () => {
        codeFormatText();
      }
      break;

    case 4:
      item.onmousedown = () => {
        insertList();
      }
      break;

    case 5:
      item.onmousedown = () => {
        underlineText();
      }
      break;

    case 6:
      item.onmousedown = () => {
        createQuotation();
      }
      break;

    case 7:
      item.onmousedown = () => {
        createLink();
      }
      break;

    case 8:
      item.onmousedown = () => {
        if (editor.contentEditable == 'true') {
          switchEditable(false);
          item.style.color = '#a3a3a3';

          if (editor.innerHTML == '' || editor.innerHTML.length < 2) {
            editor.style.textAlign = 'center';
            editor.innerHTML = defaultText;
            editor.style.padding = '10vh 0';
          }
        } else {
          switchEditable(true);
          item.style.color = '#1d1d1d';
          if (editor.innerHTML == defaultText) {
            editor.innerHTML = '';
            editor.style.textAlign = 'left';
            editor.style.paddingTop = '0';
            setTimeout(() => {
              editor.focus();
            }, 0);
          }
        }
      }
      break;

    default:
      break;
  }
});

function increaseFontSize() {
  let selection = window.getSelection().anchorNode.parentElement;

  if (selection.size == 7) {
    document.execCommand('removeFormat');
  } else {
    document.execCommand('fontSize', false, 7);
  }
}

function boldText() {
  document.execCommand('bold');
}

function italicText() {
  document.execCommand('italic');
}

function codeFormatText() {
  let selection = window.getSelection().anchorNode.parentElement;

  if (selection.face == 'monospace') {
    document.execCommand('removeFormat');
  } else {
    document.execCommand('fontName', false, 'monospace');
  }
}

function insertList() {
  document.execCommand('insertUnorderedList');
}

function createQuotation() {
  let selection = window.getSelection().anchorNode.parentElement.parentElement;
  let text = window.getSelection().toString();

  if (selection.className == 'quotation') {
    selection.remove();
    document.execCommand('insertHtml', false, `${text}`)
  } else {
    document.execCommand('insertHTML', false, `<div class="quotation"> 
    <div class="line" contenteditable="false"></div>
    <i class="fas fa-quote-left"></i>
    <div class="quote">"${text}"</div>
    </div>`);
  }
}

function underlineText() {
  document.execCommand('underline');
}

function createLink() {
  let selection = document.getSelection().anchorNode.parentElement;
  let text = window.getSelection().toString();

  if (selection.tagName == 'A') {
    selection.remove();
    document.execCommand('insertHtml', false, `${text}`)
  } else {
    let userUrl = window.prompt('Enter the link:');
    let url = userUrl;

    !userUrl.startsWith('https://www.') ? url = `https://www.${userUrl}` : null;

    (userUrl.length > 0) ? document.execCommand('insertHTML', false,
      `<a href="${url}" target="_blank">${document.getSelection().toString()}</a>`) : null;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) {
    switch (e.key) {
      case '.':
        increaseFontSize();
        break;

      case 'm':
        codeFormatText();
        break;

      case 'y':
        insertList();
        break;

      case ',':
        createLink();
        break;

      case 'q':
        createQuotation();
        break;

      default:
        break;
    }
  }
});