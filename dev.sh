#!/bin/bash

APP=@enrouter/edge

pnpm exec nx run-many -t build --exclude $APP

pnpm exec nx watch -p $APP -d\
  -- pnpm exec nx run-many -t build --exclude $APP &

pnpm --dir apps/edge run dev &

wait
