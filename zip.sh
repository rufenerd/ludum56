#!/bin/bash

cd $(dirname $0)
npm run build
cd build
zip -r game.zip *
mv game.zip ..
