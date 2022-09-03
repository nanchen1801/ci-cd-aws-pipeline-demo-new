#!/usr/bin/env bash
# change the env for different countries: it, de or uk
echo "change the country"
npm ci,
npm run build,
npx cdk synth -c config=it
echo "Success!"