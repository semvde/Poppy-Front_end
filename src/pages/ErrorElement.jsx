function ErrorElement() {
    return (
        <div className={"flex flex-col items-center justify-center grow text-center px-3"}>
            <h1 className={"text-(--color-error)"}>404</h1>
            <p>Sorry, the page you are looking for does not exist or has been moved.</p>
        </div>
    );
}

export default ErrorElement;