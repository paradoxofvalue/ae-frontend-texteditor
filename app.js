'use strict';

class TextEditor {
    constructor(element, options) {
        this.domElement = element;
        this.createDom();

        this.editor = document.querySelector('.texteditor__editor');

        this.domElement.addEventListener('click', this.delegateEvents.bind(this));
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

    delegateEvents(event) {
        switch (event.target.tagName) {
            case 'BUTTON':
                {
                    document.execCommand(event.target.getAttribute('data-action'), false);
                    break;
                }
            case 'SELECT':
                {
                    document.execCommand(
                        event.target.getAttribute('data-action'),
                        false,
                        event.target[event.target.selectedIndex].value
                    );
                }
        }
    }

    destroy() {
        while (this.domElement.childElementCount) {
            this.domElement.childrens[0].remove();
        }
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
            <select data-action="forecolor">
                <option value="" selected>choose color</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
            </select>
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

let url = `https://api.datamuse.com/words?`,
    type = 'rel_syn=';

class Datamuse {
    constructor() {}
    static getDatamuse(word, type) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url + type + word);
            xhr.onload = () => resolve(JSON.parse(xhr.responseText));
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }
}

Datamuse.getDatamuse('duck', type).then(
    result => {
        debugger;
    },
    error => {
        debugger;
    }
)

let texteditor = new TextEditor(document.querySelector('.texteditor'));