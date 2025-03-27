const filterCategorys = (category, arr) => {
  const filter = arr.filter(item => item.category === category.toLowerCase());
  return filter;
};

const filterFullName = (fullName, arr) => {
  const filter = arr.filter(item => {
    const fullNameLower = item.fullName.toLowerCase();
    const fullNameSearch = fullName.toLowerCase();
    return fullNameLower.includes(fullNameSearch);
  });
  return filter;
};

const filterNewUsers = arr => {
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  const filter = arr.filter(item => {
    const dateUser = new Date(item.createdAt.trim());
    return dateUser <= twoMonthsAgo;
  });

  return filter;
};

export { filterCategorys, filterFullName, filterNewUsers };
