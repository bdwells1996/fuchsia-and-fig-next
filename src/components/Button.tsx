import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "btn",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "btn-full",
        loading && "btn-loading",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
