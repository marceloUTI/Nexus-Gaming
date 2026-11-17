const modal = document.querySelector("#gallery-dialog");
document.querySelectorAll("#gallery button").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#dialog-image").src = button.dataset.src;
    document.querySelector("#dialog-image").alt = button.dataset.alt;
    document.querySelector("#dialog-title").textContent = button.dataset.alt;
    modal.showModal();
  }),
);
document
  .querySelector("#close-dialog")
  .addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});
