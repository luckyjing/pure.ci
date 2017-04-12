#!/bin/sh
cd front 
npm run build
cd ../backend/public
rm -rf static && mkdir static
cp -r ../../front/build/index/* ./static
cp ../../front/build/vendor.js ./static