const toBase64 = (str: string | number) =>
  Buffer.from(str.toString(), "utf-8").toString("base64");

export const createSmartCollection = <T extends object>(
  data: T[],
  indexNames: string[]
) => {
  const indexes = createIndexesByColumns<T>(data, indexNames);
  return {
    data,
    indexes,
    paginate({ first, last, before, after, query }) {
      if (!first && !last) {
        throw new Error("Neither first or last was given.");
      }
      if (first && last) {
        throw new Error("first and last were both given.");
      }
      if (before && after) {
        throw new Error("before and after were both given.");
      }
      let result = indexes.id.sortAsc.slice(0); // Create copy of array

      if (query) {
        const [column, value] = query.split("=");
        result = result.filter(
          (cursor) =>
            indexes.id.index[cursor][column].toString() === value.toString()
        );
      }

      let hasNextPage = false;
      let hasPreviousPage = false;
      let startCursor: string;
      let endCursor: string;
      if (first && !before && !after) {
        hasNextPage = result.length > first ? true : false;
        result = result.slice(0, first);
      }
      // else if (first && before) {
      //   const beforeIndex = result.findIndex((cursor) => cursor === before);
      //   const lenght =
      //     result.length < beforeIndex ? result.length : beforeIndex;
      //   result = result.slice(0, lenght);
      // }
      else if (first && after) {
        hasPreviousPage = true;
        const afterIndex = result.findIndex((cursor) => cursor === after);
        result = result.slice(afterIndex + 1, afterIndex + first + 2);
        hasNextPage = result.length > first ? true : false;
        if (result.length > first) result.pop();
      }
      // if (last && !before && !after) {
      //   result = result.slice(result.length - last, last);
      // }
      // if (last && before) {
      // }
      // if (last && after) {
      // }
      startCursor = result?.[0] || null;
      endCursor = result && result.length ? result[result.length - 1] : null;
      return {
        edges: result.map((cursor) => ({
          node: {
            ...indexes.id.index[cursor],
            id: indexes.id.index[cursor].id.toString(),
          },
          cursor,
        })),
        pageInfo: {
          startCursor,
          endCursor,
          hasNextPage,
          hasPreviousPage,
        },
      };
      // TODO: if after -> Search in index id for the cursor "<after>" -> slice all items before that one (if any were sliced, hasPreviousPage => true)
      // TODO: if first -> After slicing, get the next "<first>" elements + 1 (if + 1 exists, hastNextPage => true)
      // TODO: if last -> After slicing, get the last "<last>" element (hastNextPage => false)
      // TODO: if before -> Search in index id for the cursor "<before>" -> slice all items after that one (if any were sliced, hastNextPage => true)
      // TODO: if first -> After slicing, get the next "<first>" elements + 1 (if + 1 exists, hastNextPage => true)
      // TODO: if last -> After slicing, get the last "<last>" element (hastNextPage => false)
    },
  };
};

const createIndexesByColumns = <T extends object>(
  data: T[],
  columns: string[]
) => {
  return columns.reduce((acc, column) => {
    acc[column] = {
      sortAsc: [],
      sortDesc: [],
      index: {},
    };
    data.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    data.forEach((item) => {
      const cursor = toBase64(item[column]);
      acc[column].sortAsc.push(cursor);
      acc[column].sortDesc.unshift(cursor);
      acc[column].index[cursor] = item;
    });
    return acc;
  }, {});
};
