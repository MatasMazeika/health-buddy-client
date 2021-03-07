export const getErrorMessage = (error) => {
	if (error?.response?.data?.errors) {
		return Object.values(error.response.data.errors).map((errorData) => errorData);
	}

	return 'Something went wrong, please try again';
};
