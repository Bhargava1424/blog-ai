const express = require('express');
const app = express();
const PORT = 8000;

// Sample data
const blogs = [
  {
    id: "672310ae209dfa9b0c8212f5",
    title: "See how this Chicago recycling plant uses AI and robots to recover aluminum",
    published: "Wed, 30 Oct 2024 08:00:00 GMT",
    link: "https://trellis.net/article/how-ai-and-robots-are-being-deployed-by-a-chicago-recycling-plant-to-boost-aluminum-recovery/",
    image_url: "https://trellis.net/wp-content/uploads/2024/10/EverestLabsAIrobotLRSChicagoOct2024-rotated.jpg",
    summary_result: "The aluminum industry is looking to increase recycling efforts...",
    scrape_result: "<p>Article content here...</p>"
  },
  // Add more blog objects as needed
];

// Middleware to parse JSON
app.use(express.json());

// Route to get a blog by ID
app.get('/article/:id', (req, res) => {
  const { id } = req.params;
  const blog = blogs.find(blog => blog.id === id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
}); 