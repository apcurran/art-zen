import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "build",
    },
    server: {
        proxy: {
            // String shorthand is not supported in Vite like it is in CRA.
            // You must specify the path prefix you want to proxy.
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
