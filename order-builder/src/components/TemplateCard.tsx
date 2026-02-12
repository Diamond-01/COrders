interface TemplateCardProps {
  template: any;
  isSelected: boolean;
  onClick: () => void;
}

export default function TemplateCard({
  template,
  isSelected,
  onClick,
}: TemplateCardProps) {
  return (
    <div
      onClick={onClick}
      className={`template-card ${isSelected ? 'selected' : ''}`}
    >
      <div className="template-card__image">
        📄
      </div>

      <div className="template-card__title">
        {template.title}
      </div>
    </div>
  );
}
