import styles from './PasswordDisplay.module.css';

interface PasswordDisplayProps {
  password: string;
  copied: boolean;
  onCopy: () => void;
}

export function PasswordDisplay({ password, copied, onCopy }: PasswordDisplayProps) {
  return (
    <div className={styles.container}>
      <p
        className={`${styles.password} ${!password ? styles.placeholder : ''}`}
        aria-label="Generated password"
        aria-live="polite"
      >
        {password || 'P4$5W0rD!'}
      </p>
      <button
        className={styles.copyBtn}
        onClick={onCopy}
        aria-label={copied ? 'Password copied to clipboard' : 'Copy password to clipboard'}
        disabled={!password}
      >
        {copied && <span className={styles.copiedLabel}>COPIED</span>}
        {copied ? (
          <img src="/assets/images/icon-check.svg" alt="" aria-hidden="true" />
        ) : (
          <img src="/assets/images/icon-copy.svg" alt="" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
