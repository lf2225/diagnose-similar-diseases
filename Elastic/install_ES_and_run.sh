#!/bin/bash


wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.5.2.tar.gz
tar -zxvf elasticsearch-5.5.2.tar.gz

cd elasticsearch-5.5.2
sed -i -e '$a\
http.cors.enabled: true\
http.cors.allow-origin: "*"
' config/elasticsearch.yml

nohup bin/elasticsearch & > elasticsearch.log

sleep 15

curl -XDELETE 'localhost:9200/gnosis'
curl -XPUT 'localhost:9200/gnosis'

pwd
while read f1; do            curl -XPOST 'localhost:9200/gnosis/new' -H "Content-Type: application/json" -d "{ \"title\": \"$f1\" }"; done < ../diagnoses.csv
