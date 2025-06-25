import { DaySettings, Settings } from "./interfaces";

const defaultDaySettings: DaySettings[] = [
        {
            name: "Lunes",
            timeIntervals:[
                {
                    beginHour: 9,
                    endHour: 17
                }
            ],
            disabled: false
        },
        {
            name: "Martes",
            timeIntervals:[
                {
                    beginHour: 9,
                    endHour: 17
                }
            ],
            disabled: false
        },
        {
            name: "Miercoles",
            timeIntervals:[
                {
                    beginHour: 9,
                    endHour: 17
                }
            ],
            disabled: false
        },
        {
            name: "Jueves",
            timeIntervals:[
                {
                    beginHour: 9,
                    endHour: 17
                }
            ],
            disabled: false
        },
        {
            name: "Viernes",
            timeIntervals:[
                {
                    beginHour: 9,
                    endHour: 17
                }
            ],
            disabled: false
        },
        {
            name: "Sábado",
            timeIntervals:[
                {
                    beginHour: 9,
                    endHour: 17
                }
            ],
            disabled: true
        },
        {
            name: "Domingo",
            timeIntervals:[
                {
                    beginHour: 9,
                    endHour: 17
                }
            ],
            disabled: true
        }
    ]

    const defaultSettings: Settings = {
        days: defaultDaySettings,
        monthlySalary: 0,
        weeklyHours: 0
    }

    export {
        defaultDaySettings,
        defaultSettings
    }