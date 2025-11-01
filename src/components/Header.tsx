import styles from "./Header.module.css";

function GlobalMenu() {
  return (
    <ul className={styles.globalMenu}>
      <li>
        <a href="/blog">Blog</a>
      </li>
      <li>
        <a href="/products">Products</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </ul>
  );
}

function ModeToggle() {
  return (
    <button type="button" aria-label="Toggle color mode">
      <img src="/sun.svg" alt="Sun icon" />
    </button>
  );
}

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Araki Takashi</h1>
      <GlobalMenu />
      <ModeToggle />
    </header>
  );
}
