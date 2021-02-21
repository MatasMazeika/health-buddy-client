import moment from 'moment';

export const getStartAndEndTimeOfToday = () => ({
	startDate: moment().startOf('day'),
	endDate: moment().endOf('day'),
});
