const bridge = (window as any).WebViewJavascriptBridge;

export async function call(fnName: string, data: any = {}) {
    console.log("js call app", fnName, data);
    return new Promise((r) => {
        if (isApp()) {
            bridge.callHandler(fnName, data, function (response) {
                r(response)
            });
        } else {
            console.log("not in app");
        }
    })

}

export function isApp(): boolean {
    return !!bridge
}
