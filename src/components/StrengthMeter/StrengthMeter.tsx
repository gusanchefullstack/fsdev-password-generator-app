import type { StrengthLevel } from '../../hooks/usePasswordGenerator';
import styles from './StrengthMeter.module.css';

interface StrengthMeterProps {
  strength: StrengthLevel;
}

const STRENGTH_CONFIG: Record<
  Exclude<StrengthLevel, null>,
  { label: string; bars: number; colorClass: string }
> = {
  'too-weak': { label: 'TOO WEAK!', bars: 1, colorClass: styles.tooWeak },
  weak: { label: 'WEAK', bars: 2, colorClass: styles.weak },
  medium: { label: 'MEDIUM', bars: 3, colorClass: styles.medium },
  strong: { label: 'STRONG', bars: 4, colorClass: styles.strong },
};

export function StrengthMeter({ strength }: StrengthMeterProps) {
  const config = strength ? STRENGTH_CONFIG[strength] : null;

  return (
    <div className={styles.container} role="status" aria-label={`Password strength: ${config?.label ?? 'not generated'}`}>
      <h2 className={styles.heading}>STRENGTH</h2>
      <div className={styles.result}>
        {config && (
          <span className={styles.label}>{config.label}</span>
        )}
        <div className={styles.bars} aria-hidden="true">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`${styles.bar} ${config && bar <= config.bars ? config.colorClass : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
