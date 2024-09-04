#!/bin/bash

buildCJS() {
  echo "Building CJS bundle..."
  tsc -p ./build/tsconfig.cjs.json
  echo '{"type": "commonjs"}' >./dist/cjs/package.json
}

buildESM() {
  echo "Building ESM bundle..."
  tsc -p ./build/tsconfig.esm.json
  echo '{"type": "module"}' >./dist/esm/package.json
}

buildCJS &
buildESM &
wait
