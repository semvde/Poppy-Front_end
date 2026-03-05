function Toggle({id, label}) {
    return (
        <div className="flex items-center justify-between gap-2.5 py-1">
            <label htmlFor={id}>{label}</label>

            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    id={id}
                    className="sr-only peer"
                />

                <div className="w-11 h-6 bg-outline rounded-full
                                peer-checked:bg-primary
                                peer-focus-visible:ring-2
                                peer-focus-visible:ring-white
                                peer-focus-visible:ring-offset-2
                                ring-offset-background
                                after:content-[''] after:absolute
                                after:top-0.5 after:left-0.5
                                after:bg-white after:border
                                after:rounded-full after:h-5 after:w-5
                                after:transition-all
                                peer-checked:after:translate-x-full">
                </div>
            </label>
        </div>
    );
}

export default Toggle;