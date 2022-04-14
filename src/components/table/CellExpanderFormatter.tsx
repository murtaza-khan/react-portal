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

  const handleClick = () => {
    onCellExpand(row.id);
  }

  return (
    <div className='cursor-pointer' onClick={handleClick}>
        <span ref={ref} tabIndex={tabIndex}>
          {row.expanded ? '\u25BC' : '\u25B6'}
        </span>
    </div>
  );
}
