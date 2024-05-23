import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "/lib/post";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnailを取得
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

// // SSRの場合
// export async function getServerSideProps() {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//       allPostsData,
//     },
//   };


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はDXMD局です
        </p>
      </section>
      <section>
        <h2>ABCの個人ブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <p className={utilStyle.boldText}>{title}</p>
              </Link>
              <br />
              <small className={utilStyle.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
