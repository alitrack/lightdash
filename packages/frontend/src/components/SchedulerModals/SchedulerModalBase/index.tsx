import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    NonIdealState,
    Spinner,
} from '@blueprintjs/core';
import React, { FC } from 'react';
import SchedulersModalContent from './SchedulerModalContent';

const SchedulersModalBase: FC<
    { name: string } & React.ComponentProps<typeof SchedulersModalContent>
> = ({
    resourceUuid,
    name,
    schedulersQuery,
    createMutation,
    ...modalProps
}) => {
    return (
        <Dialog
            lazy
            title={
                <>
                    Scheduled deliveries for <b>"{name}"</b>
                </>
            }
            icon="send-message"
            style={{
                minHeight: '300px',
                minWidth: '500px',
            }}
            {...modalProps}
        >
            <SchedulersModalContent
                resourceUuid={resourceUuid}
                schedulersQuery={schedulersQuery}
                createMutation={createMutation}
                {...modalProps}
            />
        </Dialog>
    );
};

export default SchedulersModalBase;