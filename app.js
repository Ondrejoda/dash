let week = [
    [ // monday 
        {name: "OPH", start: "8:00"}, {name: "pauza", start: "8:45"}, {name: "CIT", start: "8:55"}, {name: "pauza", start: "9:40"}, {name: "CJL", start: "10:00"}, {name: "volno", start: "10:45"}, {name: "ANJ", start: "11:50"}, {name: "pauza", start: "12:35"}, {name: "PRG", start: "12:45"}, {name: "pauza", start: "13:30"}, {name: "PRA", start: "13:40"}, {name: "end", start: "15:40"}
    ],
    [ // tuesday
        {name: "MAT", start: "8:00"}, {name: "pauza", start: "8:45"}, {name: "FYZ", start: "8:55"}, {name: "pauza", start: "9:40"}, {name: "ZSV", start: "10:00"}, {name: "volno", start: "10:45"}, {name: "OPH", start: "11:50"}, {name: "pauza", start: "13:20"}, {name: "FYZ", start: "13:40"}, {name: "end", start: "14:25"}
    ],
    [ // wednesday
        {name: "DBS", start: "8:00"}, {name: "pauza", start: "8:45"}, {name: "CIT", start: "8:55"}, {name: "pauza", start: "9:40"}, {name: "ANJ", start: "10:00"}, {name: "volno", start: "10:45"}, {name: "OPH", start: "11:50"}, {name: "pauza", start: "12:35"}, {name: "ZSV", start: "12:45"}, {name: "pauza", start: "13:30"}, {name: "MAT", start: "13:40"}, {name: "pauza", start: "14:25"}, {name: "DBS", start: "14:35"}, {name: "end", start: "16:05"}
    ],
    [ // thursday
        {name: "CJL", start: "8:00"}, {name: "pauza", start: "8:45"}, {name: "WEB", start: "8:55"}, {name: "pauza", start: "9:40"}, {name: "MAT", start: "10:00"}, {name: "pauza", start: "10:45"}, {name: "ANJ", start: "10:55"}, {name: "pauza", start: "11:40"}, {name: "TEV", start: "11:50"}, {name: "end", start: "13:20"}
    ],
    [ // friday
        {name: "MME", start: "8:00"}, {name: "pauza", start: "9:30"}, {name: "PRG", start: "10:00"}, {name: "pauza", start: "11:30"}, {name: "WEB", start: "11:50"}, {name: "end", start: "13:20"}
    ],
    [], [] // saturday, sunday
];

let trams = [
    "3 13:08", "2 13:16", "3 13:23", "2 13:31", "3 13:38", "2 13:46", "3 13:53",
    "2 14:01", "3 14:08", "2 14:16", "3 14:23", "2 14:31", "3 14:38", "2 14:46", "3 14:53",
    "2 15:01", "3 15:08", "2 15:16", "3 15:23", "2 15:31", "3 15:38", "2 15:46", "3 15:53",
    "2 16:01", "3 16:08", "2 16:16", "3 16:23", "2 16:31", "3 16:38", "2 16:46", "3 16:53",
    "2 17:01", "3 17:09", "2 17:19", "3 17:29", "3 17:39", "2 17:49",
    "3 18:01", "2 18:13", "3 18:25", "2 18:37", "3 18:49"
];

let trams2 = [
    "11 13:00", "5 13:08", "11 13:15", "5 13:23", "11 13:30", "5 13:38", "11 13:45", "5 13:53",
    "11 14:00", "5 14:08", "11 14:15", "5 14:23", "11 14:30", "5 14:38", "11 14:45", "5 14:53",
    "11 15:00", "5 15:08", "11 15:15", "5 15:23", "11 15:30", "5 15:38", "11 15:45", "5 15:53",
    "11 16:00", "5 16:08", "11 16:15", "5 16:23", "11 16:30", "5 16:38", "11 16:45", "5 16:53",
    "11 17:00", "5 17:08", "11 17:15", "5 17:23", "11 17:30", "5 17:38", "11 17:45", "5 17:53",
    "11 18:00", "5 18:08", "11 18:15", "5 18:23", "11 18:30", "11 18:45"
];

let buss = [
    "141 04:55", "141 05:25", "141 05:35", "141 05:50", "141 06:20", "141 06:50", "141 07:02", "141 07:25", 
    "141 08:05", "141 09:05", "141 10:05", "141 12:05", "141 13:05", "141 13:50", "141 14:05", "141 14:35",
    "141 14:50", "141 15:35", "141 16:35", "141 17:35"   
]

function addElement(elementTexts, elementClass, targetID) {
    const main = document.createElement("div");
    main.className = elementClass;
    for (const elementText of elementTexts) {
        const para = document.createElement("p");
        const node = document.createTextNode(elementText);
        para.appendChild(node);
        main.appendChild(para);
    }
    const element = document.getElementById(targetID);
    element.appendChild(main);
}

function calcEtaTime(currTime, nextTime) {
    let etaTime = nextTime - currTime;
    if (etaTime == 0) {
        return "nyní";
    }
    let etaMinutes = etaTime % 60;
    let etaHours = (etaTime - etaMinutes) / 60;
    let etaText = "za ";
    if (etaHours > 0) {
        etaText += etaHours + " hod";
    }
    if (etaMinutes > 0) {
        etaText += " " + etaMinutes + " min";
    }
    return etaText;
}

let testing = false;

window.addEventListener("load", (event) => {
    const date = new Date();
    let dayIndex = date.getDay() - 1;

    if (dayIndex == -1) {
        dayIndex = 6;
    }

    if (testing) {
        dayIndex = 2;
    }

    let dayArray = week[dayIndex];

    let time = date.getHours() * 60 + date.getMinutes()

    if (testing) {
        time = 8 * 60 + 45;
    }

    let hourCount = 0;

    for (const key in dayArray) {
        const hour = dayArray[key];

        let timeArr = hour.start.split(":");
        let hourTime = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);

        if (time <= hourTime && hour.name != "end") {
            hourCount += 1;

            let texts = [];

            let futureTime = dayArray[parseInt(key) + 1];
            let futureTimeArr = futureTime.start.split(":");

            let etaText = calcEtaTime(time, timeArr[0] * 60 + parseInt(timeArr[1]));

            texts.push(hour.name);
            texts.push(timeArr[0] + ":" + timeArr[1] + " - " + futureTimeArr[0] + ":" + futureTimeArr[1] + " (" + etaText + ")");

            if (hour.name == "pauza") {
                addElement(texts, "schedule__item schedule__item--pause", "today");
            } else if (hour.name == "volno") {
                addElement(texts, "schedule__item schedule__item--free", "today");
            } else {
                addElement(texts, "schedule__item", "today");
            }
        }
    }

    if (hourCount == 0) {
        let node;

        if (dayIndex < 5) {
            const end = dayArray[dayArray.length - 1];
            let endTimeArr = end.start.split(":");
            let endTime = parseInt(endTimeArr[0]) * 60 + parseInt(endTimeArr[1]);

            let etaText = calcEtaTime(time, endTimeArr[0] * 60 + parseInt(endTimeArr[1]));

            if (endTime >= time) {
                addElement([end.name + ": " + endTimeArr[0] + ":" + endTimeArr[1] + " (" + etaText + ")"], "schedule__item", "today");
            }
        }
    }

    let possibleTrams = 0;

    for (const hour of trams) {
        let timeArr = hour.split(" ")[1].split(":");
        let hourTime = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);

        if (time <= hourTime && dayIndex < 6) {
            let texts = [];
    
            let etaText = calcEtaTime(time, timeArr[0] * 60 + parseInt(timeArr[1]));

            texts.push(hour.split(" ")[0]);
            texts.push(timeArr[0] + ":" + timeArr[1] + " (" + etaText + ")");
        
            addElement(texts, "schedule__item schedule__item--tram", "trams");

            possibleTrams += 1;
        }         
    
        if (possibleTrams >= 6) {break;};
    }

    let possibleTrams2 = 0;

    for (const hour of trams2) {
        let timeArr = hour.split(" ")[1].split(":");
        let hourTime = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);

        if (time <= hourTime && dayIndex < 6) {
            let texts = [];
    

            let etaText = calcEtaTime(time, timeArr[0] * 60 + parseInt(timeArr[1]));

            texts.push(hour.split(" ")[0]);
            texts.push(timeArr[0] + ":" + timeArr[1] + " (" + etaText + ")");
            
            addElement(texts, "schedule__item schedule__item--tram", "trams2");

            possibleTrams2 += 1;
        }         
    
        if (possibleTrams2 >= 6) {break;};
    }

    let possibleBuss = 0;

    for (const hour of buss) {
        let timeArr = hour.split(" ")[1].split(":");
        let hourTime = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);

        if (time <= hourTime && dayIndex < 6) {
            let texts = [];
    

            let etaText = calcEtaTime(time, timeArr[0] * 60 + parseInt(timeArr[1]));

            texts.push(hour.split(" ")[0]);
            texts.push(timeArr[0] + ":" + timeArr[1] + " (" + etaText + ")");
            
            addElement(texts, "schedule__item schedule__item--tram", "buss");

            possibleBuss += 1;
        }         
    
        if (possibleBuss >= 6) {break;};
    }
});

window.setTimeout( function() {
    window.location.reload();
  }, 30000);