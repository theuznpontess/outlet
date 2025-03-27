const supabase = window.supabase.createClient(
    "https://rbmqscyirlztqfjlwaiu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibXFzY3lpcmx6dHFmamx3YWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTg0MzQsImV4cCI6MjA1ODY3NDQzNH0.zPmJT-xraOniFriqlnHe4PfqO3jbKds-bObEyk58-Uc"
);

async function login() {
    console.log("Tentando fazer login...");
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        showMessage("Preencha todos os campos!", "error");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });

    if (error) {
        showMessage("Erro: " + error.message, "error");
    } else {
        showMessage("Login realizado com sucesso!", "success");
        localStorage.setItem("usuarioEmail", email);
        setTimeout(() => {
            window.location.href = "bem-vindo.html";
        }, 2000);
    }
}

async function cadastrar() {
    console.log("Tentando cadastrar...");
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        showMessage("Preencha todos os campos!", "error");
        return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password: senha });

    if (error) {
        showMessage("Erro: " + error.message, "error");
    } else {
        showMessage("Cadastro realizado com sucesso!", "success");
    }
}

// Função para exibir a mensagem de erro ou sucesso com animação
function showMessage(message, type) {
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.innerText = message;
    mensagemElement.style.display = "block";

    // Adiciona uma animação para aparecer a mensagem
    if (type === "error") {
        mensagemElement.style.color = "#d9534f"; // Vermelho para erro
    } else {
        mensagemElement.style.color = "#5bc0de"; // Azul para sucesso
    }

    // Aparece a mensagem com efeito
    mensagemElement.classList.add("fadeMessage");

    // Remove a animação depois que ela desaparecer
    setTimeout(() => {
        mensagemElement.classList.remove("fadeMessage");
    }, 3000); // A mensagem vai desaparecer após 3 segundos
}
