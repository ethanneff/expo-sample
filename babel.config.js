module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  return {
    presets: [
      [
        'babel-preset-expo',
        // needed for zustand 5
        { unstable_transformImportMeta: true },
      ],
    ],
    plugins,
  };
};
