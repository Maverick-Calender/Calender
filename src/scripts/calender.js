(function () {
    var today = new Date();
    var month, day, year, firstDay;
    month = today.getMonth();
    day = today.getDate();
    year = today.getFullYear();

    firstDay = new Date(year, month, 1);

    var months = ["january", "february", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function calenderOverview() {

        function displayDate() {
            document.getElementById("monthHolder").innerText = months[month];
            document.getElementById("yearHolder").innerText = year;
        }

        function createDayHeaders() {
            var wrapper = document.getElementById("calWrapper");
            var row = document.createElement("tr");
            for (var i = 0; i < days.length; i++) {
                var el = document.createElement("th");
                el.setAttribute("class", "dayHeader");
                el.innerText = days[i];
                row.appendChild(el);
            }
            wrapper.appendChild(row);
        }

        function createDayCells() {
            var dayOne = firstDay.getDay();
            var iDay = 0;

            var wrapper = document.getElementById("calWrapper");
            var lastDay = new Date(year, month + 1, 0).getDate();

            while (iDay < lastDay) {
                var row = document.createElement("tr");
                for (var i = 0; i < days.length; i++) {
                    var el = document.createElement("td");

                    if (dayOne === i || iDay > 0) {
                        if (day - 1 === iDay)
                            el.setAttribute("class", "dayCell today");
                        else
                            el.setAttribute("class", "dayCell");

                        if (iDay < lastDay)
                            iDay++;
                        else
                            break;
                        el.innerText = iDay;
                    }
                    row.appendChild(el);
                }
                wrapper.appendChild(row);
            }
        }

        displayDate(today);
        createDayHeaders();
        createDayCells();
    }

    function timetable() {
        function createTimetable() {
            var wrapper = document.getElementById("timetableWrapper");
            var row = document.createElement("tr");
            for (var i = 0; i < days.length; i++) {
                var el = document.createElement("th");
                el.setAttribute("class", "dayHeader");
                el.innerText = days[i];
                
                for (var x =0; x < 5; x++) {
                    var period = document.createElement("div");

                    period.setAttribute("class", "event");
                    period.appendChild(document.createElement("h3").innerText = "tedt");
                    period.appendChild(document.createElement("p").innerText = "tedt");

                    el.appendChild(period);
                }
                row.appendChild(el);
            }
            wrapper.appendChild(row);
        }

        createTimetable();
    }

    calenderOverview();
    timetable();
})();