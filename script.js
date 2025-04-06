document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.querySelector('.products-container');
  const loader = document.getElementById('loader');

  const query = `
    {
      products(first: 10) {
        edges {
          node {
            title
            description
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  fetch('https://tsodykteststore.myshopify.com/api/2023-01/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': CONFIG.SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query }),
  })
    .then(response => response.json())
    .then(data => {
      const products = data.data.products.edges;

      products.forEach(({ node }) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('div');
        productImage.classList.add('product-image');

        const img = document.createElement('img');
        img.src = node.images.edges[0]?.node.url || 'placeholder.jpg';
        img.alt = node.images.edges[0]?.node.altText || node.title;

        const hoverImg = document.createElement('img');
        hoverImg.src = node.images.edges[1]?.node.url || img.src;
        hoverImg.alt = node.images.edges[1]?.node.altText || node.title;
        hoverImg.style.display = 'none';

        productImage.appendChild(img);
        productImage.appendChild(hoverImg);

        productImage.addEventListener('mouseenter', () => {
          img.style.display = 'none';
          hoverImg.style.display = 'block';
        });

        productImage.addEventListener('mouseleave', () => {
          img.style.display = 'block';
          hoverImg.style.display = 'none';
        });

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productTitle = document.createElement('h3');
        productTitle.classList.add('product-title');
        productTitle.textContent = node.title;

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');

        const price = node.variants.edges[0]?.node.price.amount;
        const compareAt = node.variants.edges[0]?.node.compareAtPrice?.amount;

        if (compareAt && compareAt > price) {
          productPrice.innerHTML = `<s>${compareAt} $</s> <strong>${price} $</strong>`;
        } else {
          productPrice.textContent = `${price} $`;
        }

        productInfo.appendChild(productTitle);
        productInfo.appendChild(productPrice);

        productCard.appendChild(productImage);
        productCard.appendChild(productInfo);

        productsContainer.appendChild(productCard);
      });

      loader.style.display = 'none';
    })
    .catch(error => {
      console.error('Помилка при завантаженні продуктів:', error);
      productsContainer.innerHTML = `<p>Помилка завантаження продуктів</p>`;
      loader.style.display = 'none';
    });
  const faqButtons = document.querySelectorAll('.faq-question');
  
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      button.classList.toggle('active');
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
      } else {
        answer.style.display = 'block';
      }
    });
  });
});
