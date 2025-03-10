import { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useSuggestions } from "entities/country";
import { useDebounce } from "shared/lib/hooks";
import styles from "./SearchInput.module.scss";
import { useTranslation } from "react-i18next";

const SearchInput = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedText = useDebounce(text, 200);
  const { suggestions, getSuggestionsByText } = useSuggestions({ input: debouncedText });

  const extractCca3 = (elements: typeof suggestions): string | null => {
    return elements?.map((item) => item.cca3).join(",") || null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text) {
      inputRef.current?.blur();
      const cca3Codes = extractCca3(debouncedText === text ? suggestions : getSuggestionsByText(text));
      if (!cca3Codes || !cca3Codes.length) {
        params.set("search", "no-countries");
      } else {
        params.set("search", cca3Codes);
      }
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <svg
        className={clsx(styles.loupe, {
          [styles.focused]: text,
          [styles.blurred]: !text,
        })}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        transform="matrix(-1, 0, 0, 1, 0, 0)"
      >
        <path d="M497.938,430.063l-126.914-126.91C389.287,272.988,400,237.762,400,200C400,89.719,310.281,0,200,0 C89.719,0,0,89.719,0,200c0,110.281,89.719,200,200,200c37.762,0,72.984-10.711,103.148-28.973l126.914,126.91 C439.438,507.313,451.719,512,464,512c12.281,0,24.563-4.688,33.938-14.063C516.688,479.195,516.688,448.805,497.938,430.063z M64,200c0-74.992,61.016-136,136-136s136,61.008,136,136s-61.016,136-136,136S64,274.992,64,200z"></path>{" "}
      </svg>
      <input
        ref={inputRef}
        className={clsx(styles.input, {
          [styles.filled]: isFocused && text && suggestions?.length && text === debouncedText,
        })}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={t("main.search.placeholder")}
      />
      <button
        type="submit"
        className={clsx(styles.submitButton, {
          [styles.focused]: text,
          [styles.blurred]: !text || !suggestions?.length,
        })}
      >
        {t("main.search.button.text")}
      </button>
      {isFocused && suggestions && suggestions.length > 0 && text && text === debouncedText && (
        <div className={styles.suggestionsWrapper}>
          <p className={styles.forward}>Бытрый переход</p>
          <div className={styles.suggestions}>
            <ul>
              {suggestions?.map((suggestion) => (
                <li key={suggestion.name.common}>
                  <div className={styles.aWrapper}>
                    <Link to={`/${suggestion.cca3}`} className={styles.a} onMouseDown={(e) => e.preventDefault()}>
                      {suggestion.translations.rus.official}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchInput;
