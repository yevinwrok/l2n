import Homepage from "../views/homepage/index.svelte"
import Agreement from "../views/agreement/index.svelte"
import Share from "../views/share/share.svelte";
import Withdraw from "../views/withdraw/withdraw.svelte";
import RewardsHistory from "../views/rewardsHistory/rewardsHistory.svelte";
import InviteHistory from "../views/inviteHistory/inviteHistory.svelte";
export const share = {
    "/share/index": Share,
    "/share/withdraw": Withdraw,
    "/share/rewards_history": RewardsHistory,
    "/share/invite_history": InviteHistory,
}
const routes = {
    "/": Homepage,
    "/agreement/:slug": Agreement,
    ...share
}

export default routes;