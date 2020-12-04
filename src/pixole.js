function pixole(elementOrSelector){
    let target;
    if(typeof elementOrSelector == 'string') target = document.querySelector(elementOrSelector);
    else if(elementOrSelector instanceof HTMLElement) target = elementOrSelector;
    else return null;

    const canvas = document.createElement('canvas');
    canvas.width = target.offsetWidth > 35 ? 40 : target.offsetWidth;
    canvas.height = target.offsetHeight > 35 ? 40 : target.offsetHeight;
    const ctx = canvas.getContext('2d');

    const lineCondition = target.offsetWidth > 35 || target.offsetHeight > 35 ? 40 : 35;
    ctx.drawImage(target, 0, 0, canvas.width, canvas.height)
    const arr = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let template = '';

    for(let i=0; i<arr.data.length / 4; i++){
        template += `%c▓▓${i % lineCondition == 0 && i != 0 ? '\n' : ''}`
    }
    let style = [];
    for(let i=0; i<arr.data.length; i += 4){
        const R = arr.data[i];
        const G = arr.data[i + 1];
        const B = arr.data[i + 2];
        style.push(`color:rgb(${R},${G},${B});`)
    }
    return {
        print: () => console.log(template, ...style),
        textArray: template,
        styleArray: style
    };
}