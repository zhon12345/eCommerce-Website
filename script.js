let active = document.querySelector(".image-container");
let thumbnails = document.querySelectorAll(".thumbnails img");

thumbnails.forEach(image => {
    image.addEventListener('click', () => {
        active.querySelector('img').src = image.src
    })
})