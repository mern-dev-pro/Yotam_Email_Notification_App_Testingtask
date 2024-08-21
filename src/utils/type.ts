export interface IOption {
  label: string;
  value: string;
}

export interface INotification {
  interval: string;
  intervalDuration?: number;
  searchString: string;
  relevancyScore: number;
  day?: number[];
  date: Date;
  time: Date;
  emails: string[];
}
