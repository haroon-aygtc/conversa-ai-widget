
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UserManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage users and permissions</CardDescription>
          </div>
          <Button>Add User</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium text-sm">User</th>
                <th className="text-left p-3 font-medium text-sm">Email</th>
                <th className="text-left p-3 font-medium text-sm">Role</th>
                <th className="text-left p-3 font-medium text-sm">Status</th>
                <th className="text-right p-3 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
                { name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
                { name: "Robert Johnson", email: "robert@example.com", role: "Viewer", status: "Invited" },
                { name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
                { name: "Thomas Wilson", email: "thomas@example.com", role: "Viewer", status: "Inactive" },
              ].map((user, i) => (
                <tr key={i}>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <Badge variant={user.role === "Admin" ? "default" : 
                                    user.role === "Editor" ? "secondary" : "outline"}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant={user.status === "Active" ? "success" : 
                                    user.status === "Invited" ? "warning" : "destructive"}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">Edit</Button>
                      <Button size="sm" variant="ghost">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="bg-muted/20 p-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 5 of 20 users</p>
            <div className="flex gap-1">
              <Button size="sm" variant="outline">Previous</Button>
              <Button size="sm" variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
