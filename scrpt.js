const API = "http://localhost:3000/api/users";
const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

/* ======================
Submit Form
====================== */
form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	try {
		const res = await fetch(API, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email })
		});
		const data = await res.json();
		alert(data.message);
		form.reset();
		loadUsers();
	} catch (err) {
		console.error(err);
		alert("Error submitting form");
	}
});

/* ======================
Load Users
====================== */
async function loadUsers() {
	try {
		const res = await fetch(API);
		const users = await res.json();
		userList.innerHTML = "";
		users.forEach(user => {
			const li = document.createElement("li");
			li.textContent = `${user.name} - ${user.email}`;
			userList.appendChild(li);
		});
	} catch (err) {
		console.error(err);
		userList.innerHTML = "<li>Error loading users</li>";
	}
}

loadUsers();