
import { User } from "@/types/user";
import { Card } from "@/components/ui/card";

interface DebugInfoProps {
  allUsers: User[];
  recommendedAlumni: any[];
  user: User | null;
}

export function DebugInfo({ allUsers, recommendedAlumni, user }: DebugInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Debug Info</h2>
      <Card className="p-4 bg-gray-50 border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <p><strong>Total users:</strong> {allUsers.length}</p>
          <p><strong>Alumni users:</strong> {allUsers.filter(u => u.role === 'alumni').length}</p>
          <p><strong>Recommended alumni:</strong> {recommendedAlumni.length}</p>
          <p><strong>User field:</strong> {user?.field || 'Not set'}</p>
          <p><strong>User skills:</strong> {user?.skills?.join(', ') || 'Not set'}</p>
          <p><strong>User interests:</strong> {user?.interests?.join(', ') || 'Not set'}</p>
          <p><strong>User industry:</strong> {user?.industry || 'Not set'}</p>
          <p><strong>User goals:</strong> {user?.careerGoals || 'Not set'}</p>
        </div>
      </Card>
    </div>
  );
}
