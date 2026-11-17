const catalogo = [
  {
    name: "Nebula Protocol",
    genre: "Aventura espacial",
    description: "Uma jornada de exploração em mundos desconhecidos.",
    image: "img/game-1.svg",
  },
  {
    name: "Iron Circuit",
    genre: "Corrida futurista",
    description: "Velocidade, estratégia e circuitos de alta tecnologia.",
    image: "img/game-2.svg",
  },
  {
    name: "Shadow Realm",
    genre: "RPG de fantasia",
    description: "Explore ruínas, descubra segredos e personalize seu herói.",
    image: "img/game-3.svg",
  },
  {
    name: "Pixel Odyssey",
    genre: "Indie plataforma",
    description: "Um universo vibrante de desafios e criatividade.",
    image: "img/game-4.svg",
  },
  {
    name: "Titan Arena",
    genre: "Competitivo",
    description: "Partidas intensas com estratégias em equipe.",
    image: "img/game-5.svg",
  },
  {
    name: "Ocean Depths",
    genre: "Exploração",
    description: "Mergulhe em ambientes subaquáticos misteriosos.",
    image: "img/game-6.svg",
  },
];
const chave = "nexusFavoritos";
function lerFavoritos() {
  try {
    const v = JSON.parse(localStorage.getItem(chave) || "[]");
    return Array.isArray(v)
      ? v.filter((i) => Number.isInteger(i) && i >= 0 && i < catalogo.length)
      : [];
  } catch {
    return [];
  }
}
function guardarFavoritos(ids) {
  try {
    localStorage.setItem(chave, JSON.stringify(ids));
    return true;
  } catch {
    alert("Não foi possível salvar neste navegador.");
    return false;
  }
}
function alternarFavorito(id) {
  const atual = lerFavoritos();
  const novo = atual.includes(id)
    ? atual.filter((x) => x !== id)
    : [...atual, id];
  if (guardarFavoritos(novo)) {
    atualizarBotoes();
    renderFavoritos();
  }
}
function atualizarBotoes() {
  const ids = lerFavoritos();
  document.querySelectorAll(".favorite-btn").forEach((b) => {
    const ativo = ids.includes(Number(b.dataset.id));
    b.textContent = ativo ? "★ Remover favorito" : "☆ Favoritar";
    b.setAttribute("aria-pressed", String(ativo));
  });
}
function renderFavoritos() {
  const area = document.querySelector("#favorites-list");
  if (!area) return;
  area.replaceChildren();
  const ids = lerFavoritos();
  document.querySelector("#favorite-count").textContent =
    ids.length + " jogo(s) salvo(s)";
  if (!ids.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent =
      "Nenhum favorito salvo. Explore a página de Análises e escolha seus jogos.";
    area.append(empty);
    return;
  }
  for (const id of ids) {
    const jogo = catalogo[id];
    const article = document.createElement("article");
    article.className = "game-card";
    const img = document.createElement("img");
    img.src = jogo.image;
    img.alt = "Arte de " + jogo.name;
    const content = document.createElement("div");
    content.className = "card-content";
    const h = document.createElement("h3");
    h.textContent = jogo.name;
    const para = document.createElement("p");
    para.textContent = jogo.description;
    const btn = document.createElement("button");
    btn.className = "btn-nexus favorite-btn";
    btn.dataset.id = id;
    btn.textContent = "★ Remover favorito";
    btn.addEventListener("click", () => alternarFavorito(id));
    content.append(h, para, btn);
    article.append(img, content);
    area.append(article);
  }
}
document
  .querySelectorAll(".favorite-btn")
  .forEach((b) =>
    b.addEventListener("click", () => alternarFavorito(Number(b.dataset.id))),
  );
atualizarBotoes();
renderFavoritos();
