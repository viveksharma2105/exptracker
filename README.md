# exptracker

To install dependencies:

```bash
bun init
bun install hono
bun install @types/bun 
bun install zod
```

To run:

```bash
bun run index.ts
```


To install Frontend dependencies:

```bash
bun create vite@latest frontend
bun install
update dev script in package.json to "dev": "bunx --bun vite" and build script to "build": "bunx --bun vite build"
```
This project was created using `bun init` in bun v1.3.9. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
