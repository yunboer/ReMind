const draggableDiv = document.getElementById('draggableDiv');

let isDragging = false;
let startX, startY, initialX, initialY;

draggableDiv.addEventListener('mousedown', (e) => {
    isDragging = true;  // 开始拖动
    startX = e.clientX;  // 鼠标的位置
    startY = e.clientY;
    initialX = parseFloat(getComputedStyle(draggableDiv).transform.split(',')[4] || 0);  // 起始的transform位置
    initialY = parseFloat(getComputedStyle(draggableDiv).transform.split(',')[5] || 0);
    draggableDiv.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        draggableDiv.style.transform = `translate(${initialX + deltaX}px, ${initialY + deltaY}px)`;
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        draggableDiv.style.cursor = 'grab';
    }
});
