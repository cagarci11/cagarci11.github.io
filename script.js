function goTo(page) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(s => {
        s.classList.remove("active");
    });

    document.getElementById(page).classList.add("active");
}