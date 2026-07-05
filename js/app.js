async function loadPage(page) {
  try {
    const response = await fetch(`./components/${page}.html`);

    if (!response.ok) {
      throw new Error(`${page}.html not found`);
    }

    const html = await response.text();

    document.getElementById("app").innerHTML = html;

    if (page === "register" || page === "login") {
      await import("./auth.js");
    }

    if (page === "home") {
      await import("./shares.js");
      await import("./banner.js");
    }

    if (page === "myshares") {
      await import("./myshares.js");
    }
  } catch (e) {
    console.error(e);
    document.getElementById("app").innerHTML =
      `<div style="padding:30px;text-align:center">
        <h2>Error Loading Page</h2>
        <p>${e.message}</p>
      </div>`;
  }
}

window.loadPage = loadPage;

loadPage("register");

window.showToast = function (msg) {
  let t = document.getElementById("toast");

  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.appendChild(t);
  }

  t.innerText = msg;
  t.classList.add("show");

  setTimeout(() => {
    t.classList.remove("show");
  }, 2500);
};
