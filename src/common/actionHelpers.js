export const createAction = (type, payload = undefined, options = {}) => {
	return Object.assign(
		{
			type,
			payload,
		},
		options,
	);
};
