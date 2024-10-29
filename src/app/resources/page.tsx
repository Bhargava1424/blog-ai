import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from '@/app/components/Layout'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

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

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
        <Tabs defaultValue="manual">
          <TabsList>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="ai-generated">AI Generated</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Create Blog Manually</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Blog Title</Label>
                      <Input id="title" placeholder="Enter blog title" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="content">Blog Content</Label>
                      <Textarea id="content" placeholder="Write your blog content here" rows={10} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input id="keywords" placeholder="Enter keywords (comma-separated)" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Create Blog</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="ai-generated">
            <Card>
              <CardHeader>
                <CardTitle>Generate Blog with AI</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="topic">Blog Topic</Label>
                      <Input id="topic" placeholder="Enter the main topic for your blog" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input id="keywords" placeholder="Enter relevant keywords (comma-separated)" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="tone">Writing Tone</Label>
                      <Input id="tone" placeholder="e.g., Professional, Casual, Humorous" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Generate Blog</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </Layout>
)

export default Resources;