import app from './app';
// Bun.serve({
//     fetch(request, server) {
//         return new Response("Hello from Bun!");
//     }
// })

Bun.serve({
    fetch:app.fetch
});