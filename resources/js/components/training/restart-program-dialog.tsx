import { router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import training from '@/wayfinder/routes/training';

export default function RestartProgramDialog({
    programCompleted
}: {
    programCompleted: boolean;
}) {
    const [showRestartDialog, setShowRestartDialog] = useState(
        () => programCompleted,
    );

    const handleConfirmRestart = () => {
        setShowRestartDialog(false);
    };

    const handleCancelRestart = () => {
        router.visit(training.index.url({ query: { restart: '1' }}));
    };

    return (
        <Dialog
            open={showRestartDialog}
            onOpenChange={(open) => {
                if (!open) handleCancelRestart();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Program Completed</DialogTitle>
                    <DialogDescription>
                        You have already completed this program. Do you want to
                        restart it?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="secondary" onClick={handleCancelRestart}>
                        No, I'll choose a new one
                    </Button>
                    <Button onClick={handleConfirmRestart}>Yes, restart</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
