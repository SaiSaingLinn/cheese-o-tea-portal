# React + TypeScript + Vite


## Quite Start

install dependencies
```
npm install
```

run project:
```
npm run dev
```

build project:
```
npm run build
```

testing project:
```
npm run test
```


## Structure

```
App
└── src
    ├── assets
    │   ├── styles
    │   ├── images
    │   └── other     (other resource files like fonts, video, audio or etc)
    ├── common
    │   ├── config    (Configuration files)
    │   ├── hooks     (Custom hooks files)
    │   ├── queries   (tanstack query files)
    │   ├── services  (services files)
    │   ├── stores    (zustan store)
    │   ├── utils     (utils func)
    │   └── other
    ├── components
    │   ├── ui        (base components dir)
    │   ├── layouts   (app layouts)
    │   └── other
    ├── pages
    │   ├── home
    │   ├── admin
    │   │   ├── list
    │   │   ├── form
    │   │   │   ├── create
    │   │   │   └── edit
    │   │   └── detail
    │   └── other
    └── routes.ts     (tanstack router routes config)
```

## Branches
- master (development)
- release/uat (UAT deployment)
- release/prod (production deployment)

