


  // window.addEventListener('DOMContentLoaded', async () => {
  //   console.log("extension has been loaded");
    
  //   const cartBtn = document.querySelector('.product-form__buttons');
  //   const PrictceBtn = document.querySelector('.product-form__quantity');
  
  //   // Hide default cart button
  //   if (cartBtn) {
  //     cartBtn.style.display = "none";
  //     PrictceBtn.style.display = "none";
  //   }
  
  //   // Create custom button
  //   const customBtn = document.createElement('button');
  //   customBtn.innerText = "View On eBay";
  //   customBtn.classList.add('custom_btn');
  
  //   // Append custom button to form
  //   const buttonForm = document.querySelector('.form');
  //   buttonForm.appendChild(customBtn);
  
  //   // Remove default form submission
  //   if (buttonForm) {
  //     buttonForm.addEventListener('submit', (event) => {
  //       event.preventDefault();
  //     });
  //   }
  
  //   // Fetch product details using Shopify Ajax API
  //   const productHandle = getProductHandleFromUrl();
  
  //   if (productHandle) {
  //     const product = await fetchProductByHandleAjax(productHandle);
  //     console.log('Product Details:', product);
  
  //     customBtn.addEventListener('click', async (event) => {
  //       event.preventDefault();
  //       const productId = product.id;
  
  //       // Call your backend API to get eBay product details
  //       const endpoint = `https://${Shopify.shop}/apps/proxy-3/viewonebay/${productId}`;
  //       try {
  //         const response = await fetch(endpoint);
  //         const ebayProduct = await response.json();
  //         console.log('eBay Product Details:', ebayProduct);
  
  //         // Check if the product data is found and contains a valid URL
  //         if (ebayProduct.success && ebayProduct.data && ebayProduct.data.product_url) {
  //           // Redirect to the eBay product URL
  //           window.location.href = ebayProduct.data.product_url;
  //         } else {
  //           console.error('Product not found or invalid URL');
  //           alert('eBay Product not found');
  //         }
  //       } catch (error) {
  //         console.error('Failed to fetch eBay product details:', error);
  //         alert('Error fetching product details');
  //       }
  //     });
  //   }
  
  //   // Function to retrieve product handle from URL
  //   function getProductHandleFromUrl() {
  //     const url = window.location.href;
  //     const parts = url.split('/');
  //     const productHandle = parts[parts.length - 1].replace('.html', '');
  //     return productHandle;
  //   }
  
  //   // Function to fetch product details using Shopify Ajax API
  //   async function fetchProductByHandleAjax(productHandle) {
  //     const apiEndpoint = window.Shopify.routes.root + `products/${productHandle}.js`;
  //     const response = await fetch(apiEndpoint);
  //     const product = await response.json();
  //     console.log(product);
  //     return product;
  //   }
  // });
  

  window.addEventListener('DOMContentLoaded', async () => {
    console.log("extension has been loaded");
  
    const cartBtn = document.querySelector('.product-form__buttons');
    const PrictceBtn = document.querySelector('.product-form__quantity');
    const buttonForm = document.querySelector('.form');
  
    // Create custom button
    const customBtn = document.createElement('button');
    customBtn.innerText = "View On eBay";
    customBtn.classList.add('custom_btn');
  
    // Function to retrieve product handle from URL
    function getProductHandleFromUrl() {
      const url = window.location.href;
      const parts = url.split('/');
      const productHandle = parts[parts.length - 1].replace('.html', '');
      return productHandle;
    }
  
    // Function to fetch product details using Shopify Ajax API
    async function fetchProductByHandleAjax(productHandle) {
      const apiEndpoint = window.Shopify.routes.root + `products/${productHandle}.js`;
      const response = await fetch(apiEndpoint);
      const product = await response.json();
      return product;
    }
  
    // Fetch product details using Shopify Ajax API
    const productHandle = getProductHandleFromUrl();
  
    let ebayProductUrl = null; // Variable to store eBay URL
  
    if (productHandle) {
      const product = await fetchProductByHandleAjax(productHandle);
      console.log('Shopify Product Details:', product);
  
      // Call your backend API to get eBay product details
      const productId = product.id;
      const endpoint = `https://${Shopify.shop}/apps/proxy-3/viewonebay/${productId}`;
  
      try {
        const response = await fetch(endpoint);
        const ebayProduct = await response.json();
        console.log('eBay Product Details:', ebayProduct);
  
        // Check if the product data is found and contains a valid URL
        if (ebayProduct.success && ebayProduct.data && ebayProduct.data.product_url) {
          ebayProductUrl = ebayProduct.data.product_url;
        }
      } catch (error) {
        console.error('Failed to fetch eBay product details:', error);
      }
  
      // If eBay product exists, hide original buttons and show custom button
      if (ebayProductUrl) {
        // Hide default Shopify buttons only if eBay product is found
        if (cartBtn) cartBtn.style.display = "none";
        if (PrictceBtn) PrictceBtn.style.display = "none";
  
        // Append custom button to form
        if (buttonForm) buttonForm.appendChild(customBtn);
  
        // Add event listener to the custom button for redirection
        customBtn.addEventListener('click', (event) => {
          event.preventDefault();
          window.location.href = ebayProductUrl;
        });
      } else {
        // If eBay product not found, remove the custom button
        customBtn.style.display = "none";
        // Show original buttons
        if (cartBtn) cartBtn.style.display = "block";
        if (PrictceBtn) PrictceBtn.style.display = "block";
      }
    }
  
    // Ensure original buttons are shown if no productHandle is found
    if (!productHandle) {
      if (cartBtn) cartBtn.style.display = "block";
      if (PrictceBtn) PrictceBtn.style.display = "block";
      if (buttonForm) buttonForm.style.display="block"
    }
  });
  
  
 