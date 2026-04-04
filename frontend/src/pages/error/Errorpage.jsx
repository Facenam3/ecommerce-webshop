import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Error.</h1>
            <p className="text-gray-500 mt-2">
                {error?.message || "Something went wrong."}
            </p>
        </div>
    );
}