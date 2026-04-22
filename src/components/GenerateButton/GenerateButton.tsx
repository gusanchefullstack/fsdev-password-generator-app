import styles from './GenerateButton.module.css';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function GenerateButton({ onClick, disabled }: GenerateButtonProps) {
  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onClick}
      disabled={disabled}
      aria-label="Generate password"
    >
      <span>GENERATE</span>
      <img src="/assets/images/icon-arrow-right.svg" alt="" aria-hidden="true" />
    </button>
  );
}
