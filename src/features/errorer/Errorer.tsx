import styles from "./Errorer.module.scss";

interface IProps {
  isOpen: boolean;
  error: string;
}

function Errorer({ isOpen, error }: IProps) {
  return (
    isOpen && (
      <>
        <p>{error}</p>
      </>
    )
  );
}

export default Errorer;
