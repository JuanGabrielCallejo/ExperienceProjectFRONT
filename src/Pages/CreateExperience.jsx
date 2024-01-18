import { useState } from "react";
import { Menu } from "../components/Menu";
import { NavLink } from "react-router-dom";

const CreateExperience = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [exitoExperiencia, setExitoExperiencia] = useState(false);

  const nuevaExperiencia = async (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const subTitle = e.target.elements.subTitle.value;
    const place = e.target.elements.place.value;
    const text = e.target.elements.text.value;
    const photo = e.target.elements.photo.files[0];
    const category = e.target.elements.category.value;

    let experienceBody = new FormData();
    experienceBody.append("title", title);
    experienceBody.append("subTitle", subTitle);
    experienceBody.append("place", place);
    experienceBody.append("text", text);
    experienceBody.append("photo", photo);
    experienceBody.append("category", category);

    console.log("evento", e, { title, subTitle, place, text, photo });

    try {
      const res = await fetch("http://localhost:3001/experience", {
        method: "POST",
        body: experienceBody,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImphaW1lIiwiaWF0IjoxNzA1NTk3MDA5LCJleHAiOjE3MDU3Njk4MDl9.OBizxyjo9T8z390_Rzm2jzKLeGVk31otA51ll2QW-kE",
        },
      });

      if (res.ok) {
        const body = await res.json();
        setStatusMessage("Tu experiencia ha sido creada con exito", body);
        setExitoExperiencia(true);
      } else {
        const body = await res.json();
        console.log("Error de datos", body);
        setStatusMessage(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mensajeParaElUsuario = `${statusMessage}`;

  if (exitoExperiencia) {
    return (
      <>
        <p>Experiencia creada con exito</p>
        <NavLink to="/">Ir al inicio</NavLink>
      </>
    );
  } else {
    return (
      <>
        <Menu />
        <h1>Nueva entrada de experiencia</h1>
        {statusMessage ? (
          <div>{mensajeParaElUsuario}</div>
        ) : (
          <div>Introduce los datos:</div>
        )}

        <h2>Crea tu experiencia</h2>
        <form onSubmit={nuevaExperiencia}>
          <label htmlFor="category">Categoria</label>
          <input type="text" name="category" id="category" />
          <label htmlFor="title">Titulo:</label>
          <input type="text" name="title" id="title"></input>
          <br />
          <label htmlFor="subTitle">Subtitulo:</label>
          <input type="text" id="subTitle" name="subTitle" />
          <br />
          <label htmlFor="place">Lugar:</label>
          <input type="text" id="place" name="place" />
          <br />
          <label htmlFor="text">Descripcion:</label>
          <input type="text" id="text" name="text"></input>
          <label htmlFor="photo">Fotos:</label>
          <input type="file" id="photo" name="photo" />
          <br />
          <button>Enviar</button>
        </form>
      </>
    );
  }
};

export { CreateExperience };
