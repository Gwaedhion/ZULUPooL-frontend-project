import { ICoinInstance } from './components/home/Table/Table.props';

export interface IHomeApi {
	status: string;
	instances: ICoinInstance[];
}
