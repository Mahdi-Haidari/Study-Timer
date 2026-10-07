document.addEventListener("DOMContentLoaded", () => {
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    
    const workBtn = document.getElementById("work-btn");
    const breakBtn = document.getElementById("break-btn");
    
    const startBtn = document.getElementById("start-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const resetBtn = document.getElementById("reset-btn");

    let timerId = null;
    let timeLeft = 25 * 60;
    let currentMode = "work";

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, "0");
        secondsDisplay.textContent = seconds.toString().padStart(2, "0");
    }

    function changeMode(mode, minutes, bodyBg) {
        currentMode = mode;
        timeLeft = minutes * 60;
        clearInterval(timerId);
        timerId = null;
        updateDisplay();
        document.body.style.backgroundColor = bodyBg;
    }

    workBtn.addEventListener("click", () => {
        workBtn.classList.add("active");
        breakBtn.classList.remove("active");
        changeMode("work", 25, "#f0f4f8");
    });

    breakBtn.addEventListener("click", () => {
        breakBtn.classList.add("active");
        workBtn.classList.remove("active");
        changeMode("break", 5, "#e6fffa");
    });

    startBtn.addEventListener("click", () => {
        if (timerId !== null) return;

        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                timerId = null;
                alert(currentMode === "work" ? "Time to take a break!" : "Time to study!");
            }
        }, 1000);
    });

    pauseBtn.addEventListener("click", () => {
        clearInterval(timerId);
        timerId = null;
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(timerId);
        timerId = null;
        timeLeft = currentMode === "work" ? 25 * 60 : 5 * 60;
        updateDisplay();
    });
});
