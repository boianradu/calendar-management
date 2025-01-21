#!/bin/bash

host=$1
shift
port=$1
shift
cmd=$@

until nc -z -v -w30 $host $port
do
  echo "Waiting for database connection..."
  sleep 1
done

echo "Database is up - executing command"
exec $cmd
