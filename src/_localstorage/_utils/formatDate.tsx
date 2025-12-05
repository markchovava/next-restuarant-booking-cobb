/**
 * Formats a date string into a localized, long-form date string (e.g., "1 January 2023")
 * using the 'en-GB' locale.
 *
 * @param dateString The date string to format (e.g., '2023-01-01').
 * @returns The formatted date string.
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const date: Date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}



export const formatDisplayDate = (i: string) => {
    //console.log(i)
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date(i);
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const date = currentDate.getDate()
    const day = currentDate.getDay()
    const dayName: string = daysOfWeek[day];
    const today = date + " " + monthNames[month] + " " + year 
    //console.log('today', today)
    return {
        today,
        dayName,
        date
    }   
}




/**
 * Generates a list of the next 'count' days starting from 'startDate'.
 * @param startDate The date to start from (e.g., '2025-11-06').
 * @param count The number of days to include in the list.
 * @returns A list of dates in 'YYYY-MM-DD' string format.
 */
export function getNextDays(startDate: string | Date, count: number): string[] {
    // Ensure we start with a mutable Date object
    let currentDate = new Date(startDate);
    const dateList: string[] = [];

    for (let i = 0; i < count; i++) {
        // --- Date Formatting ---
        // 1. Get the parts
        const year: number = currentDate.getFullYear();
        // Month is 0-indexed, so add 1 and ensure two digits
        const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
        // Ensure two digits for the day
        const day: string = String(currentDate.getDate()).padStart(2, '0');

        // 2. Add to the list
        const formattedDate: string = `${year}-${month}-${day}`;
        dateList.push(formattedDate);

        // 3. Increment the date by one day
        // This relies on JavaScript's automatic date rollover (e.g., Nov 30 -> Dec 1).
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
}

// --- Usage ---

// Since the previous context used '2025-11-6', we'll use a full date string for reliability.
const startDateString: string = '2025-11-06';
const numberOfDays: number = 60;
