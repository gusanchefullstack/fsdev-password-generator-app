import styles from './GenerateButton.module.css';

interface GenerateButtonProps {
  disabled?: boolean;
}

export function GenerateButton({ disabled }: GenerateButtonProps) {
  return (
    <button
      type="submit"
      className={styles.btn}
      disabled={disabled}
      aria-label="Generate password"
    >
      <span>GENERATE</span>
      <img src="/assets/images/icon-arrow-right.svg" alt="" aria-hidden="true" />
    </button>
  );
}
