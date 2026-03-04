// Benodigheden input; type, id, name & error
function FormField({id, label, type = "text", error}) {

    const hasError = Boolean(error)

    return (
        <div className="flex flex-col gap-2.5">

            <label htmlFor={id}>
                {label}
            </label>

            <input
                className={`
                    p-5 rounded-xl bg-body-light border outline-none transition focus:ring-2 focus:ring-white/70
                    ${hasError ? "border-(--color-error)" : "border-outline focus:border-primary"}
                `}
                type={type}
                id={id}
                name={id}
                aria-invalid={hasError}
            />

            {hasError && (
                <p className="text-sm text-(--color-error)">
                    {error}
                </p>
            )}

        </div>
    )
}

export default FormField