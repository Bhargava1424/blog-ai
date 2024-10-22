'use client';

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from '@/app/components/Layout'

const WORDPRESS_URL = 'http://localhost/wordpress'
const USERNAME = 'admin'
const PASSWORD = 'Hg1z 7PkO 7Th3 uWW6 lgbW P5XS'

const Resources = () => {
  const [formData, setFormData] = useState({
    title: '',
    main_image: null as File | null,
    introduction: '',
    key_words: '',
    tags: '',
    subheadings: [
      { title: '', image: null as File | null, bullet_points: [''] },
      { title: '', image: null as File | null, bullet_points: [''] },
      { title: '', image: null as File | null, bullet_points: [''] },
    ],
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0] || null
    if (index !== undefined) {
      setFormData(prev => ({
        ...prev,
        subheadings: prev.subheadings.map((sh, i) => 
          i === index ? { ...sh, image: file } : sh
        )
      }))
    } else {
      setFormData(prev => ({ ...prev, main_image: file }))
    }
  }

  const handleSubheadingChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      subheadings: prev.subheadings.map((sh, i) => 
        i === index ? { ...sh, [field]: value } : sh
      )
    }))
  }

  const handleBulletPointChange = (subheadingIndex: number, bulletIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      subheadings: prev.subheadings.map((sh, i) => 
        i === subheadingIndex ? {
          ...sh,
          bullet_points: sh.bullet_points.map((bp, j) => j === bulletIndex ? value : bp)
        } : sh
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically upload images and get their URLs
      // Then construct the JSON object to send to WordPress
      const postData = {
        title: formData.title,
        content: JSON.stringify({
          main_image: formData.main_image?.name || '',
          introduction: formData.introduction,
          key_words: formData.key_words.split(',').map(kw => kw.trim()),
          tags: formData.tags.split(',').map(tag => tag.trim()),
          subheadings: formData.subheadings.map(sh => ({
            ...sh,
            image: sh.image?.name || '',
          })),
        }),
        status: 'publish',
      }

      const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error('Failed to post to WordPress')
      }

      alert('Resource successfully posted to WordPress!')
      // Reset form data here
    } catch (error) {
      console.error('Error posting to WordPress:', error)
      alert('Failed to post resource to WordPress. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
        <Card>
          <CardHeader>
            <CardTitle>Add New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter post title"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="main_image">Main Image</Label>
                  <Input 
                    id="main_image" 
                    type="file" 
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="introduction">Introduction</Label>
                  <Textarea 
                    id="introduction" 
                    value={formData.introduction}
                    onChange={handleInputChange}
                    placeholder="Enter introduction"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="key_words">Keywords (comma-separated)</Label>
                  <Input 
                    id="key_words" 
                    value={formData.key_words}
                    onChange={handleInputChange}
                    placeholder="Enter keywords"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags" 
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags"
                  />
                </div>
                
                {formData.subheadings.map((subheading, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Subheading {index + 1}</h3>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={`subheading-title-${index}`}>Subheading Title</Label>
                      <Input 
                        id={`subheading-title-${index}`}
                        value={subheading.title}
                        onChange={(e) => handleSubheadingChange(index, 'title', e.target.value)}
                        placeholder="Enter subheading title"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 mt-2">
                      <Label htmlFor={`subheading-image-${index}`}>Subheading Image</Label>
                      <Input 
                        id={`subheading-image-${index}`}
                        type="file"
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </div>
                    {subheading.bullet_points.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex flex-col space-y-1.5 mt-2">
                        <Label htmlFor={`bullet-point-${index}-${bulletIndex}`}>Bullet Point {bulletIndex + 1}</Label>
                        <Input 
                          id={`bullet-point-${index}-${bulletIndex}`}
                          value={bullet}
                          onChange={(e) => handleBulletPointChange(index, bulletIndex, e.target.value)}
                          placeholder="Enter bullet point"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" type="button" onClick={() => {
                  // Reset form data here
                }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Uploading...' : 'Create Post'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Resources;
