import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import styles from "../../../styles/article.module.css";

function Article({ data }) {
  return (
    <div className={styles.article}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className={styles.articleHead}>
        <h1>{data.title}</h1>
        <h3>{data.subTitle}</h3>
        <p>By: {data.author}</p>
        <p>
          <i>{data.date}</i>
        </p>
        <Image
          src={JSON.parse(data.image)?.src}
          alt=""
          width={JSON.parse(data.image)?.width}
          height={JSON.parse(data.image)?.height}
        />
      </div>
      <div className={styles.articleBody}>
        {JSON.parse(data.body).map((bodyData, index) => {
          return <p key={index}>{bodyData}</p>;
        })}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await axios.get(
    "https://freewsj-backend.vercel.app/articles/" + context.params.title
  );
  const data = await res.data;

  return { props: { data } };
}

export async function getStaticPaths() {
  const res = await axios.get("https://freewsj-backend.vercel.app/articles");
  const data = await res.data;

  const paths = data.map((article) => ({
    params: { title: article.title },
  }));

  return { paths, fallback: false };
}

export default Article;
