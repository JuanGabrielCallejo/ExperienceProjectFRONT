import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../components/providers/AuthProvider";
// import { SearchContext } from "../components/providers/SearchProvider";
import resizeImage from "../services/resizeImg";
import { useNavigate } from "react-router-dom";
import { validateText } from "../services/validateFields";

const CreateExperience = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [exitoExperiencia, setExitoExperiencia] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [user] = useContext(AuthContext);
  // const [, , , setViewBar] = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (mensaje) {
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  }, [mensaje]);

  // useEffect(() => {
  //   setViewBar(true);
  // }, [setViewBar]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setExpData(data.data);
  //       setCurrentExpData(data.data);
  //       setLoading(false);
  //     } else {
  //       const data = await response.json();
  //       console.error(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    obtenerCategorias();
    // fetchData();
    setMensaje("");
  }, []);

  async function obtenerCategorias() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/categories`
      );
      if (response.ok) {
        const datosCategorias = await response.json();
        const nombresCategorias = datosCategorias.data[0];
        setCategorias(nombresCategorias);
      } else {
        const datosCategorias = await response.json();
        console.log(datosCategorias);
        // setErrorMessage(body.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const nuevaExperiencia = async (e) => {
    e.preventDefault();
    let mensaje = "";
    setMensaje(mensaje);

    const title = e.target.elements.title.value;
    const subTitle = e.target.elements.subTitle.value;
    const place = e.target.elements.place.value;
    const text = e.target.elements.text.value;
    const photo = e.target.elements.photo.files[0];
    const category = e.target.elements.category.value;
    let CamposValidos = true;
    let CampoValido = true;
    let mensajeCampo = "";

    const imgMaxWidth = 580;
    const imgMaxHeight = 400;

    let resizedPhoto;

    let experienceBody = new FormData();

    ({ isValid: CampoValido, message: mensajeCampo } = validateText(
      title,
      2,
      25,
      "título"
    ));
    CamposValidos = CamposValidos && CampoValido;
    if (CampoValido) {
      experienceBody.append("title", title);
    } else {
      mensaje = mensajeCampo;
    }

    ({ isValid: CampoValido, message: mensajeCampo } = validateText(
      subTitle,
      2,
      25,
      "subtítulo"
    ));
    CamposValidos = CamposValidos && CampoValido;
    if (CampoValido) {
      experienceBody.append("subTitle", subTitle);
    } else {
      mensaje = mensaje + " -  " + mensajeCampo;
    }

    ({ isValid: CampoValido, message: mensajeCampo } = validateText(
      place,
      2,
      25,
      "lugar"
    ));
    CamposValidos = CamposValidos && CampoValido;
    if (CampoValido) {
      experienceBody.append("place", place);
    } else {
      mensaje = mensaje + " -  " + mensajeCampo;
    }

    ({ isValid: CampoValido, message: mensajeCampo } = validateText(
      text,
      10,
      500,
      "texto"
    ));
    CamposValidos = CamposValidos && CampoValido;
    if (CampoValido) {
      experienceBody.append("text", text);
    } else {
      mensaje = mensaje + " -  " + mensajeCampo;
    }

    if (photo) {
      resizedPhoto = await resizeImage(photo, imgMaxWidth, imgMaxHeight);
    } else {
      mensaje = mensaje + " -  " + "Debes incluír una imagen";
    }

    experienceBody.append("photo", resizedPhoto);
    experienceBody.append("category", category);

    if (!experienceBody.entries().next().done && CamposValidos) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_HOST}/experience`,
          {
            method: "POST",
            body: experienceBody,
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (res.ok) {
          const body = await res.json();
          setStatusMessage("Tu experiencia ha sido creada con exito", body);
          setExitoExperiencia(true);
          // console.log(user.token);
        } else {
          const body = await res.json();
          console.log(body);
          setStatusMessage(body.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    setMensaje(mensaje);
  };

  // const mensajeParaElUsuario = `${statusMessage}`;
  if (exitoExperiencia) {
    Swal.fire({
      title: statusMessage,
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  }

  if (exitoExperiencia) {
    return (
      <div className="h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center gap-3 text-white">
          <p>EXPERIENCIA CREADA CON ÉXITO</p>
          <button
            className="bg-[url('/img/fondoWeb.svg')] bg-cover hover:scale-95 text-white py-2 px-4 rounded-md "
            onClick={() => {
              navigate("/");
            }}
          >
            HOME
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="lg:flex lg:items-center">
        <div className="flex flex-col justify-center h-screen w-full">
          <div className="text-center mb-4">
            <h1 className="text-2xl text-white font-bold text-gray-800">
              NUEVA EXPERIENCIA
            </h1>
          </div>
          <form
            onSubmit={nuevaExperiencia}
            className="max-w-md mx-auto p-4 mb-4 bg-white shadow-md rounded-md flex flex-col w-3/4 lg:w-screen"
          >
            <div className="mb-4">
              <label htmlFor="category" className="text-gray-700">
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md "
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="text-gray-700">
                Título *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subTitle" className="text-gray-700">
                Subtítulo *
              </label>
              <input
                type="text"
                id="subTitle"
                name="subTitle"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="place" className="text-gray-700">
                Lugar *
              </label>
              <input
                type="text"
                id="place"
                name="place"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="text-gray-700">
                Descripción *
              </label>
              <textarea
                id="text"
                name="text"
                rows="3"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="text-gray-700">
                Foto *
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md "
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-[url('/img/fondoWeb.svg')] hover:scale-95 bg-cover text-white py-2 px-4 rounded-md ">
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center h-4 w-[300px]">
          {mensaje && (
            <div className={`w-fit mt-6 p-2 bg-white rounded text-center`}>
              {mensaje}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export { CreateExperience };
