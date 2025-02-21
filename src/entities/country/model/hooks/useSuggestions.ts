import { useGetSuggestionsQuery } from "entities/country";

interface IProps {
  input: string;
}

const useSuggestions = ({ input }: IProps) => {
  const { data } = useGetSuggestionsQuery();
  const getSuggestionsByText = (text: string) => {
    const re = new RegExp(text, "i");
    return data?.filter((item) => re.test(item.translations?.rus?.official) || re.test(item.name.official) || re.test(item.name.common)) || null;
  };
  const suggestions = getSuggestionsByText(input);

  return { suggestions, getSuggestionsByText };
};

export default useSuggestions;
