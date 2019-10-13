export const getDateWithFormat = () =>
  `${new Date().toLocaleDateString("en-CA")}, ${
    new Date()
      .toLocaleTimeString("jp-JP") // Returns "8:52:45 PM" but we want "8:52 PM"
      .split(":") // ["8", "52", "45 PM"]
      .reduce(
        (result, token) => [
          ...result,
          // If token contains AM/PM string
          token.includes("M") ?
            // that means its a seconds token (ie: "45 PM"), so remove seconds and return
            token.slice(2, 5) :
            // if we already added hour (ie: result is bigger than 0) add a ":" before minutes and return.
            (result.length > 0 ? `:${token}` : token)
        ],
        []
      ) // ["8", ":52", " PM"]
      .join("") // 8:52 PM
  }`;