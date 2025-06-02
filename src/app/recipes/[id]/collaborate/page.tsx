"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Users, Mail, Crown, Edit, Trash2, X } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CollaborationPage() {
  const params = useParams()
  const id = params.id as string;
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("")
  const [inviteMessage, setInviteMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - in real app, fetch from database
  const recipe = {
    id: id,
    title: "Buttery Croissants",
    author: {
      name: "Gordon Ramsay",
      avatar: "/images/gordon-ramsay.png",
      id: "user1",
      email: "gordon@example.com",
    },
  }

  const collaborators = [
    {
      id: "user2",
      name: "Vikas Khanna",
      email: "vikas@example.com",
      avatar: "/images/vikas-khanna.png",
      role: "collaborator",
      joinedAt: "2024-01-15",
      status: "active",
    },
    {
      id: "user3",
      name: "Alan Passard",
      email: "alan@example.com",
      avatar: "/images/male-chef.png",
      role: "collaborator",
      joinedAt: "2024-01-20",
      status: "active",
    },
  ]

  const pendingInvitations = [
    {
      email: "chef.marie@example.com",
      invitedAt: "2024-01-25",
      status: "pending",
    },
    {
      email: "baker.john@example.com",
      invitedAt: "2024-01-24",
      status: "pending",
    },
  ]

  const handleSendInvitation = async () => {
    if (!newCollaboratorEmail || !newCollaboratorEmail.includes("@")) {
      alert("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      alert(`Collaboration invitation sent to ${newCollaboratorEmail}!`)
      setNewCollaboratorEmail("")
      setInviteMessage("")
      setIsLoading(false)
    }, 1000)
  }

  const handleRemoveCollaborator = (collaboratorId: string, name: string) => {
    if (confirm(`Remove ${name} from this recipe collaboration?`)) {
      alert(`${name} has been removed from the collaboration`)
    }
  }

  const handleCancelInvitation = (email: string) => {
    if (confirm(`Cancel invitation to ${email}?`)) {
      alert(`Invitation to ${email} has been cancelled`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href={`/recipe/${id}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Collaboration Management</h1>
            <p className="text-sm text-gray-600">{recipe.title}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Recipe Owner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Crown className="h-5 w-5 mr-2 text-orange-500" />
              Recipe Curator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={recipe.author.avatar || "/placeholder.svg"} alt={recipe.author.name} />
                  <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900">{recipe.author.name}</h3>
                  <p className="text-sm text-gray-600">{recipe.author.email}</p>
                  <Badge className="bg-orange-500 text-white mt-1">Original Curator</Badge>
                </div>
              </div>
              <div className="mt-3 p-3 bg-white rounded border-l-4 border-orange-500">
                <p className="text-sm text-gray-700">
                  <strong>Permanent Credit:</strong> As the original curator, you will always be credited for this
                  recipe, regardless of collaborator contributions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Collaborators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Active Collaborators ({collaborators.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {collaborators.length > 0 ? (
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900">{collaborator.name}</h4>
                        <p className="text-sm text-gray-600">{collaborator.email}</p>
                        <p className="text-xs text-gray-500">Joined {collaborator.joinedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="flex items-center">
                        <Edit className="h-3 w-3 mr-1" />
                        Can Edit
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveCollaborator(collaborator.id, collaborator.name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No active collaborators yet</p>
            )}
          </CardContent>
        </Card>

        {/* Invite New Collaborator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Invite New Collaborator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="Enter collaborator's email"
                value={newCollaboratorEmail}
                onChange={(e) => setNewCollaboratorEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Personal Message (Optional)</label>
              <textarea
                placeholder="Add a personal message to your invitation..."
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">What collaborators can do:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Edit ingredients and quantities</li>
                <li>• Modify cooking instructions</li>
                <li>• Add or remove cooking timers</li>
                <li>• Update recipe tags and description</li>
                <li>• View recipe analytics and feedback</li>
              </ul>
            </div>

            <Button
              onClick={handleSendInvitation}
              disabled={!newCollaboratorEmail || isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {isLoading ? "Sending Invitation..." : "Send Collaboration Invitation"}
            </Button>
          </CardContent>
        </Card>

        {/* Pending Invitations */}
        {pendingInvitations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations ({pendingInvitations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingInvitations.map((invitation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                    <div>
                      <p className="font-medium text-gray-900">{invitation.email}</p>
                      <p className="text-sm text-gray-600">Invited on {invitation.invitedAt}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                        Pending
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelInvitation(invitation.email)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Collaboration History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Collaboration Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/images/vikas-khanna.png" alt="Vikas Khanna" />
                  <AvatarFallback>VK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <strong>Vikas Khanna</strong> updated cooking instructions for step 3
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center p-3 border-l-4 border-blue-500 bg-blue-50">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/images/male-chef.png" alt="Alan Passard" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <strong>Alan Passard</strong> adjusted butter quantity for better texture
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>

              <div className="flex items-center p-3 border-l-4 border-orange-500 bg-orange-50">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/images/gordon-ramsay.png" alt="Gordon Ramsay" />
                  <AvatarFallback>GR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <strong>Gordon Ramsay</strong> created this recipe
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
