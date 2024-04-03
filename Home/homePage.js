
async function getData() {
    try {
        const url = "https://fakestoreapi.com/products?limit=5";
        let response = await fetch(url);
        let images = await response.json();

        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = '';

        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.classList.add('carousel-item');

            if (index === 0)
                item.classList.add('active');

            const imgTag = document.createElement('img');
            imgTag.src = img.image;
            imgTag.alt = `Slide ${index + 1}`;
            imgTag.classList.add('d-block', 'w-100');

            item.appendChild(imgTag);
            carouselInner.appendChild(item);
        })
    } catch (error) {
        console.error('Error fetching images', error);
    }
}

document.addEventListener('DOMContentLoaded', getData);