let product = [];

fetch("https://fakestoreapi.com/products?limit=20")
  .then((res) => res.json())
  .then((data) =>
    data.map((datas) => {
      let newproducts = new Product(datas.image, datas.title, datas.price);

      let pro = document.createElement("div");
      pro.innerHTML = `

    <img src="${datas.image}"/>
    <p>${datas.title}</p>
    <h5>${datas.price}</h5>

    `;

      let main = document.getElementById("main");
      main.appendChild(pro);
      console.log(data);
    })
  );

class Product {
  constructor(image, title, price) {
    this.image = image;
    this.title = title;
    this.price = price;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const createPostForm = document.getElementById("PostForm");
  const postList = document.getElementById("postList");

  // Function to create a new post
  createPostForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    const newPost = {
      title,
      body,
    };
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        // const postCard = `
        //         <div class="card">
        //             <h2>${data.title}</h2>
        //             <p>${data.body}</p>
        //             <button class="delete-button" data-id="${data.id}">Delete</button>
        //             <button class="edit-button" data-id="${data.id}">Edit</button>
        //         </div>
        //     `;
        postList.insertAdjacentHTML("beforeend", postCard);
        // postList.appendChild(postCard);

        createPostForm.reset();
      })
      .catch((error) => console.error("Error:", error));
  });

  //  display posts
  function fetchPosts() {
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => {
        postList.innerHTML = ""; // Clear previous posts

        data.forEach((post) => {
          // Display each post as a card
          const postCard = `
                      <div class="card">
                          <h2>${post.title}</h2>
                          <p>${post.body}</p>
                          <button class="delete-button" data-id="${post.id}">Delete</button>
                          <button class="edit-button" data-id="${post.id}">Edit</button>
                      </div>
                  `;
          postList.insertAdjacentHTML("beforeend", postCard);
          //   postList.appendChild(postCard);
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  fetchPosts();

  postList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
      const postId = e.target.getAttribute("data-id");

      fetch(`http://localhost:5000/posts/${postId}`, {
        method: "DELETE",
      })
        .then(() => fetchPosts())
        .catch((error) => console.error("Error:", error));
    }else{
      
  let titles = prompt("update your title");
  let bodys = prompt("update your body");
  if (e.target.classList.contains("edit-button")) {
    const postId = e.target.getAttribute("data-id");
    fetch(`http://localhost:5000/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titles, body: bodys }),
    })
      .then(() => fetchPosts())
      .catch((error) => console.error("Error:", error));
  }

      
    }

   
  });


  
});


