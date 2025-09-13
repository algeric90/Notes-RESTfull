import notFound from '../img/not-found.gif';
class NoteList extends HTMLElement {
  constructor() {
    super();
    this._notelist = [];
  }
  setNoteList(value) {
    this._notelist = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';
    if (this._notelist.length === 0) {
      this.innerHTML = `
                <div class="note-list__empty-state">
                    <img src="${notFound}" alt="Data not found" width="150" height="150">
                    <p>No notes found</p>
                </div>
            `;
    } else {
      this._notelist.forEach((item) => {
        const note = document.createElement('note-item');
        note.setNote(item);
        this.append(note);
      });
    }
  }
}
customElements.define('note-list', NoteList);
