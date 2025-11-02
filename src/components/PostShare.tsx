import {
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  ThreadsIcon,
  ThreadsShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import styles from "./PostShare.module.css";

type PostShareProps = {
  url: string;
  title: string;
  className?: string;
};

export function PostShare({ url, title, className }: PostShareProps) {
  const containerClass = className
    ? `${styles.container} ${className}`
    : styles.container;

  return (
    <div className={containerClass}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <TwitterShareButton
            url={url}
            title={title}
            className={styles.button}
            aria-label="Share on X"
          >
            <XIcon size={24} />
          </TwitterShareButton>
        </li>
        <li className={styles.item}>
          <ThreadsShareButton
            url={url}
            title={title}
            aria-label="Share on Threads"
          >
            <ThreadsIcon size={24} />
          </ThreadsShareButton>
        </li>
        <li className={styles.item}>
          <HatenaShareButton
            url={url}
            title={title}
            aria-label="はてなブックマークに追加"
          >
            <HatenaIcon size={24} />
          </HatenaShareButton>
          <div className={styles.hatenaMeta}>
            <HatenaShareCount url={url} className={styles.count} />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default PostShare;
