#!/bin/sh
cd front 
./node_modules/.bin/webpack -p --verbose --colors --profile --json > stats.json
cd ../backend/public
rm -rf static && mkdir static
cp -r ../../front/build/* ./static