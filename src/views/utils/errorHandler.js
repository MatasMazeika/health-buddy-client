export const getErrorMessage = (error) => {
	console.log(error);
	if (error?.response?.data?.errors) {
		console.log(error.response.data.errors);
		return Object.values(error.response.data.errors).map((errorData) => errorData);
	}

	return 'Something went wrong, please try again';
};
