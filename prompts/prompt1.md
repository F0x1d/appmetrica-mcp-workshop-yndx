Create the foundation for a TypeScript Node.js project in opened directory called "AppMetrica MCP Server". This will be a Model Context Protocol server that integrates with Yandex AppMetrica API.

REQUIREMENTS:
Set up the basic project structure, configuration files, and dependency management.

SPECIFIC TASKS:

1. CREATE package.json with these exact specifications:
   - name: "appmetrica-mcp"
   - version: "0.1.0" 
   - description: "A Model Context Protocol server for Yandex AppMetrica integration"
   - private: true
   - type: "module" (ES modules)
   - bin entry pointing to "./src/index.ts"
   - files: ["src"]
   - scripts:
     * start: "tsx src/index.ts"
     * dev: "tsx watch src/index.ts"
     * inspector: "npx @modelcontextprotocol/inspector tsx src/index.ts"

2. CREATE tsconfig.json with:
   - target: "ES2022"
   - module: "ESNext"
   - moduleResolution: "Bundler"
   - allowImportingTsExtensions: true
   - noEmit: true
   - strict: true
   - esModuleInterop: true
   - skipLibCheck: true
   - forceConsistentCasingInFileNames: true
   - include: ["src/**/*"]
   - exclude: ["node_modules"]

3. INSTALL these exact dependencies:
   - @modelcontextprotocol/sdk@0.6.0
   - axios@^1.11.0
   - zod@^4.0.14

4. INSTALL these exact devDependencies:
   - @types/node@^20.11.24
   - typescript@^5.3.3
   - tsx@^4.7.0

5. CREATE .gitignore file that includes:
   - node_modules/
   - .env
   - *.log
   - .DS_Store
   - Any credential-related files

6. CREATE .arcignore file with:
   - node_modules/
   - .env

7. CREATE empty src/ directory

VALIDATION:
- Ensure package.json is valid JSON
- Verify TypeScript configuration is valid
- Verify all dependencies install correctly
- Test that tsx can run TypeScript files directly
- Confirm directory structure is created

The result should be a properly configured project foundation ready for direct TypeScript execution without compilation.
