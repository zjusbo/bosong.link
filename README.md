## Short Url Service

### Design doc

http://bosong.link/design

### TODOs

- Url validation
  - Check original url is valid . Issue get request and can return 200?
  - check short url is valid [a-zA-Z0-9-]
- Track link usage and show stats 
  - Google Analytics integration
- User Authorization
  - P0 Google auth2
  - P0 wechat auth2
  - P1 facebook auth2
- User link management
  - Logged in user could claim annoymous links and modify it
- [P0, blocking] MySql index on short_url column
- Hot link cache
