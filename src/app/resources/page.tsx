import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from '@/app/components/Layout'

const Resources = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Resource</h1>
      <Card>
      <CardHeader>
        <CardTitle>Add New Resource</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="resource-type">Resource Type</Label>
              <Select>
                <SelectTrigger id="resource-type">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="docs">Google Docs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="resource-url">Resource URL</Label>
              <Input id="resource-url" placeholder="Enter resource URL" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="resource-file">Upload File</Label>
              <Input id="resource-file" type="file" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input id="keywords" placeholder="Enter keywords" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter any additional notes" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Upload Resource</Button>
      </CardFooter>
      </Card>
    </div>
  </Layout>
)

export default Resources;