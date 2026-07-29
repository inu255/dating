import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/',
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    'src/shared/api/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
