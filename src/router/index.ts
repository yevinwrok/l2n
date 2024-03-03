import Homepage from "../views/homepage/index.svelte"
import Agreement from "../views/agreement/index.svelte"
import Share from "../views/share/share.svelte";
import Withdraw from "../views/withdraw/withdraw.svelte";
import RewardsHistory from "../views/rewardsHistory/rewardsHistory.svelte";
import InviteHistory from "../views/inviteHistory/inviteHistory.svelte";
import Signature from "../views/signature/signature.svelte"
export const onlyMobile = {
    "/share/index": Share,
    "/share/withdraw": Withdraw,
    "/share/rewards_history": RewardsHistory,
    "/share/invite_history": InviteHistory,
    "/signature": Signature,
}

const routes = {
    "/": Homepage,
    "/agreement/:slug": Agreement,
    ...onlyMobile
}



export default routes;