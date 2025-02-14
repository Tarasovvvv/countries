import styles from "./Loader.module.scss";

interface IProps {
  isOpen?: boolean;
}

function Loader({ isOpen }: IProps) {
  if (isOpen === false) return null;
  return (
    isOpen && (
      <div className={styles.loader}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    )
  );
}

export default Loader;
