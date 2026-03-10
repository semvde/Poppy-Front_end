function Slider({id, leftLabel, rightLabel}) {
    return (
        <div>
            <div className={"flex items-center justify-between gap-2.5 py-1"}>
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
            <input id={id} type={"range"} className={"flex-1 appearance-none bg-outline rounded-full w-full h-2"}/>
        </div>
    );
}

export default Slider;