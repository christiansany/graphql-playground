const GID_PREFIX = "gid://Playground";

export const generateGID = (typename: string, id: string) => {
  if (typename.indexOf("/") >= 0 || id.indexOf("/") >= 0) {
    throw new Error("Neither typename nor id can contain slashes (/)");
  }
  return `${GID_PREFIX}/${typename}/${id}`;
};

export const parseGID = (gid: string) => {
  if (gid.indexOf(GID_PREFIX) !== 0) {
    throw new Error("Invalid gid provided - gid must start with " + GID_PREFIX);
  }

  const gidSplit = gid.split("/");

  if (gidSplit.length !== 5) {
    throw new Error(
      "Error while parsing the gid. Make sure your gid hat the correct format: " +
        GID_PREFIX +
        "/<Typename>/<Id>"
    );
  }

  // Destructure array to get the 4th and 5th entry wich are the typename and id
  const [, , , typename, id] = gidSplit;

  return {
    typename,
    id,
  };
};
