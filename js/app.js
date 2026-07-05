async function loadPage(page){

const html = await fetch(
`./components/${page}.html`
).then(r=>r.text());

document.getElementById("app")
.innerHTML = html;

if(page==="register" || page==="login"){
await import("./auth.js");
}
}

window.loadPage = loadPage;

loadPage("register");
