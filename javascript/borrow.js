"use strcit";

let books = [];

document.querySelector("#searchButton").addEventListener("click", async () => {
  const name = document.querySelector("#bookNameInput").value;
  const url = `http://localhost:3000/api/users?${name ? `name=${name}` : ""}`;

  try {
    const response = await fetch(url, { method: "GET" });
    const results = await response.json();
    books = results.data.books;

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

document.querySelector("#borrowButton").addEventListener("click", async () => {
  try {
    console.log(books);
    const brrowerName = document.querySelector("#borrowerInput").value;
    const number = document.querySelector("#numberInput").value;

    if (books.length === 0) {
      throw new Error("請查詢書籍");
    } else if (!number || number < 0 || number > books.length) {
      throw new Error("請輸入正確的書籍編號");
    } else if (!brrowerName) {
      throw new Error("請輸入借閱人名字");
    }

    const id = books[number - 1]._id;
    console.log(id);
    const url = `http://localhost:3000/api/users/borrow/${id}`;

    const borrower = {
      borrower: {
        borrowerName: brrowerName,
        timestamp: new Date(),
      },
    };
    console.log(borrower);

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrower),
    });

    const result = await response.json();
    const book = result.data.book;

    document.querySelector("#Message").textContent = `借閲成功！`;

    const container = document.querySelector("#bookContainer");
    container.innerHTML = "";

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    const name = document.createElement("p");
    name.innerText = `書名：${book.name}`;
    bookInfo.appendChild(name);

    const price = document.createElement("p");
    price.innerText = `價格：${book.price}`;
    bookInfo.appendChild(price);

    const authors = document.createElement("p");
    authors.innerText = `作者：${book.authors.join(", ")}`;
    bookInfo.appendChild(authors);

    const borrowerName = document.createElement("p");
    borrowerName.innerText = `借閱人名字：${book.borrower.borrowerName}`;
    bookInfo.appendChild(borrowerName);

    const borrowTime = document.createElement("p");
    borrowTime.innerText = `借閱時間：${book.borrower.timestamp}`;
    bookInfo.appendChild(borrowTime);

    container.appendChild(bookInfo);

    document.querySelector("#bookNameInput").value = "";
    document.querySelector("#borrowerInput").value = "";
    document.querySelector("#numberInput").value = "";
  } catch (error) {
    alert(error.message);
    document.querySelector("#Message").textContent = "借閲失敗";
    const container = document.querySelector("#bookContainer");
    container.innerHTML = "";
  }

  books = [];
});
