#!/bin/bash
tar -zcvf ../web-admin.tar.gz --exclude ./node_modules .
scp -r ../web-admin.tar.gz ubuntu@123.206.90.112:~/sites
ssh ubuntu@123.206.90.112 "cd ~/sites; rm -rf ./web-admin-test;
 mkdir web-admin-test; cp ./web-admin.tar.gz ./web-admin-test/;
  cd ./web-admin-test; tar -zxvf web-admin.tar.gz;
  pwd; yarn install; yarn run build"
