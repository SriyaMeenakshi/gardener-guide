// Validates req.body against a zod schema and replaces it with the parsed (trimmed, typed) result.
// Type errors from zod are generic ("expected string, received undefined"), so name the field instead.
function describe(issue, body) {
  if (issue.code !== "invalid_type") return issue.message;
  const field = issue.path.join(".") || "Request body";
  return body?.[issue.path[0]] === undefined ? `${field} is required` : `${field} is invalid`;
}

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((i) => describe(i, req.body)).join(". ");
    return next(Object.assign(new Error(message), { status: 400 }));
  }
  req.body = result.data;
  next();
};
