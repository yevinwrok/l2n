export default function copyText(text: string, callback?: () => void) {
    let oInput = document.createElement('input');
    // 将想要复制的值
    oInput.value = text;
    // 页面底部追加输入框
    document.body.appendChild(oInput);
    // 选中输入框
    oInput.select();
    // 执行浏览器复制命令
    document.execCommand('Copy');
    // 复制后移除输入框
    oInput.remove()
    // 执行回调
    callback && callback();
}