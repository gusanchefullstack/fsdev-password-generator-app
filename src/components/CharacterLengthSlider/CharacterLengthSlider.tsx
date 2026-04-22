import styles from './CharacterLengthSlider.module.css';

interface CharacterLengthSliderProps {
  length: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function CharacterLengthSlider({
  length,
  onChange,
  min = 1,
  max = 20,
}: CharacterLengthSliderProps) {
  const percentage = max === min ? 0 : ((length - min) / (max - min)) * 100;

  return (
    <div
      className={styles.container}
      style={{ '--fill-percent': `${percentage}%` } as React.CSSProperties}
    >
      <div className={styles.header}>
        <label htmlFor="char-length" className={styles.label}>
          Character Length
        </label>
        <span className={styles.value} aria-live="polite">
          {length}
        </span>
      </div>
      <input
        id="char-length"
        type="range"
        min={min}
        max={max}
        value={length}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={length}
        aria-label="Character length"
      />
    </div>
  );
}
