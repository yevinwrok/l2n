import Homepage from "../views/homepage/index.svelte"
import Agreement from "../views/agreement/index.svelte"
const routes = {
    "/": Homepage,
    "/agreement/:slug": Agreement
}

export default routes;