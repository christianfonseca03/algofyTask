import { Liquid } from "liquidjs";
var engine = new Liquid();

import projects from "./projects.json";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

window.onload = function () {
  const links = document.querySelectorAll(".cyberlink");
  links.forEach((link) => {
    link.onmouseover = (event) => {
      let iteration = 0;

      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };
  });
};

const template = `
{% for project in projects %}
<div class="project_container">
<h3>{{ project.project-name }}</h3>
<p>{{project.description | truncate : 60}}</p>
<img src={{project.image}} alt={{project.project-name}} class="project_images">
<a href={{project.link}} target="_blank">Go to repository</a>
</div>
{% endfor %}
`;

const renderedHTML = engine.parseAndRenderSync(template, { projects });
document.getElementById("project-list").innerHTML = renderedHTML;

function expandText() {
  let dots = document.getElementById("dots");
  let moreText = document.getElementById("more");
  let btnText = document.getElementById("btn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

document.getElementById("btn").addEventListener("click", expandText);

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
const header = document.getElementById("header");

menu.addEventListener("click", () => {
  nav.classList.toggle("active");
  header.classList.toggle("active");
});

document.querySelectorAll(".cyberlink").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    header.classList.remove("active");
  });
});
