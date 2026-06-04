console.log("Portfolio Website Loaded Successfully");

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.querySelector('input[type="text"]').value,
        email: document.querySelector('input[type="email"]').value,
        message: document.querySelector('textarea').value
    };

    try {
        const response = await fetch(
            "http://localhost:5000/api/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        alert(result.message);

    } catch (error) {
        console.log(error);
    }
});