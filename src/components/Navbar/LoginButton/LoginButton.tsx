import Button from "@/components/Button";
import React, { FC } from "react";

interface LoginButtonProps {
  className?: string;
  link: string;
}

const LoginButton: FC<LoginButtonProps> = ({ className, link }) => {
  return (
    <Button inverse size="l" className={className} href={link}>
      Přihlásit se
    </Button>
  );
};

export default LoginButton;
