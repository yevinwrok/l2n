export function percent(num: number): string {
    if (num === undefined || isNaN(Number(num))) {
        return "-%"
    } else {
        let n = `${(num * 100).toFixed(2)}`;
        if (n.endsWith(".00")) {
            n = `${(num * 100).toFixed(0)}`;
        } else if (n.endsWith("0")) {
            n = `${(num * 100).toFixed(1)}`;
        }
        return `${n}%`
    }

}