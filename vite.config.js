import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      remotes: {
        remote: 'https://wowo.htilssu.id.vn/assets/remoteEntry.js',
      },
      shared: ['react'],
    }),
  ],
});
