"use strict";

document.querySelector("#deleteButton").addEventListener("click", async () => {
  const id = document.querySelector("#deleteBookIdInput").value;

  const url = `http://localhost:3000/api/books/${id}`;
  try {
    const response = await fetch(url, { method: "DELETE" });

    if (response.status === 204) {
      alert("刪除成功！");
    } else {
      throw new Error("ID 不存在！");
    }
  } catch (error) {
    alert(error.message);
  }

  document.querySelector("#deleteBookIdInput").value = "";
  document.querySelector("#Message").textContent = "";
  document.querySelector("#bookName").textContent = "";
  document.querySelector("#bookPrice").textContent = "";
  document.querySelector("#bookAuthors").textContent = "";
});

document.querySelector("#updateButton").addEventListener("click", async () => {
  const id = document.querySelector("#updateBookIdInput").value;
  const name = document.querySelector("#updateBookNameInput").value;
  const price = document.querySelector("#updateBookPriceInput").value;
  let authors = document.querySelector("#updateBookAuthorInput").value;

  const book = {};
  name ? (book.name = name) : "";
  price ? (book.price = price) : "";
  authors ? (book.authors = authors) : "";

  authors = authors.split(/\s*[, ，]\s*/);

  const url = `http://localhost:3000/api/books/${id}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    const result = await response.json();

    if (response.status === 200) {
      document.querySelector("#Message").textContent = "更新成功！";
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
      if (/ObjectId/.test(result.message)) {
        throw new Error("ID 不存在！");
      } else {
        throw new Error(result.message);
      }
    }
  } catch (error) {
    alert(error.message);
    document.querySelector("#Message").textContent = "更新失敗";
    document.querySelector("#bookName").textContent = "";
    document.querySelector("#bookPrice").textContent = "";
    document.querySelector("#bookAuthors").textContent = "";
  }

  document.querySelector("#updateBookIdInput").value = "";
  document.querySelector("#updateBookNameInput").value = "";
  document.querySelector("#updateBookPriceInput").value = "";
  document.querySelector("#updateBookAuthorInput").value = "";
});
