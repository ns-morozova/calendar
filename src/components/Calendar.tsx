import React from "react";
import moment from "moment";
import 'moment/locale/ru';

interface CalendarProps {
    date: Date;
}

const generateCalendarDays = (date: Date) => {
    const startDay = moment(date).startOf('month').day();
    const daysInMonth = moment(date).daysInMonth();
    const weeks: number[][] = [];
    let week: number[] = [];
    let day = startDay;

    for (let i = 1; i <= daysInMonth; i++) {
        week[day - 1] = i;

        if (day === 7 || i === daysInMonth) {
            weeks.push(week);
            week = [];
            day = 0;
        }

        day++;
    }

    return weeks;
};

const Calendar: React.FC<CalendarProps> = ({ date }) => {
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const month = moment(date).format("MMMM");
    const year = moment(date).format("YYYY");
    const day = moment(date).format("D");
    const dayOfWeek = moment(date).locale('ru').format('dddd');
    const monthInGenitive = moment(date).locale('ru').format('MMMM');
    const weeks = generateCalendarDays(date);

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{dayOfWeek}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{day}</div>
                    <div className="ui-datepicker-material-month">{monthInGenitive}</div>
                    <div className="ui-datepicker-material-year">{year}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        {daysOfWeek.map((day, index) => (
                            <th key={index} scope="col" title={day}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                {/* <tbody>
                    {weeks.map((week, i) => (
                        <tr key={i}>
                            {week.map((day, j) => (
                                <td key={j}>{day}</td>
                            ))}
                        </tr>
                    ))}
                </tbody> */}
                <tbody>
                    {weeks.map((week, i) => (
                        <tr key={i}>
                            {week.map((day, j) => {
                                const currentDay = moment(date).date();
                                const isCurrentDay = day === currentDay;
                                const isOtherMonth = day < 1 || day > moment(date).daysInMonth();

                                return (
                                    <td key={j} className={`${isCurrentDay ? 'ui-datepicker-today' : ''} ${isOtherMonth ? 'ui-datepicker-other-month' : ''}`}>
                                        {day > 0 ? day : ''}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;