module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          alias: {
            rootTypes: './types',
            api: './src/api',
            components: './src/components',
            constants: './src/constants',
            hooks: './src/hooks',
            features: './src/features',
            icons: './src/icons',
            navigation: './src/navigation',
            provider: './src/provider',
            screens: './src/screens',
            types: './src/types',
            utils: './src/utils',
          },
        },
      ],
    ], //追加
  };
};
