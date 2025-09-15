import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, FileText, Upload, Users, Send } from "lucide-react";
import { format } from "date-fns";

const StartConsultation = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [consultationGroup, setConsultationGroup] = useState("");
  const [summary, setSummary] = useState("");
  const { toast } = useToast();

  const consultationGroups = [
    { id: "clinical-leads", name: "Clinical Leads", members: 12 },
    { id: "quality-champs", name: "Quality Champs", members: 8 },
    { id: "all-nursing", name: "All Nursing Staff", members: 45 },
    { id: "medical-staff", name: "Medical Staff", members: 23 },
    { id: "all-staff", name: "All Staff", members: 150 },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !startDate || !endDate || !consultationGroup) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before starting the consultation.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Consultation Started",
      description: `Consultation for "${selectedFile.name}" has been initiated successfully. Notifications sent to ${consultationGroups.find(g => g.id === consultationGroup)?.name}.`,
    });

    // Reset form
    setSelectedFile(null);
    setStartDate(undefined);
    setEndDate(undefined);
    setConsultationGroup("");
    setSummary("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Start New Consultation</h1>
        <p className="text-muted-foreground">
          Upload a policy document and configure consultation parameters to begin the review process.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Consultation Configuration</span>
              </CardTitle>
              <CardDescription>
                Set up your consultation parameters and upload the document to be reviewed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Policy Document *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <p className="text-sm font-medium text-foreground">
                          {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Consultation Group */}
                <div className="space-y-2">
                  <Label htmlFor="consultation-group">Consultation Group *</Label>
                  <Select value={consultationGroup} onValueChange={setConsultationGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a consultation group" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      {consultationGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{group.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {group.members} members
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover border border-border" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover border border-border" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Summary/Comments */}
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary & Instructions (Optional)</Label>
                  <Textarea
                    id="summary"
                    placeholder="Provide context about this consultation, specific areas to focus on, or any special instructions for reviewers..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-consultation"
                  size="lg"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Start Consultation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Selected Group</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {consultationGroup ? (
                <div className="space-y-3">
                  <div className="p-3 bg-accent rounded-lg">
                    <h4 className="font-medium text-foreground">
                      {consultationGroups.find(g => g.id === consultationGroup)?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {consultationGroups.find(g => g.id === consultationGroup)?.members} members will be notified
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Automatic email notifications will be sent</p>
                    <p>• Members can provide structured feedback</p>
                    <p>• Progress tracking will be enabled</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a consultation group to see member details and notification settings.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Consultation Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium">Document Upload</p>
                  <p className="text-xs text-muted-foreground">Upload and configure consultation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium">Notifications Sent</p>
                  <p className="text-xs text-muted-foreground">Group members receive email alerts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium">Feedback Collection</p>
                  <p className="text-xs text-muted-foreground">Structured feedback is collected</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
                  4
                </div>
                <div>
                  <p className="text-sm font-medium">Automatic Closure</p>
                  <p className="text-xs text-muted-foreground">Process closes at end date</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartConsultation;