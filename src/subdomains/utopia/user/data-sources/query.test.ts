import { createParseFilterFn, createParseQueryFn } from "./query";

export interface Document {
  stringField: string;
  numberField: number;
  booleanField: boolean;
  // subobjectField: object;
  // arrayField: any[];
}

const searchFields = [
  { field: "stringField", type: "string" } as const,
  { field: "numberField", type: "number" } as const,
  { field: "booleanField", type: "boolean" } as const,
  // { field: "dateField", type: "date" } as const,
  // { field: "datetimeField", type: "datetime" } as const,
];

// TODO: Describe these tests better & Naming of tests
describe("Parse single filter queries", () => {
  const parseFilter = createParseFilterFn(searchFields);
  test("Throws when trying to search in a field not permitted or not existing", () => {
    expect(() => parseFilter("nonpermittetField:HelloWorld")).toThrowError(
      "Querying nonpermittetField is not available"
    );
  });

  test("parses 'field exists' correctly", () => {
    searchFields.forEach((searchField) => {
      const filter = parseFilter(`${searchField.field}:*`);
      expect(filter).toEqual({ [searchField.field]: { $exists: true } });
    });
  });

  test("Throws when 'field exists' is used incorrectly", () => {
    expect(() => parseFilter("stringField:*")).not.toThrowError();
    expect(() => parseFilter("stringField-:*")).not.toThrowError();
    expect(() => parseFilter("stringField:>*")).toThrowError();
    expect(() => parseFilter("stringField:>=*")).toThrowError();
    expect(() => parseFilter("stringField:<*")).toThrowError();
    expect(() => parseFilter("stringField:<=*")).toThrowError();
    expect(() => parseFilter("stringField-:>*")).toThrowError();
    expect(() => parseFilter("stringField-:>=*")).toThrowError();
    expect(() => parseFilter("stringField-:<*")).toThrowError();
    expect(() => parseFilter("stringField-:<=*")).toThrowError();
  });

  test("parses stringField ':' (is equal) string correctly", () => {
    const filter = parseFilter("stringField:HelloWorld");
    expect(filter).toEqual({ stringField: { $eq: "HelloWorld" } });
  });

  describe("numberField", () => {
    test("parses numberField ':' (is equal) number correctly", () => {
      const filter = parseFilter("numberField:100");
      expect(filter).toEqual({ numberField: { $eq: 100 } });
    });

    test("parses numberField '-:' (is not equal) number correctly", () => {
      const filter = parseFilter("numberField-:100");
      expect(filter).toEqual({ numberField: { $not: { $eq: 100 } } });
    });

    test("parses numberField ':>' (is greater-than) number correctly", () => {
      const filter = parseFilter("numberField:>100");
      expect(filter).toEqual({ numberField: { $gt: 100 } });
    });

    test("parses numberField '-:>' (is not greater-than) number correctly", () => {
      const filter = parseFilter("numberField-:>100");
      expect(filter).toEqual({ numberField: { $not: { $gt: 100 } } });
    });

    test("parses numberField ':<' (is less-than) number correctly", () => {
      const filter = parseFilter("numberField:<100");
      expect(filter).toEqual({ numberField: { $lt: 100 } });
    });

    test("parses numberField '-:<' (is not less-than) number correctly", () => {
      const filter = parseFilter("numberField-:<100");
      expect(filter).toEqual({ numberField: { $not: { $lt: 100 } } });
    });

    test("parses numberField ':>=' (is greater-than-or-equal-to) number correctly", () => {
      const filter = parseFilter("numberField:>=100");
      expect(filter).toEqual({ numberField: { $gte: 100 } });
    });

    test("parses numberField '-:>=' (is not greater-than-or-equal-to) number correctly", () => {
      const filter = parseFilter("numberField-:>=100");
      expect(filter).toEqual({ numberField: { $not: { $gte: 100 } } });
    });

    test("parses numberField ':<=' (is less-than-or-equal-to) number correctly", () => {
      const filter = parseFilter("numberField:<=100");
      expect(filter).toEqual({ numberField: { $lte: 100 } });
    });

    test("parses numberField '-:<=' (is not less-than-or-equal-to) number correctly", () => {
      const filter = parseFilter("numberField-:<=100");
      expect(filter).toEqual({ numberField: { $not: { $lte: 100 } } });
    });
  });

  describe("booleanField", () => {
    test("parses booleanField ':' (is equal) boolean correctly (true)", () => {
      const filter = parseFilter("booleanField:true");
      expect(filter).toEqual({ booleanField: { $eq: true } });
    });

    test("parses booleanField ':' (is equal) boolean correctly (false)", () => {
      const filter = parseFilter("booleanField:false");
      expect(filter).toEqual({ booleanField: { $eq: false } });
    });

    test("parses booleanField ':' (is equal) boolean correctly (throw)", () => {
      expect(() => parseFilter("booleanField:nonbool")).toThrowError();
    });
  });
});

describe("createParseQueryFn", () => {
  const parseQuery = createParseQueryFn<Document>({
    searchTermFields: ["stringField"],
    searchFields,
  });

  test("Simple queries are parsed correctly", () => {
    const parsedQuery = parseQuery("stringField:*");

    expect(parsedQuery).toEqual({
      stringField: {
        $exists: true,
      },
    });
  });

  test("Complex queries are parsed correctly", () => {
    const parsedQuery = parseQuery(
      "(stringField:* AND (stringField:* OR stringField:*)) OR (stringField:* OR stringField:*) OR stringField:*"
    );

    expect(parsedQuery).toEqual({
      $or: [
        {
          $and: [
            {
              stringField: {
                $exists: true,
              },
            },
            {
              $or: [
                {
                  stringField: {
                    $exists: true,
                  },
                },
                {
                  stringField: {
                    $exists: true,
                  },
                },
              ],
            },
          ],
        },
        {
          $or: [
            {
              stringField: {
                $exists: true,
              },
            },
            {
              stringField: {
                $exists: true,
              },
            },
          ],
        },
        {
          stringField: {
            $exists: true,
          },
        },
      ],
    });
  });
});
