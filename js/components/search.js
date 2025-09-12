class searchBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
            <input class="form-control" type="text" id="searchElement" placeholder="Search notes...">
            <button class="btn btn-primary" id="searchButtonElement">Cari</button>
        `;
  }

  connectedCallback() {
    const input = this.querySelector("#searchElement");
    const button = this.querySelector("#searchButtonElement");

    // klik tombol cari
    button.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("search", {
          detail: { query: input.value },
          bubbles: true,
        }),
      );
    });
  }
}
customElements.define("note-search", searchBar);
