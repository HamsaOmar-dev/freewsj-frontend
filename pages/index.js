import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import styles from "../styles/index.module.css";

function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Freewsj</title>
        <meta name="description" content="Read wsj articles fro FREE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.homeTable}>
        <table>
          {data.map((article, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className={styles.homeHeader}>
                    <h2>{article.title}</h2>
                    <h4>{article.subTitle}</h4>
                    <p>By: {article.author}</p>
                  </div>
                  {JSON.parse(article.body).slice(0, 2).map((bodyData, index) => {
                    return <p key={index}>{bodyData}</p>;
                  })}
                  <p>
                    <i>{article.date}</i>
                  </p>
                  <Link href={"/articles/" + article.title}>
                    <button>Read More...</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className={styles.homeLink}>
        <Link href={"/articles"}>
          <button>Read Latest Articles</button>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("https://api.freewsj.com/");
  const data = res.data;

  return { props: { data } };
}

export default Home;
