import styles from "./Home.module.css";

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
          まだ記事がありません。更新までしばらくお待ちください。
        </p>
      ) : (
        posts.map((post, index) => (
          <article key={`${post.title}-${index}`} className={styles.post}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            <a href={post.href} className={styles.readMore}>
              Read more ...
            </a>
          </article>
        ))
      )}
    </section>
  );
}

export function Home({ categories, posts }: HomeProps) {
  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <CategoryList categories={categories} />
          <PostList posts={posts} />
        </div>
      </div>
    </main>
  );
}
