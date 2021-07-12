import { toast } from "react-toastify";
export default function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warning("Contraseña erronea");
      break;

    case "auth/too-many-requests":
      toast.warning(
        "Has enviado demasiadas solicitudes de confirmación en muy poco tiempo"
      );
      break;
    case "auth/user-not-found":
      toast.warning("El usuario o la contraseña son incorrecto.");
      break;
    case "auth/email-already-in-use":
      toast.warning("El correo ya esta en uso, por favor use otro");
      break;
    default:
      toast.warning("Error del servidor, inténtelo mas tarde.");
      break;
  }
}
