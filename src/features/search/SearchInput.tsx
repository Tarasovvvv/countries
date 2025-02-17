import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useSuggestions } from "entities/country";
import { useDebounce } from "shared/lib/hooks";
import { Loader } from "features";
import { ICountry } from "shared/types";
import styles from "./SearchInput.module.scss";

const SearchInput = () => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedText = useDebounce(text, 200);
  const { suggestions, isLoading } = useSuggestions({ input: debouncedText });
  const navigate = useNavigate();

  const extractCca3 = (elements: (Omit<ICountry, "flags"> & { cca3: string })[] | undefined): string | null => {
    if (!elements) return null;

    const cca3Codes = elements?.map((item) => item.cca3);
    return cca3Codes.join(",");
  };

  return (
    <form
      className={styles.search}
      onSubmit={(e) => {
        e.preventDefault();
        const path = extractCca3(suggestions);
        navigate(path ? `/?search=${path}` : "/");
        inputRef.current?.blur();
      }}
    >
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
          [styles.filled]: suggestions?.length && isFocused && text,
        })}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Куда отправимся?"
      />
      <button
        type="submit"
        disabled={!text}
        className={clsx(styles.submitButton, {
          [styles.focused]: text,
          [styles.blurred]: !text,
        })}
      >
        Поиск
      </button>
      {isFocused && suggestions && suggestions.length > 0 && text && (
        <div className={styles.suggestionsWrapper}>
          <p className={styles.forward}>Бытрый переход</p>
          <div className={styles.suggestions}>
            <Loader isOpen={isLoading} />
            <ul>
              {suggestions?.map((suggestion) => (
                <li key={suggestion.name.common}>
                  <div className={styles.aWrapper}>
                    <Link to={`/${suggestion.name.common.replace(" ", "_")}`} className={styles.a} onMouseDown={(e) => e.preventDefault()}>
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
