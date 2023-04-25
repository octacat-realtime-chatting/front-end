export const cn = (...cns) => {
  return cns.join(' ');
};

export const variant = (base, variants) => (variantValues) => {
  const variantEntries = Object.entries(variantValues);
  let variantClasses = [];

  variantEntries.forEach(([name, value]) => {
    variantClasses.push(variants[name][value]);
  });

  return cn(base, ...variantClasses);
};
