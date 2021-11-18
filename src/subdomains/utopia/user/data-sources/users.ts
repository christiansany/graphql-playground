import {
  QueryUsersArgs,
  UserCreateInput,
  UserSortKey,
} from "@generation/generated";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId, FindCursor, Collection, Filter, Sort } from "mongodb";
import {
  UserDocument,
  SourceUserConnection,
  SourceUserCreateResponse,
} from "./users.types";
import btoa from "btoa";
import atob from "atob";

// function generatePaginationQuery(query, sort, nextKey) {
//   const sortField = sort == null ? null : sort[0];

//   function nextKeyFn(items) {
//     if (items.length === 0) {
//       return null;
//     }

//     const item = items[items.length - 1];

//     if (sortField == null) {
//       return { _id: item._id };
//     }

//     return { _id: item._id, [sortField]: item[sortField] };
//   }

//   if (nextKey == null) {
//     return { query, nextKeyFn };
//   }

//   let paginatedQuery = query;

//   if (sort == null) {
//     paginatedQuery._id = { $gt: nextKey._id };
//     return { paginatedQuery, nextKey };
//   }

//   const sortOperator = sort[1] === 1 ? "$gt" : "$lt";

//   const paginationQuery = [
//     { [sortField]: { [sortOperator]: nextKey[sortField] } },
//     {
//       $and: [
//         { [sortField]: nextKey[sortField] },
//         { _id: { [sortOperator]: nextKey._id } },
//       ],
//     },
//   ];

//   if (paginatedQuery.$or == null) {
//     paginatedQuery.$or = paginationQuery;
//   } else {
//     paginatedQuery = { $and: [query, { $or: paginationQuery }] };
//   }

//   return { paginatedQuery, nextKeyFn };
// }

export default class UsersAPI extends MongoDataSource<UserDocument> {
  public async getUserById(
    id: ObjectId
  ): Promise<UserDocument | null | undefined> {
    return this.findOneById(id);
  }

  public async getUsersByConnection({
    first,
    after,
    last,
    before,
    query,
    sortKey = UserSortKey.ID,
  }: QueryUsersArgs): Promise<SourceUserConnection> {
    const collection: Collection<UserDocument> = this.collection;

    // TODO: Validation of the args and potential throw when not good.
    // - Either first or last msut be set
    // - after can only be used in combination with first
    // - before can only be used in combination with last
    // - query parser that throws if a query is invalid
    //   - Maybe there can be a debug mode, where in dev mode more information is given about the error

    let hasPreviousPage = false;
    let hasNextPage = false;
    let startCursor;
    let endCursor;

    let data: UserDocument[] = [];
    let dataset: FindCursor<UserDocument>;

    let options: Filter<UserDocument> = {
      // email: { $eq: "alligator0@gmail.com" },
    };

    if (after) console.log("after", atob(after));

    let sortOptions;
    let sort: Sort = { _id: 1 };
    let createCursor: (doc: UserDocument) => string = (doc: UserDocument) =>
      btoa(doc._id.toString());

    let sortField: keyof UserDocument | undefined;

    // enum Actions {
    //   EQUALS = "EQUALS",
    //   LESS_THAN = "LESS_THAN",
    //   LESS_THAN_OR_EQUAL_TO = "LESS_THAN_OR_EQUAL_TO",
    //   GREATER_THAN = "GREATER_THAN",
    //   GREATER_THAN_OR_EQUAL_TO = "GREATER_THAN_OR_EQUAL_TO",
    // }

    // const queryParser = createQueryParser({
    //   // When there is no field specified in the query, but only a search term is provided
    //   termSearchFields: ["username", "email"],
    //   //
    //   fieldSearchFields: [
    //     {
    //       fieldName: "username",
    //       type: "string", // ?? How
    //       allowedActions: [Actions.EQUALS],
    //     },
    //     {
    //       fieldName: "email",
    //       type: "string", // ?? How
    //       allowedActions: [Actions.EQUALS],
    //     },
    //     {
    //       fieldName: "age",
    //       type: "int", // ?? How
    //       allowedActions: [
    //         Actions.EQUALS,
    //         Actions.LESS_THAN,
    //         Actions.LESS_THAN_OR_EQUAL_TO,
    //         Actions.GREATER_THAN,
    //         Actions.GREATER_THAN_OR_EQUAL_TO,
    //       ],
    //     },
    //   ],
    // });

    // If there are things inside the query, that are not allowed, we provide errors that can be sent as a response to the consumer
    // const { parsedQuery, errors } = queryParser(query);

    // const { sort, sortKeys} = createSortingStuff({sortFields: [{
    //   field: "username",
    //   type: "string",
    //   unique: false
    // }]})

    switch (sortKey) {
      case UserSortKey.ID:
        sort = first ? { _id: 1 } : { _id: -1 };
        break;
      case UserSortKey.USERNAME:
        createCursor = (doc) => btoa(`${doc._id.toString()}:${doc.username}`);

        // const [id, sortFieldValue] = parseCursor(after)

        sort = first ? { username: 1, _id: 1 } : { username: -1, _id: -1 };
        if (after) {
          hasPreviousPage = true;
          // options = { username: { $gt: after } };

          sortField = "username";
          const [id, sortFieldValue] = atob(after).split(":");

          const sortOperator = first ? "$gt" : "$lt";

          const paginationQuery = {
            $or: [
              { [sortField]: { [sortOperator]: sortFieldValue } },
              {
                $and: [
                  { [sortField]: sortFieldValue },
                  { _id: { [sortOperator]: id } },
                ],
              },
            ],
          };

          options = { $and: [options, paginationQuery] };
          console.log({ options: JSON.stringify(options) });
        }
        break;
      case UserSortKey.EMAIL:
        sort = first ? { email: 1, _id: 1 } : { email: -1, _id: -1 };
        break;
    }

    createCursor = (doc) =>
      btoa(`${doc._id.toString()}:${sortField ? doc[sortField] : null}`);

    if (first) {
      // if (after) {
      //   hasPreviousPage = true;
      //   options = { $and: [options, { _id: { $gt: new ObjectId(after) } }] };
      // }
      dataset = collection
        .find(options)
        .sort(sort)
        .limit(first + 1);
      data = await dataset.toArray();
      hasNextPage = data.length === first + 1;
      if (hasNextPage) data.pop();
    }

    if (last) {
      if (before) {
        hasNextPage = true;
        options = { $and: [options, { _id: { $lt: new ObjectId(before) } }] };
      }
      dataset = collection
        .find(options)
        .sort(sort)
        .limit(last + 1);
      data = await dataset.toArray();
      // Reverse array again, since we had to reverse the array in the find
      // This also corrects the start and end cursor
      data.reverse();
      hasPreviousPage = data.length === last + 1;
      if (hasPreviousPage) data.shift();
    }

    // TODO: Cursor should contain the id, sort order, and value of the field the sort is being made on

    // const customCursor = `${data[0]._id.toString()}:${data[0].username}`

    startCursor = data.length ? createCursor(data[0]) : null; // TODO: curser msut take sortKey into consideration
    endCursor = data.length ? createCursor(data[data.length - 1]) : null; // TODO: curser msut take sortKey into consideration

    const connectionResponse: SourceUserConnection = {
      edges: data.map((user) => ({
        node: {
          ...user,
        },
        cursor: createCursor(user),
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
    };

    return connectionResponse;
  }

  public async createUser(
    input: UserCreateInput
  ): Promise<SourceUserCreateResponse> {
    const collection: Collection<UserDocument> = this.collection;
    const existingUser = await collection.findOne({ email: input.email });

    if (existingUser) {
      return {
        userErrors: [
          {
            message: "User already exists",
          },
        ],
      };
    }

    const doc = { ...input };
    const result = await collection.insertOne(doc);

    return {
      userErrors: [],
      user: {
        _id: result.insertedId,
        ...doc,
      },
    };
  }
}
