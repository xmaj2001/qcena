interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export const FormHeader = ({ title, subtitle }: FormHeaderProps) => (
  <div className="text-center space-y-2">
    <h1 className="text-3xl font-bold tracking-tight text-foreground">
      {title}
    </h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);
