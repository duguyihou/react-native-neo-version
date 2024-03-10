export type AlertType = 'force' | 'option' | 'skip';

export type Configuration = {
  title: string;
  message: string;
  alertType: AlertType;
  frequency: number;
};
