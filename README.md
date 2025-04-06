# Shopify Product Display

This project displays a list of products from a Shopify store using the Storefront GraphQL API.

## Features

- Fetches and displays the first 10 products
- Shows product title, price, and images
- Hover effect to switch between two product images
- Error handling and loading indicator

## Setup

1. Clone the repository:
git clone https://github.com/AnKub/Task2.git

css
2. Create a `config.js` file in the root directory:
```js
const CONFIG = {
  SHOPIFY_TOKEN: 'your-shopify-storefront-access-token',
};
Add config.js to .gitignore to keep your token safe:

arduino
config.js
Open index.html in your browser to view the project.

Notes
The token is stored in config.js for security and flexibility.

You can change the number of products or query fields inside main.js.
