import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Search, 
  Settings, 
  Mail, 
  Shield, 
  Edit,
  Trash2,
  UserPlus
} from "lucide-react";

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const groups = [
    {
      id: "clinical-leads",
      name: "Clinical Leads",
      description: "Senior clinical staff responsible for policy oversight and strategic decisions",
      members: 12,
      activeConsultations: 3,
      accessLevel: "full",
      lastActivity: "2 hours ago",
      memberList: [
        { name: "Kerry Elevsen", role: "Clinical Director", email: "k.elevsen@health.gov", initials: "KE" },
        { name: "Dr. Sarah Mitchell", role: "Head of Medicine", email: "s.mitchell@health.gov", initials: "SM" },
        { name: "Dr. James Wilson", role: "Chief Medical Officer", email: "j.wilson@health.gov", initials: "JW" },
        { name: "Lisa Thompson", role: "Nursing Director", email: "l.thompson@health.gov", initials: "LT" },
      ]
    },
    {
      id: "quality-champs",
      name: "Quality Champs",
      description: "Quality improvement leaders from various departments",
      members: 8,
      activeConsultations: 2,
      accessLevel: "standard",
      lastActivity: "1 day ago",
      memberList: [
        { name: "Mark Davies", role: "Quality Manager", email: "m.davies@health.gov", initials: "MD" },
        { name: "Anna Chen", role: "Clinical Auditor", email: "a.chen@health.gov", initials: "AC" },
        { name: "Robert Taylor", role: "Quality Coordinator", email: "r.taylor@health.gov", initials: "RT" },
      ]
    },
    {
      id: "all-nursing",
      name: "All Nursing Staff",
      description: "Complete nursing team across all departments and shifts",
      members: 45,
      activeConsultations: 1,
      accessLevel: "standard",
      lastActivity: "30 minutes ago",
      memberList: [
        { name: "Lisa Thompson", role: "Nursing Director", email: "l.thompson@health.gov", initials: "LT" },
        { name: "Jenny Martinez", role: "Charge Nurse", email: "j.martinez@health.gov", initials: "JM" },
        { name: "David Brown", role: "Staff Nurse", email: "d.brown@health.gov", initials: "DB" },
        { name: "Emma Wilson", role: "Clinical Nurse", email: "e.wilson@health.gov", initials: "EW" },
      ]
    },
    {
      id: "medical-staff",
      name: "Medical Staff",
      description: "Doctors, residents, and medical specialists",
      members: 23,
      activeConsultations: 1,
      accessLevel: "standard",
      lastActivity: "4 hours ago",
      memberList: [
        { name: "Dr. Sarah Mitchell", role: "Head of Medicine", email: "s.mitchell@health.gov", initials: "SM" },
        { name: "Dr. James Wilson", role: "Chief Medical Officer", email: "j.wilson@health.gov", initials: "JW" },
        { name: "Dr. Michael Adams", role: "Cardiologist", email: "m.adams@health.gov", initials: "MA" },
      ]
    },
    {
      id: "all-staff",
      name: "All Staff",
      description: "Organization-wide distribution for major policy announcements",
      members: 150,
      activeConsultations: 1,
      accessLevel: "read-only",
      lastActivity: "6 hours ago",
      memberList: [
        { name: "Various", role: "All Departments", email: "Multiple contacts", initials: "AS" },
      ]
    },
  ];

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "full": return "consultation-active";
      case "standard": return "info";
      case "read-only": return "muted";
      default: return "muted";
    }
  };

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case "full": return <Shield className="h-4 w-4" />;
      case "standard": return <Users className="h-4 w-4" />;
      case "read-only": return <Mail className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Consultation Groups</h1>
          <p className="text-muted-foreground">
            Manage groups and member access for consultation processes.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-consultation">
          <Plus className="mr-2 h-4 w-4" />
          New Group
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="shadow-card hover:shadow-consultation transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{group.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {group.description}
                  </CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Group Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Members</p>
                    <p className="text-2xl font-bold text-foreground">{group.members}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active Consultations</p>
                    <p className="text-2xl font-bold text-consultation-active">{group.activeConsultations}</p>
                  </div>
                </div>

                {/* Access Level */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline"
                      className={`border-${getAccessLevelColor(group.accessLevel)} text-${getAccessLevelColor(group.accessLevel)}`}
                    >
                      <span className="flex items-center space-x-1">
                        {getAccessLevelIcon(group.accessLevel)}
                        <span>{group.accessLevel}</span>
                      </span>
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{group.lastActivity}</span>
                </div>

                {/* Member Avatars */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Recent Members</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {group.memberList.slice(0, 4).map((member, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-background">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members > 4 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs text-muted-foreground">
                          +{group.members - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Group Management Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Group Management</CardTitle>
          <CardDescription>
            Quickly perform common group management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <UserPlus className="h-6 w-6" />
              <span>Bulk Add Members</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Mail className="h-6 w-6" />
              <span>Send Announcement</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Settings className="h-6 w-6" />
              <span>Group Settings</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Shield className="h-6 w-6" />
              <span>Permissions</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Groups;