import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: "_blank";
  className?: string;
  isIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  target,
  className,
  isIcon,
  ...props
}) => {
  if (href) {
    return (
      <Link href={href} target={target ?? undefined}>
        <button
          {...props}
          className={twMerge("button", className, isIcon && "icon")}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={twMerge("button", className, isIcon && "icon")}
    >
      {children}
    </button>
  );
};
