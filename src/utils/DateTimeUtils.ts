export function formatDate(dateString: string) {
  // Parse the input date string
  const [datePart, timePart] = dateString.split(' ');
  const [month, day, year] = datePart.split('/');

  const [hours, minutes] = timePart.split(':');
  const [formattedHours, period] = [hours.slice(0, 2), hours.slice(2)].map(h =>
    h.trim(),
  );

  let hours24 = parseInt(formattedHours, 10);
  if (period === 'PM' && hours24 < 12) hours24 += 12;
  if (period === 'AM' && hours24 === 12) hours24 = 0;

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;
  return `${formattedDate} ${formattedTime}`;
}
