// Function to format date with various options
export function formatDate(dateString, formatType = 'long', includeYear = false, locale = 'en-US') {
  const date = new Date(dateString);

  // Define format options based on the type and year inclusion
  let options;

  switch (formatType) {
    case 'long':
      options = { month: 'long', day: '2-digit' };
      break;
    case 'short':
      options = { month: 'short', day: '2-digit' };
      break;
    case 'full':
      options = { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' };
      break;
    case 'shortYear':
      options = { month: 'short', day: '2-digit', year: 'numeric' };
      break;
    default:
      options = { month: 'long', day: '2-digit' };
      break;
  }

  if (includeYear && formatType !== 'full') {
    options.year = 'numeric';
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}
