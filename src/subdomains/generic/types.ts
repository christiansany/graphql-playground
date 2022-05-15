import { PageInfo, Scalars } from "__generated__/schema.generated";

export interface SourceEdge<T> {
  cursor: Scalars["String"];
  node: T;
}

export type SourceConnection<T> = {
  edges: Array<SourceEdge<T>>;
  pageInfo: PageInfo;
};
