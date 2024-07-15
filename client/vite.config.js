import {defineConfig} from "vite";
import react from '@vitejs/plugin-react';
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig(()=>{
	return {
		build: {
			outDir: 'build'
		},
		plugins: [
			react(),
			nodePolyfills(),
		],
	}
});