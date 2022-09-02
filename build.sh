#! /bin/sh.

npm ci,
npm run build,
npx cdk synth -c config=it