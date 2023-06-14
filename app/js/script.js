const bookingButtons = document.querySelectorAll(".card__button");
const cards = document.querySelectorAll(".content__card");

bookingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".content__card").classList.toggle("content__card--reserved-js");
  });
  button.addEventListener("dblclick", () => {
    button.closest(".content__card").classList.toggle("content__card--reserved-js");
  });
});

cards.forEach((card) => {
  const currentCardChildren = Array.from(card.children).find((el) =>
    el.classList.contains("card__content")
  ).children;
  let isCursorOut = false;
  card.addEventListener("mouseout", (event) => {
    if (card.classList.contains("content__card--reserved-js")) {
      if (card.contains(event.relatedTarget)) {
        return;
      }
      isCursorOut = true;
      card.classList.add("content__card--reserved");
      card.classList.add("card-motivator--hidden");
      [...currentCardChildren].forEach((item) => {
        if (item.classList.contains("card__booking")) {
          item.classList.add("card__hidden");
        }
        if (item.classList.contains("card__reserved")) {
          item.classList.remove("card__hidden");
        }
      });
    }
  });

  card.addEventListener("click", (event) => {
    if (
      card.classList.contains("content__card--reserved-js") &&
      !event.target.classList.contains("card__button") &&
      !event.target.classList.contains("card__link") &&
      isCursorOut
    ) {
      card.classList.toggle("content__card--reserved-js");
      card.classList.toggle("content__card--reserved");
      card.classList.toggle("card-motivator--hidden");
      isCursorOut = false;
      [...currentCardChildren].forEach((item) => {
        if (
          item.classList.contains("card__booking") ||
          item.classList.contains("card__reserved")
        ) {
          item.classList.toggle("card__hidden");
        }
      });
    }
  });
});
