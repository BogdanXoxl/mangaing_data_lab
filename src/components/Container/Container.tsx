type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ className = "", children }: Props) => {
  return <div className={`container mx-auto px-4 ${className}`}>{children}</div>;
};
