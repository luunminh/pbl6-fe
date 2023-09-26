import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import checker from 'vite-plugin-checker';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      enableBuild: false,
    }),
  ],
  resolve: {
    alias: {
      src: pathResolve('src'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
});
