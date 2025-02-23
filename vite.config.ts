import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src', // Garante que os tipos sejam gerados a partir do src
      outputDir: 'dist', // Salva os arquivos de tipos na pasta dist
      insertTypesEntry: true, // Garante que o arquivo index.d.ts seja criado
      cleanVueFileName: true, // Remove nomes de arquivos Vue redundantes
      copyDtsFiles: true, // Copia arquivos .d.ts para dist
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: './src/index.ts', // Ponto de entrada principal da biblioteca
      name: 'Vue3NumberSpinner', // Nome da biblioteca
      formats: ['es', 'cjs'],
      fileName: (format) => `vue3-number-spinner.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'], // Não incluir Vue no bundle
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    emptyOutDir: true, // Remove arquivos antigos antes da build
  },
});
