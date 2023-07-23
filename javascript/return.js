"use strcit";

let books = [];

document.querySelector("#searchButton").addEventListener("click", async () => {
  try {
    const name = document.querySelector("#borrowerInput").value;

    if (!name) {
      throw new Error("請輸入借閱人名字");
    }

    const url = `http://localhost:3000/api/users?borrower[borrowername]=${name}`;
    const response = await fetch(url, { method: "GET" });
    const results = await response.json();
    books = results.data.books;

    if (books.length === 0) {
      throw new Error("查無此人");
    }

    document.querySelector(
      "#Message"
    ).textContent = `共有 ${books.length} 本書`;
    const container = document.querySelector("#bookContainer");

    container.innerHTML = "";

    let counter = 0;
    books.forEach((book) => {
      counter++;
      const bookInfo = document.createElement("div");
      bookInfo.classList.add("book-info");

      const number = document.createElement("p");
      number.innerText = `${counter}.`;
      bookInfo.appendChild(number);

      const name = document.createElement("p");
      name.innerText = `書名：${book.name}`;
      bookInfo.appendChild(name);

      const price = document.createElement("p");
      price.innerText = `價格：${book.price}`;
      bookInfo.appendChild(price);

      const authors = document.createElement("p");
      authors.innerText = `作者：${book.authors.join(", ")}`;
      bookInfo.appendChild(authors);

      if (book.borrower) {
        const borrowerName = document.createElement("p");
        borrowerName.innerText = `借閱人名字：${book.borrower.borrowerName}`;
        bookInfo.appendChild(borrowerName);

        const borrowTime = document.createElement("p");
        borrowTime.innerText = `借閱時間：${book.borrower.timestamp}`;
        bookInfo.appendChild(borrowTime);
      }

      container.appendChild(bookInfo);
    });
  } catch (error) {
    alert(error.message);
    document.querySelector("#Message").textContent = "查詢失敗";
  }
});

document.querySelector("#returnButton").addEventListener("click", async () => {
  try {
    const number = document.querySelector("#numberInput").value;

    if (books.length === 0) {
      throw new Error("請查詢借閲人名字");
    } else if (!number || number < 0 || number > books.length) {
      throw new Error("請輸入正確的書籍編號");
    }

    const id = books[number - 1]._id;
    const url = `http://localhost:3000/api/users/return/${id}`;

    const response = await fetch(url, { method: "PATCH" });

    document.querySelector("#Message").textContent = `歸還成功！`;

    const container = document.querySelector("#bookContainer");
    container.innerHTML = "";

    document.querySelector("#borrowerInput").value = "";
    document.querySelector("#numberInput").value = "";
  } catch (error) {
    alert(error.message);
    document.querySelector("#Message").textContent = "歸還失敗";
    const container = document.querySelector("#bookContainer");
    container.innerHTML = "";
  }

  books = [];
});
