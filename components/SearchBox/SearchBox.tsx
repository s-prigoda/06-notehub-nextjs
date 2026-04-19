import css from './SearchBox.module.css';

// 1. Змінюємо назву інтерфейсу на SearchBoxProps
interface SearchBoxProps {
  onChange: (value: string) => void;
}

// 2. Змінюємо назву функції на SearchBox
export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <div className={css.searchWrapper}>
      <input
        type="text"
        className={css.input}
        placeholder="Пошук нотаток..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
