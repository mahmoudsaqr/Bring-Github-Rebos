let input = document.querySelector(".input");
let search = document.querySelector(".search");
let Show_Data = document.querySelector(".show-data");
let No_data = document.querySelector(".show-data span");
let Created_Div = 0;
let y = 0;
console.log(typeof input.value === "number");
input.oninput = function () {
  if (typeof Number(input.value) === "number" && !isNaN(Number(input.value))) {
    let myclass = document.querySelectorAll(".infoDiv");

    // تحقق إذا كان الإدخال فارغًا
    if (input.value === "") {
      myclass.forEach(function (div) {
        div.remove(); // إخفاء العناصر
      });
      No_data.setAttribute("style", "display : block;");
      No_data.innerHTML = "<span>No Data To Show</span>";
    } else {
      if (y === 1) {
        myclass.forEach(function (div) {
          div.remove(); // إخفاء العناصر
        });
        No_data.setAttribute("style", "display : block;");
        No_data.innerHTML = "<span>No Data To Show</span>";
      } else {
        myclass.forEach(function (div) {
          div.style.display = "block"; // إظهار العناصر (إذا أردت إظهارها عند وجود نص)
        });
      }
    }
  } else {
    No_data.innerHTML = "<span>Please Enter A Number</span>";
  }
};
search.onclick = function () {
  y = 1;
  if (input.value !== "") {
    if (
      typeof Number(input.value) === "number" &&
      !isNaN(Number(input.value))
    ) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((result) => {
          result = result.json();
          return result;
        })
        .then((result) => {
          for (let i = 0; i < result.length; i++) {
            if (result[`${i}`]["postId"] === parseInt(input.value)) {
              Created_Div = createDiv(
                result[`${i}`]["postId"],
                result[`${i}`]["id"],
                result[`${i}`]["name"],
                result[`${i}`]["email"],
                result[`${i}`]["body"]
              );
              Show_Data.appendChild(Created_Div);
              No_data.setAttribute("style", "display : none;");
            } else {
              No_data.innerHTML = "<span>This Postal ID Is Not Found !</span>";
            }
          }
        })
        .catch(Error("Error"));
    } else {
      No_data.innerHTML = "<span>Please Enter A Number</span>";
    }
    
  } else {
    No_data.innerHTML = "<span>Please Write The Postal ID !!</span>";
  }
};

let createDiv = function (postId, id, name, email, body) {
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("infoDiv");
  infoDiv.setAttribute(
    "style",
    "display: flex; justify-content: space-between; padding: 20px;margin-top : 10px;background-color: white;    border-radius:40px;flex-wrap : wrap; transition:0.5s;"
  );

  const postIDinfo = document.createElement("h1");
  postIDinfo.textContent = `Postal ID : ${postId}`;
  const IDinfo = document.createElement("h2");
  IDinfo.textContent = `ID : ${id}`;
  const infoDivContent = document.createElement("h3");
  infoDivContent.textContent = `Name : ${name}`;
  const Emailinfo = document.createElement("h4");
  Emailinfo.textContent = `Email : ${email}`;
  const Bodyinfo = document.createElement("p");
  Bodyinfo.textContent = body;

  infoDiv.appendChild(postIDinfo);
  infoDiv.appendChild(IDinfo);
  infoDiv.appendChild(infoDivContent);
  infoDiv.appendChild(Emailinfo);
  infoDiv.appendChild(Bodyinfo);
  infoDiv.children[0].setAttribute("style", "width : 100% ; color : gray;");
  infoDiv.children[1].setAttribute("style", "width : 100%; color : #ff5335;");
  infoDiv.children[2].setAttribute("style", "width : 50%; color : #ff5335;");
  infoDiv.children[3].setAttribute("style", "width : 50%; color : #ff5335;");
  infoDiv.children[4].setAttribute("style", "width : 100%; color : #ff5335;");
  return infoDiv;
};
