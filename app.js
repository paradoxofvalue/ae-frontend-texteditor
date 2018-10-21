'use strict';

class TextEditor {
    constructor(element, options) {
        this.domElement = element;
        this.createDom();

        this.editor = document.querySelector('.texteditor__editor');

        this.domElement.addEventListener('input', this.delegateInput.bind(this));
        this.domElement.addEventListener('click', this.delegateEvents.bind(this));
        this.domElement.addEventListener('dblclick', this.delegateEvents.bind(this));
        return this;
    }

    getSelectionHtml() {
        var sel = window.getSelection();
        let startElement, endElement, endIndex, allSelectedElements = [];
        if (sel.rangeCount) {
            console.log(sel.rangeCount)
            var range = sel.getRangeAt(0);
            texteditor.editor.childNodes.forEach((element, index) => {
                if (element == range.startContainer.parentElement) {
                    startElement = element;
                }
                if (element == range.endContainer.parentElement) {
                    endElement = element;
                    endIndex = index;
                }
                if (startElement) {
                    if (!endIndex) {
                        allSelectedElements.push(element);
                    } else {
                        if (endIndex >= index) {
                            allSelectedElements.push(element);
                        }
                    }
                }
            })
        }
        return allSelectedElements;
    }

    delegateInput(event) {
        switch (event.inputType) {
            case 'insertParagraph':
                {
                    this.editor.innerHTML.replace('<div><br></div>', '');
                    this.editor.innerHTML += '<br/>';
                    break;
                }
            case 'deleteContentBackward':
                {
                    return event;
                    break;
                }
            case 'insertText':
                {
                    if (!event.data || event.data == ' ') {
                        return event;
                    }
                    this.editor.innerHTML += `<span>${event.data}</span>`;
                    console.log(event.data);
                    break;
                }
            case 'deleteContentBackward':
                {
                    return event;
                    break;
                }
            case 'deleteContentForward':
                {
                    return event;
                    break;
                }
            case 'insertFromPaste':
                {
                    debugger
                    break;
                }
        }

        this.moveCursorToEnd()
    }


    moveCursorToEnd() {
        let range = document.createRange();
        range.selectNodeContents(this.editor);
        range.collapse(false);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    delegateEvents(event) {
        if (event.target.tagName == 'BUTTON') {
            let action = event.target.getAttribute('data-action');
            let selection = this.getSelectionHtml();
            let trigger = selection.every(letter => {
                return letter.classList.contains(`text__${action}`)
            })

            selection.forEach(letter => {
                trigger ? letter.classList.remove(`text__${action}`) : letter.classList.add(`text__${action}`);
            })
        }
    }

    destroy() {
        while (this.domElement.childElementCount) {
            this.domElement.childrens[0].remove();
        }
        // remove class props
    }

    createDom() {
        this.destroy();
        this.createHeader();
        this.createControls();
        this.createEditor();
        this.createFooter();
    }

    createHeader() {
        this.domElement.innerHTML += `
        <header class="texteditor__header">
            <h4>Vanilla editor</h4>
        </header>
        `;
    }

    createControls() {
        this.domElement.innerHTML += `
        <div class="texteditor__actions">
            <button data-action="bold">B</button>
            <button data-action="italic">I</button>
            <button data-action="underline">U</button>
        </div>
        `;
    }

    createEditor() {
        this.domElement.innerHTML += `
        <div class="texteditor__editor" contenteditable="true"></div
        `;
    }

    createFooter() {
        this.domElement.innerHTML += `
        <footer class="texteditor__footer">
            <p>&copy;created by Vadym Lavorchuk</p>
        </footer>
        `
    }
}


let texteditor = new TextEditor(document.querySelector('.texteditor'));