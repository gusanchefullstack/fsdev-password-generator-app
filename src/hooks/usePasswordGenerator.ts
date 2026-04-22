import { useState, useCallback } from 'react';

export type StrengthLevel = 'too-weak' | 'weak' | 'medium' | 'strong' | null;

export interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function calculateStrength(length: number, options: PasswordOptions): StrengthLevel {
  const activeCount = Object.values(options).filter(Boolean).length;
  if (activeCount === 0) return null;
  if (activeCount === 1 || length <= 5) return 'too-weak';
  if (activeCount === 2 || length <= 8) return 'weak';
  if (activeCount === 3 || length <= 12) return 'medium';
  return 'strong';
}

function generatePassword(length: number, options: PasswordOptions): string {
  let charset = '';
  const guaranteedChars: string[] = [];

  (Object.keys(options) as Array<keyof PasswordOptions>).forEach((key) => {
    if (options[key]) {
      charset += CHAR_SETS[key];
      const pool = CHAR_SETS[key];
      guaranteedChars.push(pool[Math.floor(Math.random() * pool.length)]);
    }
  });

  if (charset === '') return '';

  const remaining = length - guaranteedChars.length;
  const randomChars: string[] = [];
  for (let i = 0; i < remaining; i++) {
    randomChars.push(charset[Math.floor(Math.random() * charset.length)]);
  }

  const allChars = [...guaranteedChars, ...randomChars];
  for (let i = allChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
  }

  return allChars.join('');
}

export function usePasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(10);
  const [options, setOptions] = useState<PasswordOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<StrengthLevel>(null);

  const generate = useCallback(() => {
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
    setStrength(calculateStrength(length, options));
    setCopied(false);
  }, [length, options]);

  const copyToClipboard = useCallback(async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  const toggleOption = useCallback((key: keyof PasswordOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return {
    password,
    length,
    setLength,
    options,
    toggleOption,
    strength,
    copied,
    generate,
    copyToClipboard,
  };
}
