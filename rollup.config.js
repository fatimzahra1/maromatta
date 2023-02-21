import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from "@rollup/plugin-json";

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'umd',
    name: umdName,
    indent: false,
    sourcemap: false,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
 json()
  ],
};