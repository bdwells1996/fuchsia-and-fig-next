import clsx from "clsx";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "outline-dark" | "outline-white" | "outline-sage";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsLink extends BaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {
  href: string;
}

interface ButtonAsButton extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: never;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

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
  "outline-dark": "btn-outline-dark",
  "outline-white": "btn-outline-white",
  "outline-sage": "btn-outline-sage",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "btn",
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && "btn-full",
    loading && "btn-loading",
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { disabled, type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
