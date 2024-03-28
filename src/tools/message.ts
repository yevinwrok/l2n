import { message } from "../store/index"


export default function (msg: string, cb: any) {
    message.set({
        show: true,
        text: msg,
        fn: cb
    })
}