
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
        const passwordRegex = new RegExp(/^.*(?=.{1,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).*$/);
        // password = "1fF.";
        if (!passwordRegex.test(password)) {
            isValid = false;
            message = "El password debe tener letras, números y algún caracter especial";
        }
    }

    return { isValid, message };
};

const validateText = (text, min, max, name, validEmptyOrNull = false) => {
    let isValid = true;
    let message = "";

    if ((!text || text.trim() === "") && !validEmptyOrNull) {
        isValid = false;
        message = `El ${name} no puede estar vacío`;
    } else {
        // Adjust the regex for texto (name) length between min and max characters
        const textoRegex = new RegExp(`^.{${min},${max}}$`);

        if (!textoRegex.test(text)) {
            isValid = false;
            message = `El ${name} debe tener entre ${min} y ${max} caracteres`;
        }
    }
    return { isValid, message };
};

export { validateText, validateEmail, validatePassword };