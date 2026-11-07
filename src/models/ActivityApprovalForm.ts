export enum ActivityType {
    Trip = 'trip',
    SummerCamp = 'summer_camp',
    Other = 'other',
}

export enum FormStatus {
    Draft = 'draft',
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
}

export interface ActivityForm {
    id: string;
    title: string;
    activityType: ActivityType;
    startDate: string;
    endDate: string;
    participantCount: number;
    description?: string;
    status: FormStatus;
    createdAt: string;
    updatedAt: string;
}
