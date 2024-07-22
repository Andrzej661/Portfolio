import {
	add,
	differenceInDays,
	endOfMonth,
	format,
	setDate,
	startOfMonth,
	sub
} from "date-fns"
import Cell from "./Cell"

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type Props = {
	value?: Date
	onChange: (date: Date) => void
}

const Calendar: React.FC<Props> = ({ value = new Date(), onChange }) => {
	const validatedValue = value instanceof Date ? value : new Date()

	const startDate = startOfMonth(value)
	const endDate = endOfMonth(value)
	const numDays = differenceInDays(endDate, startDate) + 1

	const prefixDays = startDate.getDay()
	const suffixDays = 6 - endDate.getDay()

	const prevMonth = () => onChange(sub(validatedValue, { months: 1 }))
	const nextMonth = () => onChange(add(validatedValue, { months: 1 }))
	const prevYear = () => onChange(sub(validatedValue, { years: 1 }))
	const nextYear = () => onChange(add(validatedValue, { years: 1 }))

	const handleClickDate = (day: number) => {
		const date = setDate(validatedValue, day)
		// Ensure the selected time is set to 00:00:00 for the date-only representation
		const dateWithoutTime = new Date(date.setHours(0, 0, 0, 0))

		onChange(dateWithoutTime)
	}

	return (
		<div className="mx-auto w-full border-l border-t sm:max-w-screen-sm ">
			<div className="grid grid-cols-7 items-center justify-center text-center">
				<Cell onClick={prevYear}>{"<<"}</Cell>
				<Cell onClick={prevMonth}>{"<"}</Cell>
				<Cell className="col-span-3">{format(value, "LLLL yyyy")}</Cell>
				<Cell onClick={nextMonth}>{">"}</Cell>
				<Cell onClick={nextYear}>{">>"}</Cell>

				{weeks.map((week, index) => (
					<Cell key={index} className="text-xs font-bold uppercase">
						{week}
					</Cell>
				))}

				{Array.from({ length: prefixDays }).map((_, index) => (
					<Cell key={index} />
				))}

				{Array.from({ length: numDays }).map((_, index) => {
					const day = index + 1
					const isCurrentDay =
						day === validatedValue.getDate() &&
						startDate.getMonth() === validatedValue.getMonth()

					return (
						<Cell
							key={day}
							isActive={isCurrentDay}
							onClick={() => handleClickDate(day)}>
							{day}
						</Cell>
					)
				})}

				{Array.from({ length: suffixDays }).map((_, index) => (
					<Cell key={index} />
				))}
			</div>
		</div>
	)
}

export default Calendar
