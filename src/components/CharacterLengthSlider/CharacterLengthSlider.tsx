import { useId } from 'react';
import { createPortal } from 'react-dom';
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
  const uid = useId();
  const scopeClass = `slider-${uid.replace(/:/g, '')}`;
  const inputId = `char-length-${uid.replace(/:/g, '')}`;
  const percentage = max === min ? 0 : ((length - min) / (max - min)) * 100;

  return (
    <>
      {createPortal(
        <style>{`.${scopeClass}{--fill-percent:${percentage}%}`}</style>,
        document.head
      )}
      <div className={`${styles.container} ${scopeClass}`}>
        <div className={styles.header}>
          <label htmlFor={inputId} className={styles.label}>
            Character Length
          </label>
          <span className={styles.value} aria-live="polite">
            {length}
          </span>
        </div>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          value={length}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.slider}
          aria-label="Character length"
        />
      </div>
    </>
  );
}
