import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import styles from "../../styles/articles.module.css";

function Articles({ data }) {
  return (
    <div className={styles.articles}>
      <Head>
        <title>WSJ Articles</title>
      </Head>
      <div className={styles.articleTitle}>
        <h1>Latest Articles</h1>
      </div>
      <table>
        {data.map((article, index) => {
          return (
            <tr key={index}>
              <td className={styles.articleRow}>
                <div className={styles.articleHeader}>
                  <h2>{article.title}</h2>
                  <h4>{article.subTitle}</h4>
                  <p>By: {article.author}</p>
                </div>
                {JSON.parse(article.body)
                  .slice(0, 2)
                  .map((bodyData, index) => {
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
  );
}

export async function getServerSideProps() {
  const res = await axios.get("https://api.freewsj.com/articles");
  const data = res.data;

  return { props: { data } };
}

export default Articles;
