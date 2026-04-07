import { dir } from 'node:console'
import { resolve } from 'node:path'
import test from 'node:test'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src'),
    },
  },
  test: {
    dir: 'src',
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases',
        }
        },
        {
          extends: true,
          test: {
            name: 'e2e',
            dir: 'src/http/controllers',
            environment:
            './prisma/vitest-environment-prisma/prisma-test-environment.mjs',
          }
        }
      ]
      }
})
