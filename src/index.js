import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import noteAPI from './utils/data.js';
import logo from './img/logo.png';
import loading from './img/loading.gif';
import './components/search.js';
import './components/noteItem.js';
import './components/noteInput.js';
import './components/noteList.js';

class App extends HTMLElement {
  constructor() {
    super();
    this.notes = [];
  }

  async connectedCallback() {
    this.render();
    const api = noteAPI();
    const showResponseMessage = (message = 'Check your internet connection') => {
      alert(message);
    };
    const renderAllNotes = async () => {
      const loading = document.querySelector('.loading');
      loading.style.display = 'block';
      try {
        const active = await api.getNotes();
        const archived = await api.getArchivedNotes();
        this.notes = [...active, ...archived];
        this._setNoteLists(this.notes);
      } catch (error) {
        this.notes = [];
        showResponseMessage(error.message);
        this._setNoteLists(this.notes);
      } finally {
        loading.style.display = 'none';
      }
    };

    await renderAllNotes();

    // handle add
    this.addEventListener('add', async (event) => {
      try {
        const { title, body } = event.detail;
        await api.createNote({ title, body });
        await renderAllNotes();
      } catch (error) {
        showResponseMessage(error.message);
      }
    });

    // handle delete
    this.addEventListener('delete', async (event) => {
      try {
        const id = event.detail.id;
        await api.deleteNote(id);
        await renderAllNotes();
      } catch (error) {
        showResponseMessage(error.message);
      }
    });

    // handle archive
    this.addEventListener('archive', async (event) => {
      try {
        const id = event.detail.id;
        const note = await api.getSingleNote(id);
        if (note.archived) {
          await api.unarchiveNote(id);
        } else {
          await api.archiveNote(id);
        }
        await renderAllNotes();
      } catch (error) {
        showResponseMessage(error.message);
      }
    });


    // handle search
    this.addEventListener('search', (event) => {
      const query = event.detail.query.toLowerCase();
      const filteredNotes = this.notes.filter((note) =>
        note.title.toLowerCase().includes(query)
      );
      this._setNoteLists(filteredNotes);
    });
  }

  render() {
    this.innerHTML = `
      <header>
        <nav>
          <img src="${logo}" alt="logo" width="28" height="28">
          <h3>My Notes</h3>
        </nav>
        <note-search></note-search>
      </header>
      <main class="container">
        <section>
          <div class="loading" style="display:none; text-align:center; margin:20px 0;">
            <img src="${loading}" alt="Loading..." width="50" height="50">
          </div>
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
        <small>Copyright &copy; ARL 2025 - Notes App</small>
      </footer>
    `;
  }

  _setNoteLists(list) {
    const activeList = this.querySelector('#notes-active note-list');
    activeList.setNoteList(list.filter((note) => !note.archived));

    const archivedList = this.querySelector('#notes-archived note-list');
    archivedList.setNoteList(list.filter((note) => note.archived));
  }
}

customElements.define('note-app', App);
