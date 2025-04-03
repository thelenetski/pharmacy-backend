const parseName = (name) => {
  const isString = typeof name === 'string';
  if (!isString) return;

  if (isString) return name;
};

export const parseFilterParams = (query) => {
  const { name } = query;

  const parsedName = parseName(name);

  return {
    name: parsedName,
  };
};
