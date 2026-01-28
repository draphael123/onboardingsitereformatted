"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  Search, 
  Mail, 
  Building2,
  UserCheck,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

// Staff directory data from CSV
const staffData = [
  { name: "Alexis Foster-Horton", email: "alexis.foster-horton@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Ashley Escoe", email: "ashley.escoe@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Ashley Grout", email: "ashley.grout@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Ashley Gwinn", email: "ashley@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Bill Carbonneau", email: "bill@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Brittany Alexander", email: "brittany.alexander@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Brittany Toliver", email: "brittany.toliver@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Brooklyn Kimble", email: "brooklyn.kimble@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Bryana Anderson", email: "bryana@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Bryce Amos", email: "bryce@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Bryce Hanley", email: "bryce.hanley@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Camryn Burden", email: "camryn@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Catherine Herrington", email: "catherine@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Daniel Fis", email: "daniel.fis@fountain.net", teamType: "Clinical", supervisor: "Camryn Burden" },
  { name: "Daniel Raphael", email: "daniel@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Danielle Board", email: "danielle.board@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Deanna Maher", email: "deanna.maher@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Doron Stember", email: "doron@fountain.net", teamType: "Other", supervisor: "n/a" },
  { name: "Emily Glover", email: "emily.glover@fountain.net", teamType: "Clinical", supervisor: "Taya Cooley" },
  { name: "Faith Danielson", email: "faith@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden, Jessica Booker" },
  { name: "Heather Conrad", email: "heather@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Hillary Morgan", email: "hilary@fountain.net", teamType: "Clinical", supervisor: "Camryn Burden" },
  { name: "Jacquelyn Sexton", email: "jacquelyn.sexton@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Jessica Booker", email: "jessica@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Kaycee Ammons", email: "kaycee.ammons@fountain.net", teamType: "Clinical", supervisor: "Jessica Booker" },
  { name: "Kelbie Tyree", email: "kelbie.tyree@fountain.net", teamType: "Clinical", supervisor: "Taya Cooley" },
  { name: "Lauren Dovin", email: "lauren.godbold@fountain.net", teamType: "Clinical", supervisor: "Camryn Burden" },
  { name: "Lindsay Burden", email: "lindsay@fountain.net", teamType: "Clinical", supervisor: "Doron Stember" },
  { name: "Liz Gloor", email: "liz@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Mackinzie Johnson", email: "mackinzie@fountain.net", teamType: "Clinical", supervisor: "Camryn Burden" },
  { name: "Martin Van Dongen", email: "martin@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Megan Ryan-Riffle", email: "megan.ryan-riffle@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Melissa Villanueva", email: "melissa@fountain.net", teamType: "Clinical", supervisor: "Taya Cooley" },
  { name: "Michele Foster", email: "michele.foster@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Nicole Tormos-Colon", email: "nicole@fountain.net", teamType: "Clinical", supervisor: "Taya Cooley" },
  { name: "Priya Chaudhari", email: "priya@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Rachel Razi", email: "rachel.razi@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Sarah Schwartz", email: "sarah.schwartz@fountain.net", teamType: "Clinical", supervisor: "Taya Cooley" },
  { name: "Shelby Bailey", email: "shelby.bailey@fountain.net", teamType: "Clinical", supervisor: "Camryn Burden" },
  { name: "Skye Sauls", email: "skye.sauls@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Stefanie Vasquez", email: "stefanie.vasquez@fountain.net", teamType: "Clinical", supervisor: "Jessica Booker" },
  { name: "Summer Denny", email: "summer@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Tammy Anderson", email: "tammy@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Tammy Hale", email: "tammy.hale@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden, Daniel Raphael" },
  { name: "Taya Cooley", email: "taya@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Terray Humphrey", email: "terray@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Tiffany Perez", email: "tiffany@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Timothy Mack", email: "Tim@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Tsvi Doron", email: "tzvi@fountain.net", teamType: "Clinical", supervisor: "Doron Stember" },
  { name: "Victor Lopez", email: "victor@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Vivien Lee", email: "vivien@fountain.net", teamType: "Clinical", supervisor: "Lindsay Burden" },
  { name: "Yadissa Cornejo", email: "yadissa@fountain.net", teamType: "Clinical", supervisor: "Taya Cooley" },
  { name: "Alex Simon", email: "Alex.simon@fountain.net", teamType: "Marketing", supervisor: "Dan Morris" },
  { name: "Aryia Emrani", email: "aryia@fountain.net", teamType: "Marketing", supervisor: "Dan Morris" },
  { name: "Brandon Shrair", email: "brandon@fountaintrt.com", teamType: "Other", supervisor: "n/a" },
  { name: "Christen Vanderbilt", email: "Chirsten.Vanderbilt@fountain.net", teamType: "Marketing", supervisor: "Dan Morris" },
  { name: "Dan Morris", email: "dan@fountain.net", teamType: "Other", supervisor: "Lindsay Burden" },
  { name: "Filip Piatkowski", email: "filip@fountaintrt.com", teamType: "Marketing", supervisor: "Dan Morris" },
  { name: "Jerome Francisco", email: "jerome.francisco@fountain.net", teamType: "Marketing", supervisor: "Aryia Emrani" },
  { name: "Jesse Aultman", email: "jesse.aultman@fountain.net", teamType: "Marketing", supervisor: "Dan Morris" },
  { name: "Rey", email: "Rey@fountain.net", teamType: "Marketing", supervisor: "Aryia Emrani" },
  { name: "TJ Bragas", email: "tj@fountain.net", teamType: "Other", supervisor: "Dan Morris" },
  { name: "Vanessa Melendes", email: "vanessa@fountain.net", teamType: "Marketing", supervisor: "Aryia Emrani" },
  { name: "Rob Pieta", email: "Rob@fountain.net", teamType: "Other", supervisor: "Doron Stember, Brandon Shrair" },
  { name: "Sonya Trachsel", email: "Sonya@fountain.net", teamType: "Marketing", supervisor: "Dan Morris" },
  { name: "Samy Jarrar", email: "samy@fountain.net", teamType: "Clinical", supervisor: "Jessica Booker" },
  { name: "Hanie Jarrar", email: "Hanie@fountain.net", teamType: "Clinical", supervisor: "Jessica Booker" },
  { name: "Jona Zimora", email: "jona@fountain.net", teamType: "Clinical", supervisor: "Daniel Raphael, Jessica Booker" },
  { name: "Pierre Bragas", email: "pierre@fountain.net", teamType: "Clinical", supervisor: "Jessica Booker, Daniel Raphael" },
  { name: "Paula Bragas", email: "paula@fountain.net", teamType: "Marketing", supervisor: "Aryia Emrani" },
  { name: "Cel Carzon", email: "Cel@fountain.net", teamType: "Clinical", supervisor: "Jessica Booker" },
  { name: "David Raphael", email: "david@flatiron.co", teamType: "Other", supervisor: "n/a" },
  { name: "Ryan Faber", email: "ryan@flatiron.co", teamType: "Other", supervisor: "n/a" },
]

const teamTypeColors: Record<string, string> = {
  Clinical: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Marketing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Other: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
}

export default function StaffDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeamType, setSelectedTeamType] = useState<string>("All")
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>("All")

  // Get unique team types and supervisors
  const teamTypes = useMemo(() => {
    const types = new Set(staffData.map((staff) => staff.teamType))
    return ["All", ...Array.from(types).sort()]
  }, [])

  const supervisors = useMemo(() => {
    const sups = new Set(
      staffData
        .flatMap((staff) => staff.supervisor.split(", ").map((s) => s.trim()))
        .filter((s) => s !== "n/a")
    )
    return ["All", ...Array.from(sups).sort()]
  }, [])

  // Filter staff based on search and filters
  const filteredStaff = useMemo(() => {
    return staffData.filter((staff) => {
      const matchesSearch =
        searchQuery === "" ||
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.supervisor.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTeamType =
        selectedTeamType === "All" || staff.teamType === selectedTeamType

      const matchesSupervisor =
        selectedSupervisor === "All" ||
        staff.supervisor.split(", ").some((sup) => sup.trim() === selectedSupervisor)

      return matchesSearch && matchesTeamType && matchesSupervisor
    })
  }, [searchQuery, selectedTeamType, selectedSupervisor])

  // Get stats
  const stats = useMemo(() => {
    const byTeam = staffData.reduce((acc, staff) => {
      acc[staff.teamType] = (acc[staff.teamType] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      total: staffData.length,
      byTeam,
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Staff <span className="text-primary">Directory</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Find team members, their contact information, and organizational structure.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Staff</div>
              </div>
              {Object.entries(stats.byTeam).map(([team, count]) => (
                <div key={team} className="text-center">
                  <div className="text-3xl font-bold text-primary">{count}</div>
                  <div className="text-sm text-muted-foreground">{team}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or supervisor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <Select value={selectedTeamType} onValueChange={setSelectedTeamType}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Building2 className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Team Type" />
                </SelectTrigger>
                <SelectContent>
                  {teamTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <UserCheck className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Supervisor" />
                </SelectTrigger>
                <SelectContent>
                  {supervisors.map((supervisor) => (
                    <SelectItem key={supervisor} value={supervisor}>
                      {supervisor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(selectedTeamType !== "All" || selectedSupervisor !== "All" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedTeamType("All")
                    setSelectedSupervisor("All")
                    setSearchQuery("")
                  }}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredStaff.length} of {staffData.length} staff members
            </p>
          </div>
        </div>
      </section>

      {/* Staff Directory */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {filteredStaff.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No staff members found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStaff.map((staff, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1 truncate">
                            {staff.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={cn("text-xs", teamTypeColors[staff.teamType])}
                          >
                            {staff.teamType}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <a
                            href={`mailto:${staff.email}`}
                            className="text-primary hover:underline truncate"
                          >
                            {staff.email}
                          </a>
                        </div>

                        {staff.supervisor !== "n/a" && (
                          <div className="flex items-start gap-2 text-sm">
                            <UserCheck className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Supervisor: </span>
                              <span className="text-foreground">{staff.supervisor}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

