const bridge = (window as any).WebViewJavascriptBridge;

export async function call(fnName: string, data: any = {}) {
    return new Promise((r) => {
        bridge.callHandler(fnName, data, function (response) {
            r(response)
        });
    })

}

export function isApp(): boolean {
    return !!bridge
}
