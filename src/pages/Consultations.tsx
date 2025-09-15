import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Search, 
  Eye, 
  MessageSquare, 
  Calendar, 
  Users, 
  Download,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const Consultations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const consultations = [
    {
      id: 1,
      title: "Clinical Handover Policy v2.1",
      description: "Updated procedures for patient handover between shifts and departments",
      group: "Clinical Leads",
      status: "active",
      startDate: "2025-09-01",
      endDate: "2025-09-20",
      responses: 12,
      targetResponses: 16,
      progress: 75,
      priority: "high",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      title: "Medication Administration Guidelines",
      description: "Comprehensive guide for safe medication administration practices",
      group: "Quality Champs",
      status: "review",
      startDate: "2025-08-25",
      endDate: "2025-09-18",
      responses: 8,
      targetResponses: 10,
      progress: 80,
      priority: "medium",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      title: "Patient Safety Protocols",
      description: "Essential safety measures and incident reporting procedures",
      group: "All Staff",
      status: "active",
      startDate: "2025-09-05",
      endDate: "2025-09-25",
      responses: 23,
      targetResponses: 50,
      progress: 46,
      priority: "high",
      lastActivity: "30 minutes ago"
    },
    {
      id: 4,
      title: "Infection Control Procedures",
      description: "Updated infection prevention and control measures",
      group: "All Nursing",
      status: "draft",
      startDate: "2025-09-10",
      endDate: "2025-09-30",
      responses: 0,
      targetResponses: 45,
      progress: 0,
      priority: "low",
      lastActivity: "Not started"
    },
    {
      id: 5,
      title: "Emergency Response Protocol",
      description: "Code blue and emergency situation response procedures",
      group: "Medical Staff",
      status: "archived",
      startDate: "2025-08-01",
      endDate: "2025-08-15",
      responses: 23,
      targetResponses: 23,
      progress: 100,
      priority: "medium",
      lastActivity: "Completed"
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
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "muted";
      default: return "muted";
    }
  };

  const filterConsultations = (status?: string) => {
    let filtered = consultations;
    
    if (status) {
      filtered = filtered.filter(c => c.status === status);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.group.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const ConsultationCard = ({ consultation }: { consultation: any }) => (
    <Card className="shadow-card hover:shadow-consultation transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <CardTitle className="text-lg">{consultation.title}</CardTitle>
              <Badge 
                variant="outline"
                className={`border-${getStatusColor(consultation.status)} text-${getStatusColor(consultation.status)}`}
              >
                <span className="flex items-center space-x-1">
                  {getStatusIcon(consultation.status)}
                  <span>{consultation.status}</span>
                </span>
              </Badge>
              <Badge variant={getPriorityColor(consultation.priority) as any}>
                {consultation.priority} priority
              </Badge>
            </div>
            <CardDescription className="mt-2">
              {consultation.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Consultation Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Group</p>
              <p className="font-medium flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {consultation.group}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Period</p>
              <p className="font-medium flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {consultation.startDate} - {consultation.endDate}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Responses</p>
              <p className="font-medium flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {consultation.responses}/{consultation.targetResponses}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Activity</p>
              <p className="font-medium">{consultation.lastActivity}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Response Progress</span>
              <span className="font-medium">{consultation.progress}%</span>
            </div>
            <Progress value={consultation.progress} className="h-2" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Feedback
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            {consultation.status === "active" && (
              <Button size="sm" className="bg-gradient-primary">
                Manage
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Active Consultations</h1>
          <p className="text-muted-foreground">
            Manage and monitor all consultation processes across your organization.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-consultation">
          <FileText className="mr-2 h-4 w-4" />
          New Consultation
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search consultations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Consultation Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({consultations.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({filterConsultations("active").length})</TabsTrigger>
          <TabsTrigger value="review">Review ({filterConsultations("review").length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({filterConsultations("draft").length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({filterConsultations("archived").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filterConsultations().map((consultation) => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          {filterConsultations("active").map((consultation) => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          {filterConsultations("review").map((consultation) => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </TabsContent>

        <TabsContent value="draft" className="space-y-6">
          {filterConsultations("draft").map((consultation) => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </TabsContent>

        <TabsContent value="archived" className="space-y-6">
          {filterConsultations("archived").map((consultation) => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Consultations;