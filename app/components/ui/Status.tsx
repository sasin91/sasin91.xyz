import { usePage } from "@inertiajs/react";

const Status = () => {
    const { props } = usePage();
    const status = props.status as string;

    return status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
    );
};

export default Status;
