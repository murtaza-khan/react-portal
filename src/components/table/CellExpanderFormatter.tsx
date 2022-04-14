import { useFocusRef } from "src/hooks/useFocusRef";

interface CellExpanderFormatterProps {
  isCellSelected: boolean;
  row: MasterRow;
  onCellExpand: (row: number) => void;
}

export const CellExpanderFormatter: React.FC<CellExpanderFormatterProps> = ({
  isCellSelected,
  row,
  onCellExpand
}: CellExpanderFormatterProps) => {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCellExpand(row.id);
    }
  }

  const handleClick = () => {
    onCellExpand(row.id);
  }

  return (
    <div>
      <span onClick={handleClick} onKeyDown={handleKeyDown}>
        <span ref={ref} tabIndex={tabIndex}>
          {row.expanded ? '\u25BC' : '\u25B6'}
        </span>
      </span>
    </div>
  );
}
