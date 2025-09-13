class noteInput extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <form>
        <div class="form-group">
          <div class="form-group__header">
            <label for="title">Title</label>
            <p id="charCount">Karakter tersisa: <span>50</span></p>
          </div>
          <input class="form-control" type="text" name="title" id="title" maxlength="50" required>
        </div>
          
        <div class="form-group">
          <label for="content">Content</label>
          <textarea class="form-control" name="content" id="content" rows="8" required></textarea>
        </div>
        <button class="btn-primary" type="submit" id="addButton">Tambah</button>
      </form>
    `;

    const form = this.querySelector('form');
    const titleInput = this.querySelector('#title');
    const charCount = this.querySelector('#charCount');

    // submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = titleInput.value;
      const body = this.querySelector('#content').value;
      this.dispatchEvent(
        new CustomEvent('add', {
          detail: { title, body },
          bubbles: true,
        })
      );
      form.reset();
      charCount.textContent = 50;
    });

    // update sisa karakter
    titleInput.addEventListener('input', () => {
      const remaining = 50 - titleInput.value.length;
      if (remaining === 0) {
        charCount.style.color = 'red';
        charCount.textContent = 'Maksimal karakter tercapai';
      } else {
        charCount.textContent = `Karakter tersisa : ` + remaining;
        charCount.style.color = '#aefeff';
      }
    });
  }
}

customElements.define('note-input', noteInput);
