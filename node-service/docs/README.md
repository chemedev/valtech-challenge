# 🍪 Cookie Fortune Service
This NodeJS service provides a GraphQL API as a CRUD for fortune cookie phrases and also a random number generator.

---

## 📦 API Queries & Mutations

### Queries
#### `getAllPhrases`
Get phrases from Master Data entity `CF`.
```gql
query {
  getAllPhrases {
    id
    CookieFortune
  }
}
```

#### `getRandomPhrase`
Get random phrase from Master Data entity `CF`.
```gql
mutation {
  addPhrase(data: {CookieFortune: String!}) {
    id
    CookieFortune
  }
}
```

<br>

### Mutations
#### `addPhrase`
Add phrase to Master Data entity `CF`.
```gql
query {
  getRandomPhrase {
    id
    CookieFortune
  }
}
```

#### `deletePhrase`
Delete phrase from Master Data entity `CF`.
```gql
mutation {
  deletePhrase(id: ID!) 
}
```

<br>
<br>

###  [→ Main README](../../README.md)
