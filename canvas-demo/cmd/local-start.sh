#!/bin/bash

START=$(date +%s)
echo "#### LET'S GO ####"
echo "...... START NGINX"
nginx &
FINISH=$(date +%s)

echo "...... CONTAINNER START SUCCESSFULLY!"
echo "#### Time elapsed $(( $FINISH - $START ))s ####"
exit 0