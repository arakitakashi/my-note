import styles from "./Header.module.css";

type HeaderProps = {
  currentPath?: string;
};

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Blog",
  },
  {
    href: "/products",
    label: "Products",
  },
  {
    href: "/about",
    label: "About",
  },
];

function isActiveLink(currentPath: string | undefined, href: string) {
  if (!currentPath) {
    return href === "/";
  }

  if (href === "/") {
    return currentPath === "/" || currentPath.startsWith("/blog");
  }

  return currentPath.startsWith(href);
}

function GlobalMenu({ currentPath }: HeaderProps) {
  return (
    <ul className={styles.globalMenu} aria-label="Primary navigation">
      {navItems.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className={
              isActiveLink(currentPath, item.href) ? styles.activeLink : undefined
            }
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ModeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle color mode"
      className={styles.modeToggle}
    >
      <img src="/sun.svg" alt="Sun icon" />
    </button>
  );
}

export default function Header({ currentPath }: HeaderProps) {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand} aria-label="Takashi Araki Home">
        Takashi Araki
      </a>
      <GlobalMenu currentPath={currentPath} />
      <ModeToggle />
    </header>
  );
}
