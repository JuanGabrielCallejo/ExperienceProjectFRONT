
const validateEmail = (email) => {
    let isValid = true;
    let message = "";

    if (!email || email.trim() === "") {
        isValid = false;
        message = "El email no puede estar vacío";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            message = "El email no tiene el formato correcto (usuario@dominio.com)";
        }
    }
    // console.log(isValid + message);
    return { isValid, message };
};

const validatePassword = (password) => {
    let isValid = true;
    let message = "";

    if (!password || password.trim() === "") {
        isValid = false;
        message = "El password no puede estar vacío";
    } else {
        // descomentar para comprobar el formato del password
        //   const passwordRegex = ;
        //   if (!passwordRegex.test(password)) {
        //     isValid = false;
        //     message = "El password ...";
        //   }
    }

    return { isValid, message };
};

const validateName = (nombre) => {
    let isValid = true;
    let message = "";

    if (!nombre || nombre.trim() === "") {
        isValid = false;
        message = "El nombre no puede estar vacío";
    } else {
        // Adjust the regex for nombre (name) length between 2 and 30 characters
        const nombreRegex = /^.{2,30}$/;

        if (!nombreRegex.test(nombre)) {
            isValid = false;
            message = "El nombre debe tener entre 2 y 30 caracteres";
        }
    }

    return { isValid, message };
};


const validateLastName = (apellido) => {
    let isValid = true;
    let message = "";

    if (!apellido || apellido.trim() === "") {
        isValid = false;
        message = "El apellido no puede estar vacío";
    } else {
        // Adjust the regex for apellido (last name) length between 2 and 30 characters
        const apellidoRegex = /^.{2,30}$/;

        if (!apellidoRegex.test(apellido)) {
            isValid = false;
            message = "El apellido debe tener entre 2 y 30 caracteres";
        }
    }

    return { isValid, message };
};



export { validateName, validateLastName, validateEmail, validatePassword };