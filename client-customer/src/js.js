export let slideIndex = 0;

export function showSlides() {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 7000); // Change image every 7 seconds
}

export function plusSlides(n) {
  showSlides((slideIndex += n));
}

export function currentSlide(n) {
  showSlides((slideIndex = n));
}