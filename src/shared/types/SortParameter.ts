export default interface ISortParameter {
  name: string;
  queryParam: string;
  order?: "asc" | "desc";
  isLexical?: boolean;
}
