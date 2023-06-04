const container = document.querySelector(".container");
const form = document.querySelector("#form");
const errorText = document.querySelector(".error-text");

function fetchPalette (query) {
  fetch("http://localhost:9999/v1/colors/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      query
    })
  })
    .then(response => response.json())
    .then(data => {
      const colors = data.result;

      console.log({ data });

      createColorBlocks(colors, container);
    })
    .catch(() => {
      errorText.innerText = "Something went wrong, try generate again";
    });
}

function createColorBlocks (colors, container) {
  container.innerHTML = "";
  for (const color of colors) {
    const div = document.createElement("div");

    div.classList.add("color");
    div.style.backgroundColor = color.code;
    div.style.width = `calc(100%/${colors.length})`;

    div.addEventListener("click", function () {
      navigator.clipboard.writeText(color.code);
    });

    const spanColor = document.createElement("span");
    spanColor.innerText = color.code;
    div.appendChild(spanColor);

    const spanName = document.createElement("span");
    spanName.innerText = color.name;
    div.appendChild(spanName);

    container.appendChild(div);
  }
}

// initiate fetch random palette
fetchPalette("random colorful colors");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  errorText.innerText = "";
  const query = form.elements.query.value;
  console.log("submit event : ", query);

  fetchPalette(query);
});
