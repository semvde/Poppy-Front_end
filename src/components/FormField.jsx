// id, label, type en error erin om de input te krijgen
function FormField({id, label, type = "text", error}) {

    const hasError = Boolean(error)

    return (
        <div className="flex flex-col gap-2.5">

            <label htmlFor={id}>
                {label}
            </label>

            <input
                className={`
          p-5 rounded-xl bg-body-light
          border border-outline
          outline-none transition
          ${hasError ? "border-(--color-error)" : ""}
        `}
                type={type}
                id={id}
                name={id}
                aria-invalid={hasError}
            />

            {hasError && (
                <p className="text-(--color-error)">
                    {error}
                </p>
            )}

        </div>
    )
}

export default FormField