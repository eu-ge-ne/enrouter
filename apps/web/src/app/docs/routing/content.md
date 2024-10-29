# Routing

enrouter is a file based router:
in application routes are defined by a tree of folders and files.
For each route, name of the folder declares route's url pattern
and files inside the folder define content,
which will be displayed when the route is matched.
Route content is nested and wrapped recursively in parent route's content.

For example, this folder layout:

```mermaid
graph TB
  root["src/app"]
  style root fill:#5b21b6
  root-layout["_layout.tsx"]
  root-content["_content.tsx"]

  about["src/app/about"]
  style about fill:#5b21b6
  about-layout["_layout.tsx"]
  about-content["_content.tsx"]

  docs["src/app/docs"]
  style docs fill:#5b21b6
  docs-layout["_layout.tsx"]
  docs-content["_content.tsx"]

  api["src/app/docs/api"]
  style api fill:#5b21b6
  api-layout["_layout.tsx"]
  api-content["_content.tsx"]

  root --> root-layout
  root-layout --> root-content
  root-layout --> about
  root-layout --> docs

  about --> about-layout
  about-layout --> about-content

  docs --> docs-layout
  docs-layout --> docs-content
  docs-layout --> api

  api --> api-layout
  api-layout --> api-content
```

Defines these routes:

```mermaid
graph TB
  root["/"]
  about["/about"]
  docs["/docs"]
  api["/docs/api"]

  root --> about
  root --> docs
  docs --> api
```
