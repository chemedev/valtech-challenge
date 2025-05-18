# 🧩 Cookie Fortune
This repository contains all the applications related to the Cookie Fortune requirement.

Development can be tested in these URLs:
- Storefront: https://jchemello--valtech.myvtex.com/cookie-fortune
- Admin: https://jchemello--valtech.myvtex.com/admin/cookie-fortune/phrases

## 🖱️ Installation
1. Deploy and install Node Service App with command `vtex install valtech.node-cookie-fortune` into project account.
2. Deploy and install Storefront App, then add `"valtech.react-cookie-fortune": "X.x"` to Storefront manifest. Use exposed interface in Storefront, refer to documentation below.
3. (Optional) Deploy and install Admin App with command `vtex install valtech.admin-cookie-fortune` to manage DB (MasterData) via CMS Storefront.


## 📦 Apps

### 🛍️ [Storefront App](./storefront-app/docs/README.md)
Custom interface for the CTA, lucky phrase and number.

### 🛠️ [Admin App](./admin-app/docs/README.md)
Admin table for viewing, adding and deleting phrases.

### ⚙️ [Node Service App](./node-service/docs/README.md)
Service for DB management via GraphQL API.

## 🏗️ Apps Flow Diagram
![Flow Diagram](/docs/flow-diagram.svg "Flow diagram")
