class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar " style="color: white; background-color: #FF0000;">
        <span class="mx-auto h1 fw-bold">Cook It Yourself</span>
      </nav>`;
  }
}

customElements.define('app-bar', AppBar);
