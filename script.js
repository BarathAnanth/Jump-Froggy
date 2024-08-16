function startGame() {
    const input = document.getElementById("inputArray").value;
    const nums = input.split(',').map(Number);
    const pond = document.getElementById("pond");
    const output = document.getElementById("output");
    const frogSelect = document.getElementById("frogSelect").value;
    const lilyPadSelect = document.getElementById("lilyPadSelect").value;
    const selections = document.getElementById("selections");

    selections.classList.add('hidden');
    pond.innerHTML = '';
    output.innerHTML = '';

    if (nums.length === 0 || nums[0] === 0) {
        output.innerHTML = "Invalid input or starting position.";
        selections.classList.remove('hidden');
        return;
    }

    for (let i = 0; i < nums.length; i++) {
        const lilyPad = document.createElement('div');
        lilyPad.className = `lily-pad ${lilyPadSelect}`;
        lilyPad.innerText = nums[i];
        pond.appendChild(lilyPad);
    }

    const lilyPads = document.querySelectorAll(".lily-pad");
    const minimalPath = findMinimalPath(nums);
    if (!minimalPath.length) {
        output.innerHTML = "Cannot reach the end!";
        selections.classList.remove('hidden');
        return;
    }

    const frog = document.createElement('div');
    frog.id = 'frog';
    frog.innerText = frogSelect;
    pond.appendChild(frog);

    const jumpSound = new Audio('cartoon-jump-6462_xBhMHEqa.mp3');
    const finishSound = new Audio('level-win-6416.mp3');
    const initialLilyPad = lilyPads[minimalPath[0]];
    frog.style.left = `${initialLilyPad.offsetLeft}px`;
    frog.style.top = `${initialLilyPad.offsetTop}px`;

    let currentIndex = 1;

    function jump() {
        if (currentIndex >= minimalPath.length) {
            finishSound.play();
            output.innerHTML = `Minimum jumps: ${minimalPath.length - 1}<br>Path: ${minimalPath.join(' -> ')}`;
            return;
        }

        const nextIndex = minimalPath[currentIndex];
        const nextLilyPad = lilyPads[nextIndex];

        frog.style.left = `${nextLilyPad.offsetLeft}px`;
        frog.style.top = `${nextLilyPad.offsetTop}px`;

        jumpSound.play();
        currentIndex++;
        setTimeout(jump, 1000);
    }

    setTimeout(jump, 1000);
}

function findMinimalPath(nums) {
    const path = [];
    if (nums.length === 0) return path;

    let maxReach = 0;
    let steps = 0;
    let jumps = 0;
    let lastJumpIndex = -1;

    for (let i = 0; i < nums.length - 1; i++) {
        maxReach = Math.max(maxReach, i + nums[i]);

        if (i === steps) {
            jumps++;
            steps = maxReach;
            if (lastJumpIndex != -1)
                path.push(lastJumpIndex);
            lastJumpIndex = i;
        }

        if (steps >= nums.length - 1) {
            path.push(i - 1);
            path.push(nums.length - 1);
            break;
        }
    }

    if (steps < nums.length - 1) return [];

    if (path[0] !== 0) {
        path.unshift(0);
    }

    console.log(path);

    return path;
}
