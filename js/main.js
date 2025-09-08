import {notes} from './utils/data.js';
import './components/search.js';
import './components/noteItem.js';
import './components/noteInput.js';
import './components/noteList.js';

class App extends HTMLElement {
  constructor() {
    super();
  }

connectedCallback() {
    this.render();
    this._setNoteLists();

    // handle delete
    this.addEventListener('delete', (event) => {
        const id = event.detail.id;
        const idx = notes.findIndex(note => note.id === id);
        if (idx !== -1) {
            notes.splice(idx, 1);
            this._setNoteLists();
        }
    });

    // handle archive
    this.addEventListener('archive', (event) => {
        const id = event.detail.id;
        const note = notes.find(note => note.id === id);
        if (note) {
            note.archived = !note.archived;
            this._setNoteLists();
        }
    });

    // handle add
    this.addEventListener('add', (event) => {
        const { title, body } = event.detail;
        notes.push({
            id: `data-${+new Date()}`,
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false
        });
        this._setNoteLists();
    });

    // handle search
    this.addEventListener('search', (event) => {
        const query = event.detail.query.toLowerCase();

        const filteredNotes = notes.filter(note =>
            note.title.toLowerCase().includes(query) ||
            note.body.toLowerCase().includes(query)
        );

        this._setNoteLists(filteredNotes);
    });
  }


  render() {
    this.innerHTML = `
      <header>
        <nav>
          <img src="img/logo.png" alt="logo" width="28" height="28">
          <h3>My Notes</h3>
        </nav>
        <note-search></note-search>
      </header>
      <main class="container">
        <section>
          <div class="notes" id="notes-active">
            <h3>Notes Active</h3>
            <note-list></note-list>
          </div>
          
          <div class="notes" id="notes-archived">
            <h3>Notes Archived</h3>
            <note-list></note-list>
          </div>
        </section>
        <note-input></note-input>
      </main>
      <footer>
        <small>Copyright &copy; 2025 - Notes App</small>
      </footer>
    `;
  }

  _setNoteLists(list = notes) {
    const activeList = this.querySelector('#notes-active note-list');
    activeList.setNoteList(list.filter(note => !note.archived));

    const archivedList = this.querySelector('#notes-archived note-list');
    archivedList.setNoteList(list.filter(note => note.archived));
  }
}
customElements.define('note-app', App);
