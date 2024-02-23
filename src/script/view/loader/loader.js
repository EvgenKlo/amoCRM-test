import "./loader.css";

export function createLoader() {
  const loaderLayout = document.createElement("div");
  loaderLayout.classList.add("loader-layout");

  const loader = document.createElement("div");
  loader.classList.add("loader");
  loaderLayout.append(loader);

  return loaderLayout;
}
