import http from "./http";

function getShareIntro() {
    return http.get(
        "/invitation_wallet",
        {}
    )
}


function getShareDetail() {
    return http.get(
        "/invitation_statistic",
        {}
    )
}
