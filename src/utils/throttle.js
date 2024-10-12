export default function throttle(func, delay) {
    let timer = null;
    return function(...args){
        if (!timer){
            func(...args)
            timer = setTimeout(() => {
                timer = null;
            }, delay)
        }
    }
}