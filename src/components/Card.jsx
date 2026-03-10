function Card(props) {
    return (
        <div className="p-5 rounded-xl bg-primary" {...props} >
            {props.children}
        </div>
    );
}


export default Card;
