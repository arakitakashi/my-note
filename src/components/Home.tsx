import styles from "./Home.module.css";
import { formatDate } from "../utils/date";

type Category = {
  name: string;
  count: number;
  href: string;
  isActive?: boolean;
};

type Post = {
  title: string;
  excerpt: string;
  href: string;
  published: Date;
  updated?: Date;
};

type HomeProps = {
  categories: Category[];
  posts: Post[];
};

function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <aside className={styles.categories}>
      <h2>Categories</h2>
      {categories.length === 0 ? (
        <p className={styles.emptyText}>カテゴリの準備中です。</p>
      ) : (
        <ul className={styles.categoryList}>
          {categories.map((category) => (
            <li key={category.name}>
              <a
                href={category.href}
                className={
                  category.isActive
                    ? `${styles.categoryLink} ${styles.activeCategory}`
                    : styles.categoryLink
                }
              >
                {category.name} ({category.count})
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function PostList({ posts }: { posts: Post[] }) {
  return (
    <section className={styles.posts}>
      {posts.length === 0 ? (
        <p className={styles.postExcerpt}>
          技術記事は{" "}
          <a
            href="https://zenn.dev/arakitakashi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zenn
          </a>{" "}
          で公開しています。このサイトにはプロジェクトと活動のまとめを掲載予定です。
        </p>
      ) : (
        posts.map((post, index) => (
          <a href={post.href} key={`${post.title}-${index}`}>
            <article className={styles.post}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <div className={styles.dates}>
                <span>
                  Published:{" "}
                  <time dateTime={post.published.toISOString()}>
                    {formatDate(post.published)}
                  </time>
                </span>
                {post.updated ? (
                  <span>
                    Last Updated:{" "}
                    <time dateTime={post.updated.toISOString()}>
                      {formatDate(post.updated)}
                    </time>
                  </span>
                ) : null}
              </div>
            </article>
          </a>
        ))
      )}
    </section>
  );
}

export function Home({ categories, posts }: HomeProps) {
  return (
    <main className={styles.container}>
      <p className={styles.description}>
        I'm an AI engineer based in Tokyo. I build enterprise AI platforms
        and AI products. <br />
        I write here about RAG, AI agents, and LLM evals.
      </p>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <CategoryList categories={categories} />
          <PostList posts={posts} />
        </div>
      </div>
    </main>
  );
}
