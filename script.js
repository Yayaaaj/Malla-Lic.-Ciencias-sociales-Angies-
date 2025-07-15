const planEstudios = {
  "PRIMER SEMESTRE": {
    "Teorias del Aprendizaje": [],
    "Pensamiento Geografico": [],
    "Pensamiento Historico": [],
    "Grancolombianidad": [],
    "Competencias Comunicativas I": [],
    "Constitucion Politica y Democracia": [],
    "Curso de Formacion Ludica I": [],
    "Electiva Libre I": []
  },
  "SEGUNDO SEMESTRE": {
    "Geografia Fisica General": ["Pensamiento Geografico"],
    "Historia Antigua": ["Pensamiento Historico"],
    "Contexto para la Ensenanza de las Ciencias Sociales": [],
    "Pensamiento Critico": [],
    "Humanismo Cristiano": [],
    "Competencias Comunicativas II": ["Competencias Comunicativas I"],
    "Razonamiento Cuantitativo": [],
    "Electiva Libre II": []
  },
  "TERCER SEMESTRE": {
    "Politica Educativa": ["Teorias del Aprendizaje"],
    "Gestion de la Informacion para el Aprendizaje": [],
    "Geografia Fisica de Colombia": ["Geografia Fisica General"],
    "Historia Medieval": ["Historia Antigua"],
    "Didactica de la Historia": ["Contexto para la Ensenanza de las Ciencias Sociales"],
    "Introduccion a la Investigacion": ["Pensamiento Critico"],
    "Antropologia": [],
    "Curso de Formacion Ludica II": []
  },
  "CUARTO SEMESTRE": {
    "Curriculo y Evaluacion": ["Politica Educativa"],
    "Pedagogia": ["Gestion de la Informacion para el Aprendizaje"],
    "Geografia Humana": ["Geografia Fisica de Colombia"],
    "Historia Moderna y Contemporanea": ["Historia Medieval"],
    "Didactica de la Geografia": ["Didactica de la Historia"],
    "Investigacion Educativa en Ciencias Sociales": ["Introduccion a la Investigacion"],
    "Axiologia": [],
    "Electiva Libre III": []
  },
  "QUINTO SEMESTRE": {
    "Gestion Educativa": ["Curriculo y Evaluacion"],
    "Geografia Economica": ["Geografia Humana"],
    "Historia America Siglos XVI – XVIII": ["Historia Moderna y Contemporanea"],
    "Etnohistorias de las Comunidades Andinas y Mesoamericanas": [],
    "Practica I": ["Didactica de la Geografia"],
    "Metodologia de Investigacion en Ciencias Sociales": ["Investigacion Educativa en Ciencias Sociales"],
    "Etica General": [],
    "Electiva Libre IV": []
  },
  "SEXTO SEMESTRE": {
    "Contextos Escolares": ["Gestion Educativa"],
    "Dinamicas Urbanas": ["Geografia Economica"],
    "Historia Colombia Siglo XIX": ["Historia America Siglos XVI – XVIII"],
    "Practica II": ["Practica I"],
    "Trabajo de Grado I": ["Metodologia de Investigacion en Ciencias Sociales"],
    "Familia y Bioetica": [],
    "Curso de Formacion Ludica III": [],
    "Electiva Libre V": []
  },
  "SEPTIMO SEMESTRE": {
    "Educacion y Cultura": ["Contextos Escolares"],
    "Geografia Politica": ["Dinamicas Urbanas"],
    "Historia Colombia Siglo XX": ["Historia Colombia Siglo XIX"],
    "Practica III": ["Practica II"],
    "Trabajo de Grado II": ["Trabajo de Grado I"],
    "Cultura Solidaria": [],
    "Electiva Libre VI": []
  },
  "OCTAVO SEMESTRE": {
    "Ambiente y Sociedad": ["Geografia Politica"],
    "Historia America Contemporanea": ["Historia Colombia Siglo XX"],
    "Seminario Interdisciplinar": [],
    "Practica IV": ["Practica III"],
    "Trabajo de Grado III": ["Trabajo de Grado II"],
    "Etica Profesional": [],
    "Contexto Nacional y Global": []
  }
};

let aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let semestre in planEstudios) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const h2 = document.createElement("h2");
    h2.textContent = semestre;
    divSemestre.appendChild(h2);

    for (let materia in planEstudios[semestre]) {
      const divMateria = document.createElement("div");
      divMateria.className = "materia";
      divMateria.textContent = materia;

      const requisitos = planEstudios[semestre][materia];
      const estaAprobada = aprobadas.includes(materia);
      const estaBloqueada = requisitos.length > 0 && !requisitos.every(r => aprobadas.includes(r));

      if (estaAprobada) {
        divMateria.classList.add("aprobada");
      } else if (estaBloqueada) {
        divMateria.classList.add("bloqueada");
      }

      divMateria.onclick = () => {
        if (divMateria.classList.contains("bloqueada")) return;

        if (!divMateria.classList.contains("aprobada")) {
          divMateria.classList.add("aprobada");
          aprobadas.push(materia);
        } else {
          divMateria.classList.remove("aprobada");
          aprobadas = aprobadas.filter(m => m !== materia);
        }

        localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));
        actualizarMalla();
      };

      divSemestre.appendChild(divMateria);
    }

    contenedor.appendChild(divSemestre);
  }
}

function actualizarMalla() {
  crearMalla();
}

window.onload = crearMalla;
