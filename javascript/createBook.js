"use strict";

document.querySelector("#createButton").addEventListener("click", async () => {
  const name = document.querySelector("#bookNameInput").value;
  const price = document.querySelector("#bookPriceInput").value;
  let authors = document.querySelector("#bookAuthorsInput").value;
  authors = authors.split(/\s*[, ，]\s*/);

  const book = {
    name,
    price,
    authors,
  };

  const url = `http://localhost:3000/api/books`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    const result = await response.json();

    if (response.status === 201) {
      document.querySelector("#Message").textContent = "新增成功！";
      document.querySelector(
        "#bookName"
      ).textContent = `書名：${result.data.book.name}`;
      document.querySelector(
        "#bookPrice"
      ).textContent = `價格：${result.data.book.price}`;
      document.querySelector(
        "#bookAuthors"
      ).textContent = `作者：${result.data.book.authors.join(", ")}`;
    } else {
      if (/E11000/.test(result.message)) {
        throw new Error("書名重複！");
      } else {
        throw new Error(result.message);
      }
    }
  } catch (error) {
    alert(error);
    document.querySelector("#Message").textContent = "新增失敗";
    document.querySelector("#bookName").textContent = "";
    document.querySelector("#bookPrice").textContent = "";
    document.querySelector("#bookAuthors").textContent = "";
  }

  document.querySelector("#bookNameInput").value = "";
  document.querySelector("#bookPriceInput").value = "";
  document.querySelector("#bookAuthorsInput").value = "";
});
