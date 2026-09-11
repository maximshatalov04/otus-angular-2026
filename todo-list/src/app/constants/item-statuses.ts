// Literals
const TO_DO = 'ToDo';
const IN_PROGRESS = 'InProgress';
const COMPLETED = 'Completed';
const ALL = 'All';

// Labels
const TO_DO_LABEL = 'To Do';
const IN_PROGRESS_LABEL = 'In Progress';
const COMPLETED_LABEL = 'Completed';
const ALL_LABEL = 'All';

export type ToDoItemStatus = typeof TO_DO | typeof IN_PROGRESS | typeof COMPLETED;
export type StatusFilter = ToDoItemStatus | 'All';

export const STATUS_OPTIONS: Record<ToDoItemStatus, string> = {
    [TO_DO]: TO_DO_LABEL,
    [IN_PROGRESS]: IN_PROGRESS_LABEL,
    [COMPLETED]: COMPLETED_LABEL,
} as const;
export const STATUS_ORDER: ToDoItemStatus[] = Object.keys(STATUS_OPTIONS) as ToDoItemStatus[];

export const STATUS_FILTERS: Record<StatusFilter, string> = {
    [ALL]: ALL_LABEL,
    ...STATUS_OPTIONS,
} as const;
export const FILTER_ORDER: StatusFilter[] = Object.keys(STATUS_FILTERS) as StatusFilter[];