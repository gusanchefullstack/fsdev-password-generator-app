import styles from './OptionCheckbox.module.css';

interface OptionCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export function OptionCheckbox({ id, label, checked, onChange }: OptionCheckboxProps) {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={styles.input}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
