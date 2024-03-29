export const Footer = () => {
  return (
    <div className="p-4 flex flex-col items-center text-center">
      <div className="mb-2">
        Creado por{" "}
        <a
          href="https://www.linkedin.com/in/carlos-nieves-lameiro/"
          className="hover:text-gray-500"
        >
          Carlos Nieves
        </a>
        ,{" "}
        <a
          href="https://www.linkedin.com/in/juan-gabriel-callejo-44375529b/"
          className="hover:text-gray-500"
        >
          Juan G. Callejo
        </a>
        ,{" "}
        <a
          href="https://www.linkedin.com/in/jaime-rodal/"
          className="hover:text-gray-500"
        >
          Jaime Rodal
        </a>
        ,{" "}
        <a
          href="https://www.linkedin.com/in/diego-lema-anhon/"
          className="hover:text-gray-500"
        >
          Diego Lema
        </a>{" "}
        y{" "}
        <a
          href="https://www.linkedin.com/in/hugooteroiglesias/"
          className="hover:text-gray-500"
        >
          Hugo Otero
        </a>
      </div>
      <div>© 2024 XP </div>
    </div>
  );
};
