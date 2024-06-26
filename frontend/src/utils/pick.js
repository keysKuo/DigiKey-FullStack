import { pick } from "lodash";

const getInfoData = ({ fields = [], object = {} }) => {
	return pick(object, fields);
};

export { getInfoData };