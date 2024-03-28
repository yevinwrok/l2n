import Homepage from "../views/homepage/index.svelte"
import Agreement from "../views/agreement/index.svelte"
import Share from "../views/share/share.svelte";
import Withdraw from "../views/withdraw/withdraw.svelte";
import RewardsHistory from "../views/rewardsHistory/rewardsHistory.svelte";
import InviteHistory from "../views/inviteHistory/inviteHistory.svelte";
import DataAnalysis from "../views/dataAnalysis/dataAnalysis.svelte"
import ContentSignature from "../views/content/signature/signature.svelte"
import Accredit from "../views/accredit/accredit.svelte";
import LandingPage from "../views/landingPage/landingPage.svelte";
import Survey from "../views/survey/survey.svelte";
export const hybrid = {
    "/share/index": Share,
    "/share/withdraw": Withdraw,
    "/share/rewards_history": RewardsHistory,
    "/share/invite_history/:type": InviteHistory,
    "/data_analysis": DataAnalysis,
    "/accredit": Accredit,
    "/survey": Survey,
    "/content/signature": ContentSignature,
}

export const hybridList = Object.keys(hybrid).map(item=>{
    return item.split(":")[0]
})

const routes = {
    "/": Homepage,
    "/agreement/:slug": Agreement,
    "/landing_page": LandingPage,
    ...hybrid
}



export default routes;