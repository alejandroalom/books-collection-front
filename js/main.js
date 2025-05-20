const usersBtn = document.getElementById("getUsersBtn");
const booksBtn = document.getElementById("getBooksBtn");
const usersContainer = document.getElementById("usersContainer");
const booksContainer = document.getElementById("booksContainer");
const usersMessage = document.getElementById("usersMessage");
const booksMessage = document.getElementById("booksMessage");

const BACKEND_URL = "http://localhost:3000";

// Funcion para mostrar mensajes
function showMessage(container, message, type = "success") {
  container.textContent = message;
  container.className = `status ${type}`;
  setTimeout(() => {
    container.textContent = "";
    container.className = "status";
  }, 3000);
}

// Mostrar libros
booksBtn.addEventListener("click", async () => {
  booksMessage.textContent = "Cargando libros... 📚";
  booksMessage.className = "status loading";
  booksContainer.innerHTML = "";
  usersContainer.innerHTML = "";
  usersMessage.textContent = "";

  try {
    const res = await fetch(`${BACKEND_URL}/books`);
    if (!res.ok) throw new Error("Error en la respuesta de libros");
    const books = await res.json();

    booksContainer.innerHTML = "";

    books.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");

      bookDiv.innerHTML = `
        <h3>${book.titulo}</h3>
        <img src="${book.imagen}" alt="${book.titulo}" />
        <p><strong>Autor:</strong> ${book.autor}</p>
        <p><strong>Publicación:</strong> ${book.fechaPublicacion}</p>
      `;

      booksContainer.appendChild(bookDiv);
    });

    showMessage(booksMessage, "Libros cargados correctamente.", "success");
  } catch (error) {
    showMessage(booksMessage, "❌ Error al cargar libros", "error");
    console.error(error);
  }
});

// Mostrar usuarios
usersBtn.addEventListener("click", async () => {
  usersMessage.textContent = "Cargando usuarios... 👤";
  usersMessage.className = "status loading";
  usersContainer.innerHTML = "";
  booksContainer.innerHTML = "";
  booksMessage.textContent = "";

  try {
    const res = await fetch(`${BACKEND_URL}/users`);
    if (!res.ok) throw new Error("Error en la respuesta de usuarios");
    const users = await res.json();

    usersContainer.innerHTML = "";

    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");

      userDiv.innerHTML = `
        <h3>${user.nombre} ${user.apellidos}</h3>
        <p><strong>Email:</strong> ${user.correo}</p>
        <p><strong>Colección:</strong> ${user.coleccion.join(", ")}</p>
        <p><strong>Wishlist:</strong> ${user.wishlist.join(", ")}</p>
      `;

      usersContainer.appendChild(userDiv);
    });

    showMessage(usersMessage, "Usuarios cargados correctamente.", "success");
  } catch (error) {
    showMessage(usersMessage, "❌ Error al cargar usuarios", "error");
    console.error(error);
  }
});



