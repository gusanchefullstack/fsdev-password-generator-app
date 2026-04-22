import { useId } from 'react';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import { PasswordDisplay } from './components/PasswordDisplay/PasswordDisplay';
import { CharacterLengthSlider } from './components/CharacterLengthSlider/CharacterLengthSlider';
import { OptionCheckbox } from './components/OptionCheckbox/OptionCheckbox';
import { StrengthMeter } from './components/StrengthMeter/StrengthMeter';
import { GenerateButton } from './components/GenerateButton/GenerateButton';
import styles from './App.module.css';

const OPTIONS = [
  { key: 'uppercase' as const, label: 'Include Uppercase Letters' },
  { key: 'lowercase' as const, label: 'Include Lowercase Letters' },
  { key: 'numbers' as const, label: 'Include Numbers' },
  { key: 'symbols' as const, label: 'Include Symbols' },
];

function App() {
  const {
    password,
    length,
    setLength,
    options,
    toggleOption,
    strength,
    copied,
    generate,
    copyToClipboard,
  } = usePasswordGenerator();

  const sliderId = useId();
  const sliderInputId = `char-length-${sliderId.replace(/:/g, '')}`;
  const hasOptions = Object.values(options).some(Boolean);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Password Generator</h1>

      <div className={styles.card}>
        <PasswordDisplay
          password={password}
          copied={copied}
          onCopy={copyToClipboard}
          sliderInputId={sliderInputId}
        />

        <form
          className={styles.controls}
          aria-label="Password options"
          onSubmit={(e) => { e.preventDefault(); generate(); }}
        >
          <CharacterLengthSlider
            length={length}
            onChange={setLength}
            inputId={sliderInputId}
          />

          <fieldset className={styles.checkboxGroup}>
            <legend className="sr-only">Character type options</legend>
            {OPTIONS.map(({ key, label }) => (
              <OptionCheckbox
                key={key}
                id={key}
                label={label}
                checked={options[key]}
                onChange={() => toggleOption(key)}
              />
            ))}
          </fieldset>

          <StrengthMeter strength={strength} />

          <GenerateButton disabled={!hasOptions} />
        </form>
      </div>
    </main>
  );
}

export default App;
