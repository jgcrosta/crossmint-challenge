import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export const LoadingButton = ({
  isLoading,
  isDisabled,
  onClick,
  children,
}: {
  isLoading: boolean;
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button disabled={isDisabled} variant="outline" onClick={onClick}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};
