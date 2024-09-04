#!/bin/bash
NODE_ENV=development

tsc -p build/tsconfig.cjs.json -w &
tsc -p build/tsconfig.esm.json -w
