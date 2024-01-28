// import path  from 'path';
module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
  },
};
