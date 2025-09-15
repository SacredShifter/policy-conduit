import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Eye
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Consultations",
      value: "8",
      description: "Currently in progress",
      icon: FileText,
      color: "consultation-active",
      trend: "+2 this week"
    },
    {
      title: "Total Feedback",
      value: "47",
      description: "Responses received",
      icon: MessageSquare,
      color: "info",
      trend: "+12 this week"
    },
    {
      title: "Consultation Groups",
      value: "5",
      description: "Active groups",
      icon: Users,
      color: "success",
      trend: "Stable"
    },
    {
      title: "Pending Reviews",
      value: "3",
      description: "Ending soon",
      icon: Clock,
      color: "warning",
      trend: "2 end today"
    },
  ];

  const recentConsultations = [
    {
      id: 1,
      title: "Clinical Handover Policy v2.1",
      group: "Clinical Leads",
      status: "active",
      endDate: "2025-09-20",
      responses: 12,
      progress: 75
    },
    {
      id: 2,
      title: "Medication Administration Guidelines",
      group: "Quality Champs",
      status: "review",
      endDate: "2025-09-18",
      responses: 8,
      progress: 60
    },
    {
      id: 3,
      title: "Patient Safety Protocols",
      group: "All Staff",
      status: "active",
      endDate: "2025-09-25",
      responses: 23,
      progress: 45
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "consultation-active";
      case "review": return "consultation-review";
      case "draft": return "consultation-draft";
      case "archived": return "consultation-archived";
      default: return "muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="h-4 w-4" />;
      case "review": return <Eye className="h-4 w-4" />;
      case "draft": return <FileText className="h-4 w-4" />;
      case "archived": return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Kerry. Here's what's happening with your consultations.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-consultation">
          <FileText className="mr-2 h-4 w-4" />
          New Consultation
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-consultation transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 bg-${stat.color}/10`}>
                  <Icon className={`h-4 w-4 text-${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className="mt-2 flex items-center text-xs">
                  <TrendingUp className="mr-1 h-3 w-3 text-success" />
                  <span className="text-success font-medium">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Consultations */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Consultations</span>
              </CardTitle>
              <CardDescription>
                Active and recently updated consultation documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentConsultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(consultation.status)}
                        <h4 className="font-medium text-foreground">
                          {consultation.title}
                        </h4>
                      </div>
                      <Badge 
                        variant="outline"
                        className={`border-${getStatusColor(consultation.status)} text-${getStatusColor(consultation.status)}`}
                      >
                        {consultation.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Group: {consultation.group}</span>
                      <span>•</span>
                      <span>Ends: {consultation.endDate}</span>
                      <span>•</span>
                      <span>{consultation.responses} responses</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Response Progress</span>
                        <span>{consultation.progress}%</span>
                      </div>
                      <Progress value={consultation.progress} className="h-2" />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-4">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common consultation tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Start New Consultation
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Groups
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Review Feedback
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <span>Attention Required</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
                <Clock className="h-4 w-4 text-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">2 consultations ending today</p>
                  <p className="text-xs text-muted-foreground">Review and close before deadline</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-info/10 rounded-lg">
                <MessageSquare className="h-4 w-4 text-info" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New feedback received</p>
                  <p className="text-xs text-muted-foreground">12 responses pending review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;