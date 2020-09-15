module.exports = {
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/],
    transpileOnly: true,
    compilerOptions: {
      // "noImplicitAny": false,
      "module": "es6",
      "target": "es2015",
      // "jsx": "react",
      // "allowJs": true,
      // "moduleResolution": "Node",
      // "experimentalDecorators": true,
      // "lib": ["es2017", "dom"],
    }
  }
}
