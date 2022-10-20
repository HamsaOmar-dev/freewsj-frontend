import Link from "next/link";

import styles from "../../styles/Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <button>
        <Link href="/">
          <h1>The Wall Street Journal</h1>
        </Link>
      </button>
      <br />
      <button>
        <Link href="/articles">
          <span>Latest</span>
        </Link>
      </button>
      <span>LogIn</span>
    </div>
  );
}

export default Header;
