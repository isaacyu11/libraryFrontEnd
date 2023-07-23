"use strcit";

document.querySelector("#searchButton").addEventListener("click", async () => {
  const name = document.querySelector("#bookNameInput").value;
  const url = `http://localhost:3000/api/books?${name ? `name=${name}` : ""}`;

  try {
    const response = await fetch(url, { method: "GET" });
    const results = await response.json();
    const books = results.data.books;

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

  document.querySelector("#bookNameInput").value = "";
});
