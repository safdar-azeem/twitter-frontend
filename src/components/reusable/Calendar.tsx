import React from 'react'
import { IDateOfBirth } from '../Profile/EditProfileModel.profile'

interface IProps {
   handleDateOfBirth: (date: IDateOfBirth) => void
}

const Calendar = ({ handleDateOfBirth }: IProps) => {
   const [selectedDay, setSelectedDay] = React.useState<number | null>(null)
   const [selectedYear, setSelectedYear] = React.useState<number | null>(null)
   const [selectedMonth, setSelectedMonth] = React.useState<string | null>(null)

   const handleDayChange = (value: number) => setSelectedDay(value)
   const handleYearChange = (value: number) => setSelectedYear(value)
   const handleMonthChange = (value: string) => setSelectedMonth(value)

   React.useEffect(() => {
      handleDateOfBirth({
         month: selectedMonth,
         day: selectedDay,
         year: selectedYear,
      })
   }, [selectedMonth, selectedDay, selectedYear])

   return (
      <div className="d-flex justify-content-between">
         <MonthDropdown handleMonthChange={handleMonthChange} />
         <div className="mx-4 w-100">
            <Days handleDayChange={handleDayChange} />
         </div>
         <Years handleYearChange={handleYearChange} />
      </div>
   )
}

const MonthDropdown = ({ handleMonthChange }: { handleMonthChange: (value: string) => void }) => {
   const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ]

   const [selectedMonth, setSelectedMonth] = React.useState<string | null>(null)

   const handleMonthClick = (value: string) => {
      setSelectedMonth(value)
      handleMonthChange(value)
   }

   return (
      <div className="dropdown w-100">
         <button
            className="btn btn-outline-secondary text-dark w-100 dropdown-toggle"
            type="button"
            id="months"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            {selectedMonth || 'Month'}
         </button>
         <ul
            className="dropdown-menu overflow-y-auto"
            aria-labelledby="months"
            style={{
               maxHeight: '200px',
            }}>
            {months.map((month, index) => {
               return (
                  <li key={index} className="dropdown-item" onClick={() => handleMonthClick(month)}>
                     {month}
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

const Days = ({ handleDayChange }: { handleDayChange: (value: number) => void }) => {
   const [selectedDay, setSelectedDay] = React.useState<number | null>(null)

   const daysInMonth = (month: any, year: any) => new Date(year, month, 0).getDate()

   const howManyDaysInMonth = daysInMonth(new Date().getMonth(), new Date().getFullYear())
   const days = Array.from(Array(howManyDaysInMonth).keys())

   const handleDayClick = (day: number) => {
      setSelectedDay(day)
      handleDayChange(day)
   }

   return (
      <div className="dropdown w-100">
         <button
            className="btn btn-outline-secondary text-dark w-100 dropdown-toggle"
            type="button"
            id="Day"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            {selectedDay || 'Day'}
         </button>
         <ul
            className="dropdown-menu overflow-y-auto"
            aria-labelledby="Day"
            style={{
               maxHeight: '200px',
            }}>
            {days.map((day, index) => {
               return (
                  <li key={index} className="dropdown-item" onClick={() => handleDayClick(day + 1)}>
                     {day + 1}
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

const Years = ({ handleYearChange }: { handleYearChange: (value: number) => void }) => {
   const years = Array.from(Array(new Date().getFullYear() - 1969).keys())
   const [year, setYear] = React.useState<number | null>(null)

   const handleChange = (value: number) => {
      setYear(value)
      handleYearChange(value)
   }

   return (
      <div className="dropdown w-100">
         <button
            className="btn btn-outline-secondary text-dark w-100 dropdown-toggle"
            type="button"
            id="Day"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            {year || 'Year'}
         </button>
         <ul
            className="dropdown-menu overflow-y-auto"
            aria-labelledby="Day"
            style={{
               maxHeight: '200px',
            }}>
            {years.map((year, index) => {
               const yearNew = new Date().getFullYear() - year
               return (
                  <li key={index} className="dropdown-item" onClick={() => handleChange(yearNew)}>
                     {yearNew}
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

export default Calendar
