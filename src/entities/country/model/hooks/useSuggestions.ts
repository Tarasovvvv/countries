import { useGetSuggestionsQuery } from "entities/country";

interface IProps {
  input: string;
}

const useSuggestions = ({ input }: IProps) => {
  const { data: namesData, isLoading } = useGetSuggestionsQuery(undefined, { skip: input.trim() === "" });
  const suggestions = namesData?.filter((item) => {
    const re = new RegExp(input, "i");
    return re.test(item.translations?.rus?.official);
  });

  return { suggestions, isLoading };
};

export default useSuggestions;
