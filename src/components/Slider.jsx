function Slider({leftLabel, rightLabel}) {
    return (
        <>
            <div className={"flex items-center justify-between gap-2.5 py-1"}>
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
            <input type={"range"} className={"flex-1 appearance-none bg-outline rounded-full w-full h-4"}/>
        </>
    );
}

export default Slider;