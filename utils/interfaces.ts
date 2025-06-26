export interface TimeInterval {
    beginHour: number,
    endHour: number
}
export interface DaySettings {
    name: string,
    timeIntervals: TimeInterval[],
    disabled: boolean
}
export interface Settings {
    days: DaySettings[],
    weeklyHours: number,
    monthlySalary: number
}