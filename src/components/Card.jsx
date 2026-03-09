import {forwardRef} from "react";

const Card = forwardRef(
    function Card(props, ref) {
        return (
            <div ref={ref} {...props} className="p-5 rounded-xl bg-primary touch-none user-none ">
                {props.children}
            </div>
        );
    }
)


export default Card;