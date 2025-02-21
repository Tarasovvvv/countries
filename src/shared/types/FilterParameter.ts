export default interface IFilterParameter {
  name: string;
  queryParam: string;
  paramValues: {
    name: string;
    value: string;
  }[];
}
