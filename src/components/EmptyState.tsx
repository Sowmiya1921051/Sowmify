import  { Music } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <Music size={48} />
      <div className="empty-message">{message}</div>
    </div>
  );
};

export default EmptyState;
 