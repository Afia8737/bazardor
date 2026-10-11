export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-target py-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-base-content/70">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
