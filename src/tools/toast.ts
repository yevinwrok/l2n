import { toastMessage } from "../store/index"


export default function (message: string) {
    toastMessage.set(message);
}