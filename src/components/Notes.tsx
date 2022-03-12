import { Textarea } from "@chakra-ui/react";

interface NotesProps {
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Notes = ({
  notes,
  onNotesChange
}: NotesProps) => {
  return (
    <Textarea
      variant={'filled'}
      h={'full'}
      value={notes}
      onChange={onNotesChange}
      placeholder={'type your notes here...'}
    />
  );
};

export default Notes;