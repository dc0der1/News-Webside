const date = () => {
    let currentDate = document.getElementById("current-date");
    const date = new Date();
    let day = "";
    const month = date.toLocaleString('default', {month: 'long'});

    switch (date.getDay()) {
        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }

    currentDate.textContent = day + ", " + month + " " + date.getDate() + ", " + date.getFullYear();
}

date();