type AdminSectionProps = {
  title: string;
  description: string;
  emptyMessage: string;
};

const AdminSection = ({
  title,
  description,
  emptyMessage,
}: AdminSectionProps) => {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#24231f]">{title}</h1>
        <p className="mt-1 text-sm text-[#6b6258]">{description}</p>
      </header>
      <div className="rounded-sm border border-[#eeeae4] bg-white p-6">
        <p className="text-sm text-[#6b6258]">{emptyMessage}</p>
      </div>
    </section>
  );
};

export default AdminSection;
