import { INotification } from "@helper/CommonAPISchemas";

export interface NotificationsListRespBody {
	notifications: INotification[];
}

export interface NotificationsMarkReadParams {
	id: string;
}
