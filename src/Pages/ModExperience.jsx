import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { useParams } from "react-router-dom";
import { ReloadContext } from "../components/providers/ReloadProvider";
import Swal from "sweetalert2";
import { validateText } from "../services/validateFields";

const ModExp = () => {
  const [expData, setExpData] = useState({
    id: "",
    title: "",
    subTitle: "",
    place: "",
    text: "",
    photo: undefined,
  });
  const [currentExpData, setCurrentExpData] = useState();
  const [loading, setLoading] = useState(true);
  const [user] = useContext(AuthContext);
  const { valoresCamposActuales } = useContext(ReloadContext);
  const [mensaje, setMensaje] = useState("");
  const { exp_id } = useParams();

  useEffect(() => {
    fetchData();
    setMensaje("");
  }, [user.id, user.token]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setMensaje(data.message);
      if (response.ok) {
        setExpData(data.data);
        setCurrentExpData(data.data);
        setLoading(false);
      } else {
        setMensaje("Error al intentar modificar: " + data.message);
        console.error(data);
      }
    } catch (error) {
      setMensaje("Error indefinido");
      console.error(error);
    }
  };

  const cambiarValorCampo = (e) => {
    const { name, value } = e.target;
    setExpData({ ...expData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExpData({ ...expData, photo: file });
  };

  const vacioONull = (texto) => {
    if (!texto || texto.trim() === "") {
      return true;
    } else {
      return false;
    }
  };

  const modificarDatos = async (e) => {
    e.preventDefault();
    let mensaje = "";
    if (!expData) {
      setMensaje("No hay datos de experiencia");
      console.error("No hay datos de experiencia");
      return;
    } else {
      try {
        setMensaje("");
        let CamposValidos = true;
        let CampoValido = true;
        let mensajeCampo = "";

        const formData = new FormData();

        if (expData.photo) {
          formData.append("avatar", expData.photo);
        }

        if (!vacioONull(expData.title)) {
          ({ isValid: CampoValido, message: mensajeCampo } = validateText(
            expData.title,
            2,
            20,
            "título"
          ));
          CamposValidos = CamposValidos && CampoValido;
          if (CampoValido) {
            formData.append("title", expData.title);
          } else {
            mensaje = mensaje + " -  " + mensajeCampo;
          }
        }

        if (!vacioONull(expData.subTitle)) {
          ({ isValid: CampoValido, message: mensajeCampo } = validateText(
            expData.subTitle,
            2,
            20,
            "subtítulo"
          ));
          CamposValidos = CamposValidos && CampoValido;
          if (CampoValido) {
            formData.append("subTitle", expData.subTitle);
          } else {
            mensaje = mensaje + " -  " + mensajeCampo;
          }
        }

        if (!vacioONull(expData.place)) {
          ({ isValid: CampoValido, message: mensajeCampo } = validateText(
            expData.place,
            2,
            20,
            "lugar"
          ));
          CamposValidos = CamposValidos && CampoValido;
          if (CampoValido) {
            formData.append("place", expData.place);
          } else {
            mensaje = mensaje + " -  " + mensajeCampo;
          }
        }

        if (!vacioONull(expData.text)) {
          ({ isValid: CampoValido, message: mensajeCampo } = validateText(
            expData.text,
            10,
            500,
            "texto"
          ));
          CamposValidos = CamposValidos && CampoValido;
          if (CampoValido) {
            formData.append("text", expData.text);
          } else {
            mensaje = mensaje + " -  " + mensajeCampo;
          }
        }

        if (!formData.entries().next().done && CamposValidos) {
          const response = await fetch(
            `${import.meta.env.VITE_REACT_HOST}/modExperience/${exp_id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
              body: formData,
            }
          );

          if (response.ok) {
            setExpData({
              title: "",
              subTitle: "",
              place: "",
              text: "",
              photo: undefined,
            });
            console.log("Experiencia actualizada con éxito");
            mensaje = "Experiencia actualizada con éxito";
            fetchData();
            Swal.fire({
              title: "Experiencia actualizada con éxito",
              icon: "success",
              timer: 2000,
            });
          } else {
            const data = await response.json();
            console.error(data);
          }
        }
      } catch (error) {
        console.error("Error al enviar los datos", error);
      }
    }
    setMensaje(mensaje);
  };

  if (loading) {
    return <p>Cargando experiencia...</p>;
  }

  return (
    <form
      onSubmit={modificarDatos}
      className=" mobile:h-screen lg:h-full xl:h-screen w-2/3 flex flex-col justify-center items-center lg:mt-10 xl:mt-0 lg:mb-10 xl:mb-0"
    >
      <div className="p-8 bg-white rounded-lg shadow-2xl flex lg:flex-col-reverse xl:flex-row gap-6 justify-center ">
        <div className="w-4/5 flex flex-col self-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Edita tu experiencia
          </h1>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="photo" className="text-gray-700">
                Foto
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="photo"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="title" className="text-gray-700">
                Título
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={expData.title}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Título"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="subTitle" className="text-gray-700">
                Subtítulo
              </label>
              <input
                id="subTitle"
                name="subTitle"
                type="text"
                value={expData.subTitle}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Subtítulo"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="place" className="text-gray-700">
                Lugar
              </label>
              <input
                id="place"
                name="place"
                type="text"
                value={expData.place}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Lugar"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-gray-700">
                Descripción
              </label>
              <textarea
                id="text"
                name="text"
                type="text"
                value={expData.text}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md h-[100px]"
                placeholder="Descripción"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex justify-center mb-3">{mensaje}</div>
            <div className="flex justify-center">
              <button
                className="bg-[url('/img/fondoWeb.svg')] bg-cover hover:scale-95 text-white py-2 px-4 rounded-md "
                type="submit"
              >
                Modificar
              </button>
            </div>
          </div>
        </div>
        <article className=" lg:w-2/4 lg:p-6 lg:p-8 lg:rounded-2xl lg:shadow-2xl lg:border lg:w-[600px] xl:w-[750px] lg:h-[850px] lg:grid lg:grid-cols-1 lg:grid-rows-[220px_360px_30px_1fr_50px] hidden">
          <header className="mb-8">
            <address className="flex items-center mb-6">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                <img
                  className="mr-4 w-16 h-16 rounded-full object-cover"
                  src={
                    valoresCamposActuales
                      ? valoresCamposActuales.data.photo
                      : user.photo
                  }
                  alt=""
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 S700"
                  >
                    {user.name} {user.lastName}
                  </a>
                  <p className="text-base text-gray-400 S700">
                    {currentExpData.place}
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time>1/1/2024, 00:00:00</time>
                  </p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-gray-800 ">
              {new String(currentExpData.title)}
            </h1>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-gray-400 S700">
              {currentExpData.subTitle}
            </h2>
          </header>
          <figure className="mb-6 flex text-center">
            <img
              src={currentExpData.photo}
              alt="Experience Photo"
              className="drop-shadow-2xl  mx-auto rounded-lg shadow-2xl"
            />
          </figure>
          <p className="lead text-gray-400 mb-4">4 me gusta</p>
          <p className="lead text-gray-700 w-contain max-h-[150px] overflow-hidden overflow-y-auto break-words leading-7 S400">
            {currentExpData.text}
          </p>
          <div className="flex items-center mt-8">
            <div className="rounded-full bg-[url('/img/fondoWeb.svg')] bg-cover text-white p-2 text-sm">
              Category
            </div>
          </div>
        </article>
      </div>
    </form>
  );
};

export { ModExp };
