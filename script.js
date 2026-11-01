// DISPLAY BAKERY INFORMATION

document.getElementById("bakery-name").textContent = bakery.name;

document.getElementById("bakery-tagline").textContent = bakery.tagline;


// FORMAT PRICES INTO INDONESIAN RUPIAH

function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);
}


// DISPLAY PRODUCTS

function displayProducts(category = "All") {

    const container = document.getElementById("product-container");

    container.innerHTML = "";

    const filteredProducts = products.filter(product => {
        return category === "All" || product.category === category;
    });

    filteredProducts.forEach(product => {

        const card = document.createElement("article");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("strong");
        price.textContent = formatPrice(product.price);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(price);

        container.appendChild(card);
    });
}


// FILTER BUTTONS

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const category = this.dataset.category;

        displayProducts(category);
    });
});



// DISPLAY EDITORIAL PRICE LIST

function displayEditorialMenu() {

    const categories = {
        "Pastry": "pastry-list",
        "Bread": "bread-list",
        "Cake": "cake-list"
    };

    // Clear all category lists
    Object.values(categories).forEach(id => {
        document.getElementById(id).innerHTML = "";
    });

    // Display products in their categories
    products.forEach(product => {

        const container = document.getElementById(
            categories[product.category]
        );

        if (!container) return;

        const item = document.createElement("div");
        item.className = "price-item";

        const name = document.createElement("span");
        name.className = "price-item-name";
        name.textContent = product.name;

        const price = document.createElement("span");
        price.className = "price-item-value";
        price.textContent = formatPrice(product.price);

        item.appendChild(name);
        item.appendChild(price);

        container.appendChild(item);
    });
}

// INITIALIZE WEBSITE

displayProducts();
displayEditorialMenu();

// CONTACT FORM INTERACTION

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    alert("Thank you for contacting CRUMB STUDIO!");

    contactForm.reset();
});
