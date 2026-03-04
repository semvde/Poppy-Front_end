import {Link} from "react-router";

function Button({
                    variant = "primary",
                    size = "md",
                    children,
                    className = "",
                    disabled = false,
                    as = "button",
                    to,
                    "aria-label": ariaLabel,
                    ...props
                }) {
    const baseStyling =
        "inline-flex self-start w-auto items-center text-text justify-center rounded-3xl transition focus:outline-none focus:ring-1 focus:ring-offset-1";


    const sizes = {
        sm: "px-6 py-2 text-sm",
        md: "px-8 py-2.5 text-base",
        lg: "px-10 py-3 text-lg"
    };

    const variants = {
        primary: "bg-primary hover:bg-primary-hover focus:ring-outline disabled:bg-primary/40 disabled:text-text/40 disabled:cursor-not-allowed",
        secondary: "bg-secondary hover:bg-secondary-hover hover:text-body focus:ring-outline disabled:bg-secondary/40 disabled:text-text/40 disabled:cursor-not-allowed",
        outline: "border border-outline hover:bg-primary/50 focus:bg-primary"
    };

    //bepalen welke van de twee nodig is
    const Component = as === "link" ? Link : "button";

    return (
        <Component
            className={`${baseStyling} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
            disabled={Component === "button" ? disabled : undefined}
            aria-disabled={Component === Link && disabled ? true : undefined}
            aria-label={ariaLabel}
            to={Component === Link ? to : undefined}
            {...props}>
            {children}
        </Component>
    );
}

export default Button;