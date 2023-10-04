import { DialogProps } from '@blueprintjs/core';
import React, { FC } from 'react';
import {
    useDashboardSchedulerCreateMutation,
    useDashboardSchedulers,
} from '../hooks/useDashboardSchedulers';
import SchedulersModalBase from './SchedulerModalBase';

interface Props extends DialogProps {
    dashboardUuid: string;
    name: string;
}

export const DashboardSchedulersModal: FC<Props> = ({
    dashboardUuid,
    name,
    ...modalProps
}) => {
    const schedulersQuery = useDashboardSchedulers(dashboardUuid);
    const createMutation = useDashboardSchedulerCreateMutation();
    return (
        <SchedulersModalBase
            resourceUuid={dashboardUuid}
            name={name}
            schedulersQuery={schedulersQuery}
            createMutation={createMutation}
            isChart={false}
            {...modalProps}
        />
    );
};