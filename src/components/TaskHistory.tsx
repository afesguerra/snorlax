import {useContext, useEffect, useState} from "react";
import {Box, DateRangePickerProps, FormField, LineChart, Spinner} from "@cloudscape-design/components";
import {API, Task} from "../api/HabiticaAPI";
import DateRangePicker from "@cloudscape-design/components/date-range-picker";
import {MixedLineBarChartProps} from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";

const dateRangeValueToDate = (value: DateRangePickerProps.Value): Date[] => {
    if (value.type === "absolute") {
        return [new Date(value.startDate), new Date(value.endDate)];
    } else {
        const now = new Date();
        let start: number = Date.now();
        switch (value.unit) {
            case "second":
                start -= 1000 * value.amount;
                break;
            case "minute":
                start -= 1000 * 60 * value.amount;
                break;
            case "hour":
                start -= 1000 * 60 * 60 * value.amount;
                break;
            case "day":
                start -= 1000 * 60 * 60 * 24 * value.amount;
                break;
            case "week":
                start -= 1000 * 60 * 60 * 24 * 7 * value.amount;
                break;
            case "month":
                // Assuming a month is 30 days for simplicity
                start -= 1000 * 60 * 60 * 24 * 30 * value.amount;
                break;
            case "year":
                // No one cares about leap years
                start -= 1000 * 60 * 60 * 24 * 365 * value.amount;
                break;
        }
        return [new Date(start), now];
    }
}

export const TaskHistory = () => {
    const [tasks, setTasks] = useState<Task[]>();
    const [dateRange, setDateRange] = useState<DateRangePickerProps.Value>({
        amount: 1,
        unit: 'month',
        type: 'relative',
    });

    const api = useContext(API);

    useEffect(() => {
        if (tasks === undefined) {
            api.getTasks().then(setTasks);
        }
    }, [tasks, api]);

    if (tasks === undefined) {
        return <Spinner/>;
    }

    const [startDate, endDate] = dateRangeValueToDate(dateRange);
    const series: MixedLineBarChartProps.LineDataSeries<Date>[] = tasks
        .filter(t => t.type === "habit")
        .map(t => ({
            title: t.text,
            type: "line",
            data: t.history
                .map(t => ({x: new Date(t.date), y: t.value}))
                .filter(({x}) => startDate.getTime() < x.getTime())
                .filter(({x}) => x.getTime() < endDate.getTime())
        }));

    const datepicker = <FormField label={'Filter by date'}>
        <DateRangePicker
            onChange={({detail}) => detail.value && setDateRange(detail.value)}
            value={dateRange}
            showClearButton={false}
            relativeOptions={[
                {
                    key: "previous-month",
                    amount: 1,
                    unit: "month",
                    type: "relative"
                },
                {
                    key: "previous-3-months",
                    amount: 3,
                    unit: "month",
                    type: "relative"
                },
                {
                    key: "previous-6-months",
                    amount: 6,
                    unit: "month",
                    type: "relative"
                },
                {
                    key: "previous-year",
                    amount: 1,
                    unit: "year",
                    type: "relative"
                }
            ]}
            isValidRange={range => {
                if (!range) {
                    return {
                        valid: false,
                        errorMessage: 'Date range missing',
                    };
                }
                if (range.type === "absolute") {
                    const [startDateWithoutTime] = range.startDate.split("T");
                    const [endDateWithoutTime] = range.endDate.split("T");
                    if (!startDateWithoutTime || !endDateWithoutTime) {
                        return {
                            valid: false,
                            errorMessage:
                                "The selected date range is incomplete. Select a start and end date for the date range."
                        };
                    }
                    if (new Date(range.startDate).getTime() - new Date(range.endDate).getTime() > 0) {
                        return {
                            valid: false,
                            errorMessage:
                                "The selected date range is invalid. The start date must be before the end date."
                        };
                    }
                }
                return {valid: true};
            }}
            placeholder="Filter by a date and time range"
        />
    </FormField>

    return (
        <LineChart
            hideFilter={true} // while solving bug
            series={series}
            height={300}
            xScaleType="time"
            xTitle="Time"
            yTitle="Score"
            xTickFormatter={value => value.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
            })}
            additionalFilters={datepicker}
            empty={
                <Box textAlign="center" color="inherit">
                    <b>No data available</b>
                    <Box variant="p" color="inherit">
                        There is no data available
                    </Box>
                </Box>
            }
            noMatch={
                <Box textAlign="center" color="inherit">
                    <b>No matching data</b>
                    <Box variant="p" color="inherit">
                        There is no matching data to display
                    </Box>
                </Box>
            }
        />
    );
}