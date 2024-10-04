"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Warehouse</CardTitle>
        <CardDescription>
          Fill out the form below to add a new warehouse to your management
          system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Warehouse Name</Label>
              <Input id="name" placeholder="Enter warehouse name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Person</Label>
              <Input id="contact" placeholder="Enter contact name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter warehouse address"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter phone number" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email address"
                type="email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional details"
              rows={3}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto">
          Create Warehouse
        </Button>
      </CardFooter>
    </Card>
  );
}
