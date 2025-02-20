import { useGetSuggestionsQuery } from "entities/country";

interface IProps {
  input: string;
}

const useSuggestions = ({ input }: IProps) => {
  const { data } = useGetSuggestionsQuery();
  const suggestions =
    data?.filter((item) => {
      const re = new RegExp(input, "i");
      return re.test(item.translations?.rus?.official);
    }) || null;

  const getSuggestionsByText = (text: string) => {
    return (
      data?.filter((item) => {
        const re = new RegExp(text, "i");
        return re.test(item.translations?.rus?.official);
      }) || null
    );
  };
  return { suggestions, getSuggestionsByText };
};

export default useSuggestions;
