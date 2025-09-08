class NoteItem extends HTMLElement {
    constructor() {
        super();
        this._note = {
            id: '',
            title: '',
            body: '',
            createdAt: '',
            archived: false
        };
    }

    setNote(value) {
        this._note.id = value.id;
        this._note.title = value.title;
        this._note.createdAt = value.createdAt;
        this._note.body = value.body;
        this._note.archived = value.archived;
        this.setAttribute("data-id", this._note.id);
        this.setAttribute("data-archived", this._note.archived);
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    archiveHandler() {
        this.dispatchEvent(new CustomEvent('archive', {
            detail: this._note,
            bubbles: true
        }));
    }

    deleteHandler() {
        this.dispatchEvent(new CustomEvent('delete', {
            detail: this._note,
            bubbles: true
        }));
    }

    render() {

        const archiveColor = this._note.archived
            ? 'btn-primary'
            : 'btn-success';
        const archiveIcon = this._note.archived
            ? '<i class="fa-solid fa-undo"></i>'
            : '<i class="fa-solid fa-box-archive"></i>';
        const archiveTitle = this._note.archived
            ? 'Unarchive Note'
            : 'Archive Note';

        this.innerHTML = `
            <div class="note-item__content">
                <h3 class="note-item__title">${this._note.title}</h3>
                <p class="note-item__date">${this._note.createdAt}</p>
                <p class="note-item__body">${this._note.body}</p>
            </div>
            <div class="note-item__action">
                <button class="note-item__archive-button btn ${archiveColor}" title="${archiveTitle}">${archiveIcon}</button>
                <button class="note-item__delete-button btn btn-danger" title="Delete Note"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
        this.querySelector('.note-item__delete-button')
            .addEventListener('click', () => this.deleteHandler());
        this.querySelector('.note-item__archive-button')
            .addEventListener('click', () => this.archiveHandler());
    }
}
customElements.define('note-item', NoteItem);
