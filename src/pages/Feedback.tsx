import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ThumbsUp, 
  ThumbsDown,
  Flag,
  Reply,
  FileText,
  Clock,
  User,
  Quote
} from "lucide-react";

const Feedback = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const feedbackData = [
    {
      id: 1,
      documentTitle: "Clinical Handover Policy v2.1",
      documentId: "doc-001",
      section: "Section 3.2 - Shift Handover Procedures",
      feedback: "The current procedure doesn't account for emergency situations where normal handover protocols may need to be expedited. I suggest adding a subsection covering emergency handover procedures.",
      submittedBy: "Dr. Sarah Mitchell",
      role: "Head of Medicine",
      timestamp: "2025-09-15 14:30",
      status: "pending",
      priority: "high",
      helpful: 8,
      category: "suggestion",
      initials: "SM"
    },
    {
      id: 2,
      documentTitle: "Clinical Handover Policy v2.1",
      documentId: "doc-001",
      section: "Section 2.1 - Documentation Requirements",
      feedback: "Excellent comprehensive coverage of documentation requirements. The checklist format makes it very practical for daily use. No changes needed for this section.",
      submittedBy: "Lisa Thompson",
      role: "Nursing Director",
      timestamp: "2025-09-15 11:15",
      status: "reviewed",
      priority: "low",
      helpful: 12,
      category: "positive",
      initials: "LT"
    },
    {
      id: 3,
      documentTitle: "Patient Safety Protocols",
      documentId: "doc-003",
      section: "General Comments",
      feedback: "The terminology used in several sections is unclear and could lead to confusion in high-pressure situations. Recommend simplifying language throughout.",
      submittedBy: "Mark Davies",
      role: "Quality Manager",
      timestamp: "2025-09-15 09:45",
      status: "pending",
      priority: "medium",
      helpful: 5,
      category: "concern",
      initials: "MD"
    },
    {
      id: 4,
      documentTitle: "Medication Administration Guidelines",
      documentId: "doc-002",
      section: "Section 4.3 - Double-checking Procedures",
      feedback: "This section aligns well with current best practices. The step-by-step approach will help reduce medication errors significantly.",
      submittedBy: "Jenny Martinez",
      role: "Charge Nurse",
      timestamp: "2025-09-14 16:20",
      status: "reviewed",
      priority: "low",
      helpful: 15,
      category: "positive",
      initials: "JM"
    },
    {
      id: 5,
      documentTitle: "Patient Safety Protocols",
      documentId: "doc-003",
      section: "Section 1.4 - Incident Reporting",
      feedback: "The reporting timeline of 24 hours may be too restrictive for complex incidents that require investigation. Consider extending to 48 hours for certain incident types.",
      submittedBy: "Dr. James Wilson",
      role: "Chief Medical Officer",
      timestamp: "2025-09-14 13:30",
      status: "under-review",
      priority: "high",
      helpful: 9,
      category: "suggestion",
      initials: "JW"
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "positive": return "success";
      case "suggestion": return "info";
      case "concern": return "warning";
      case "critical": return "destructive";
      default: return "muted";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "positive": return <ThumbsUp className="h-4 w-4" />;
      case "suggestion": return <MessageSquare className="h-4 w-4" />;
      case "concern": return <Flag className="h-4 w-4" />;
      case "critical": return <Flag className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "warning";
      case "reviewed": return "success";
      case "under-review": return "info";
      case "dismissed": return "muted";
      default: return "muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "muted";
    }
  };

  const filterFeedback = (status?: string) => {
    let filtered = feedbackData;
    
    if (status) {
      filtered = filtered.filter(f => f.status === status);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.section.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const FeedbackCard = ({ feedback }: { feedback: any }) => (
    <Card className="shadow-card hover:shadow-consultation transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <CardTitle className="text-lg">{feedback.documentTitle}</CardTitle>
              <Badge 
                variant="outline"
                className={`border-${getCategoryColor(feedback.category)} text-${getCategoryColor(feedback.category)}`}
              >
                <span className="flex items-center space-x-1">
                  {getCategoryIcon(feedback.category)}
                  <span>{feedback.category}</span>
                </span>
              </Badge>
              <Badge variant={getStatusColor(feedback.status) as any}>
                {feedback.status}
              </Badge>
              <Badge variant={getPriorityColor(feedback.priority) as any}>
                {feedback.priority}
              </Badge>
            </div>
            {feedback.section && (
              <CardDescription className="mt-2 flex items-center">
                <Quote className="h-3 w-3 mr-1" />
                {feedback.section}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Feedback Content */}
          <div className="bg-accent/30 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-foreground leading-relaxed">{feedback.feedback}</p>
          </div>

          {/* Feedback Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {feedback.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{feedback.submittedBy}</p>
                <p className="text-xs text-muted-foreground">{feedback.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{feedback.timestamp}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <ThumbsUp className="h-3 w-3" />
                <span>{feedback.helpful} found helpful</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Document
              </Button>
            </div>
            {feedback.status === "pending" && (
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  Mark Reviewed
                </Button>
                <Button size="sm" className="bg-gradient-primary">
                  Address
                </Button>
              </div>
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Consultation Feedback</h1>
          <p className="text-muted-foreground">
            Review and manage feedback received from consultation participants.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-consultation">
          <MessageSquare className="mr-2 h-4 w-4" />
          Feedback Report
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
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

      {/* Feedback Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{feedbackData.length}</p>
              <p className="text-sm text-muted-foreground">Total Feedback</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{filterFeedback("pending").length}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-info">{filterFeedback("under-review").length}</p>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{filterFeedback("reviewed").length}</p>
              <p className="text-sm text-muted-foreground">Reviewed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Feedback ({feedbackData.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterFeedback("pending").length})</TabsTrigger>
          <TabsTrigger value="under-review">Under Review ({filterFeedback("under-review").length})</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed ({filterFeedback("reviewed").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filterFeedback().map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          {filterFeedback("pending").map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </TabsContent>

        <TabsContent value="under-review" className="space-y-6">
          {filterFeedback("under-review").map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-6">
          {filterFeedback("reviewed").map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Feedback;