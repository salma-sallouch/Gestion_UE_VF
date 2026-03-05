const BASE_URL = "http://localhost:8089/Gestion_UE_VF/rest";

function showSection(name) {
    const section = document.getElementById("section");
    section.innerHTML = "";

    /* ===================== UE ===================== */

    if (name === "listUE") {
        section.innerHTML = `
            <div class="card">
                <h2>Liste UE</h2>
                <button onclick="listUE()">Charger</button>
                <pre id="result"></pre>
            </div>`;
    }

    if (name === "addUE") {
        section.innerHTML = `
            <div class="card">
                <h2>Ajouter UE</h2>
                <input id="code" type="number" placeholder="Code">
                <input id="domaine" placeholder="Domaine">
                <input id="responsable" placeholder="Responsable">
                <input id="credits" type="number" placeholder="Crédits">
                <input id="semestre" type="number" placeholder="Semestre">
                <button onclick="addUE()">Ajouter</button>
                <pre id="result"></pre>
            </div>`;
    }

    if (name === "updateUE") {
        section.innerHTML = `
            <div class="card">
                <h2>Modifier UE</h2>
                <input id="codeToUpdate" type="number" placeholder="Code">
                <button onclick="loadUE()">Charger</button>

                <div id="updateForm" style="display:none;">
                    <input id="u_code" disabled>
                    <input id="u_domaine">
                    <input id="u_responsable">
                    <input id="u_credits" type="number">
                    <input id="u_semestre" type="number">
                    <button onclick="updateUE()">Enregistrer</button>
                </div>

                <pre id="result"></pre>
            </div>`;
    }

    if (name === "deleteUE") {
        section.innerHTML = `
            <div class="card">
                <h2>Supprimer UE</h2>
                <input id="codeDelete" type="number" placeholder="Code">
                <button onclick="deleteUE()">Supprimer</button>
                <pre id="result"></pre>
            </div>`;
    }

    /* ===================== MODULE ===================== */

    if (name === "addModule") {
        section.innerHTML = `
            <div class="card">
                <h2>Ajouter Module</h2>
                <input id="matricule" placeholder="Matricule">
                <input id="nom" placeholder="Nom">
                <input id="coefficient" type="number" placeholder="Coefficient">
                <input id="volumeHoraire" type="number" placeholder="Volume Horaire">
                <input id="type" placeholder="COURS / TD / TP">
                <input id="codeUE" type="number" placeholder="Code UE">
                <button onclick="addModule()">Ajouter</button>
                <pre id="result"></pre>
            </div>`;
    }

    if (name === "deleteModule") {
        section.innerHTML = `
            <div class="card">
                <h2>Supprimer Module</h2>
                <input id="matriculeDelete" placeholder="Matricule">
                <button onclick="deleteModule()">Supprimer</button>
                <pre id="result"></pre>
            </div>`;
    }
}

/* ===================== UE FUNCTIONS ===================== */

async function listUE() {
    const result = document.getElementById("result");

    const res = await fetch(BASE_URL + "/UE");

    if (res.status === 204) {
        result.textContent = "Aucune UE";
        return;
    }

    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
}

async function addUE() {
    const result = document.getElementById("result");

    const ue = {
        code: parseInt(document.getElementById("code").value),
        domaine: document.getElementById("domaine").value,
        responsable: document.getElementById("responsable").value,
        credits: parseInt(document.getElementById("credits").value),
        semestre: parseInt(document.getElementById("semestre").value)
    };

    const res = await fetch(BASE_URL + "/UE", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ue)
    });

    if (res.status === 201) {
        result.textContent = "UE ajoutée avec succès";
    } else {
        result.textContent = "Erreur lors de l'ajout";
    }
}

async function loadUE() {
    const result = document.getElementById("result");

    const codeValue = document.getElementById("codeToUpdate").value;
    const res = await fetch(BASE_URL + "/UE/" + codeValue);

    if (!res.ok) {
        result.textContent = "UE introuvable";
        return;
    }

    const ue = await res.json();

    document.getElementById("u_code").value = ue.code;
    document.getElementById("u_domaine").value = ue.domaine;
    document.getElementById("u_responsable").value = ue.responsable;
    document.getElementById("u_credits").value = ue.credits;
    document.getElementById("u_semestre").value = ue.semestre;

    document.getElementById("updateForm").style.display = "block";
}

async function updateUE() {
    const result = document.getElementById("result");

    const codeValue = document.getElementById("u_code").value;

    const ue = {
        code: parseInt(codeValue),
        domaine: document.getElementById("u_domaine").value,
        responsable: document.getElementById("u_responsable").value,
        credits: parseInt(document.getElementById("u_credits").value),
        semestre: parseInt(document.getElementById("u_semestre").value)
    };

    const res = await fetch(BASE_URL + "/UE/" + codeValue, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ue)
    });

    result.textContent = res.ok ? "UE modifiée avec succès" : "Erreur modification";
}

async function deleteUE() {
    const result = document.getElementById("result");

    const codeValue = document.getElementById("codeDelete").value;

    const res = await fetch(BASE_URL + "/UE/" + codeValue, {
        method: "DELETE"
    });

    result.textContent = res.ok ? "UE supprimée" : "Erreur suppression";
}

/* ===================== MODULE FUNCTIONS ===================== */

async function addModule() {
    const result = document.getElementById("result");

    const module = {
        matricule: document.getElementById("matricule").value,
        nom: document.getElementById("nom").value,
        coefficient: parseInt(document.getElementById("coefficient").value),
        volumeHoraire: parseInt(document.getElementById("volumeHoraire").value),
        type: document.getElementById("type").value,
        codeUE: parseInt(document.getElementById("codeUE").value)
    };

    const res = await fetch(BASE_URL + "/modules", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(module)
    });

    result.textContent = res.ok ? "Module ajouté" : "Erreur ajout module";
}

async function deleteModule() {
    const result = document.getElementById("result");

    const matricule = document.getElementById("matriculeDelete").value;

    const res = await fetch(BASE_URL + "/modules/" + matricule, {
        method: "DELETE"
    });

    result.textContent = res.ok ? "Module supprimé" : "Erreur suppression module";
}
localhost