const video = document.querySelector(".flex-container-2 video");
const hoverText = document.querySelector(".flex-container-2 .hover-text");

video.addEventListener("mouseenter", () => {
    video.play();
    hoverText.classList.remove("active")
});

video.addEventListener("mouseleave", () => {
    video.pause();
    hoverText.classList.add("active");
});