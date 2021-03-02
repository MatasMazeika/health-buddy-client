import { DateTime } from 'luxon';

export const getStartAndEndTimeOfToday = () => ({
	startDate: DateTime.local().startOf('day'),
	endDate: DateTime.local().endOf('day'),
});
