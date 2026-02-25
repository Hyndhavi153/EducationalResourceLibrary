export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'textbook' | 'research_paper' | 'study_guide' | 'other';
  author: string;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
  fileSize: number;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  feedback: Feedback[];
}

export interface Feedback {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock data storage
const initializeMockData = () => {
  if (!localStorage.getItem('resources')) {
    const mockResources: Resource[] = [
      {
        id: '1',
        title: 'Introduction to Computer Science',
        description: 'Comprehensive guide to CS fundamentals',
        type: 'textbook',
        author: 'John Smith',
        uploadedBy: 'admin',
        uploadedAt: '2024-01-15',
        fileUrl: '/files/cs-intro.pdf',
        fileSize: 5242880,
        category: 'Computer Science',
        tags: ['CS', 'fundamentals', 'algorithms'],
        downloads: 120,
        rating: 4.5,
        feedback: []
      },
      {
        id: '2',
        title: 'Advanced React Patterns',
        description: 'Deep dive into modern React development',
        type: 'study_guide',
        author: 'Jane Doe',
        uploadedBy: 'admin',
        uploadedAt: '2024-01-20',
        fileUrl: '/files/react-patterns.pdf',
        fileSize: 3145728,
        category: 'Web Development',
        tags: ['React', 'patterns', 'JavaScript'],
        downloads: 85,
        rating: 4.8,
        feedback: []
      },
      {
        id: '3',
        title: 'Machine Learning Fundamentals',
        description: 'Complete guide to ML concepts and applications',
        type: 'research_paper',
        author: 'Dr. Alice Johnson',
        uploadedBy: 'admin',
        uploadedAt: '2024-02-01',
        fileUrl: '/files/ml-fundamentals.pdf',
        fileSize: 7340032,
        category: 'Machine Learning',
        tags: ['ML', 'AI', 'neural networks'],
        downloads: 150,
        rating: 4.7,
        feedback: []
      }
    ];
    localStorage.setItem('resources', JSON.stringify(mockResources));
  }
};

// Initialize mock data on app start
initializeMockData();

// Mock API service
export const api = {
  // Resources
  getResources: async (search?: string, category?: string) => {
    const resources: Resource[] = JSON.parse(localStorage.getItem('resources') || '[]');
    let filtered = resources;

    if (search) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (category) {
      filtered = filtered.filter(r => r.category === category);
    }

    return Promise.resolve(filtered);
  },

  getResourceById: async (id: string) => {
    const resources: Resource[] = JSON.parse(localStorage.getItem('resources') || '[]');
    return Promise.resolve(resources.find(r => r.id === id));
  },

  uploadResource: async (formData: FormData) => {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as Resource['type'];
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const tags = (formData.get('tags') as string).split(',').map(t => t.trim());

    const newResource: Resource = {
      id: Date.now().toString(),
      title,
      description,
      type,
      author,
      uploadedBy: JSON.parse(localStorage.getItem('currentUser') || '{}').username,
      uploadedAt: new Date().toISOString().split('T')[0],
      fileUrl: `/files/${Date.now()}-file.pdf`,
      fileSize: Math.floor(Math.random() * 10000000) + 1000000,
      category,
      tags,
      downloads: 0,
      rating: 0,
      feedback: []
    };

    const resources: Resource[] = JSON.parse(localStorage.getItem('resources') || '[]');
    resources.push(newResource);
    localStorage.setItem('resources', JSON.stringify(resources));

    return Promise.resolve(newResource);
  },

  deleteResource: async (id: string) => {
    const resources: Resource[] = JSON.parse(localStorage.getItem('resources') || '[]');
    const filtered = resources.filter(r => r.id !== id);
    localStorage.setItem('resources', JSON.stringify(filtered));
    return Promise.resolve({ success: true });
  },

  // Download
  downloadResource: async (id: string) => {
    const resources: Resource[] = JSON.parse(localStorage.getItem('resources') || '[]');
    const resource = resources.find(r => r.id === id);
    if (resource) {
      resource.downloads += 1;
      localStorage.setItem('resources', JSON.stringify(resources));
    }
    return Promise.resolve({ fileUrl: resource?.fileUrl });
  },

  // Feedback
  addFeedback: async (resourceId: string, rating: number, comment: string) => {
    const resources: Resource[] = JSON.parse(localStorage.getItem('resources') || '[]');
    const resource = resources.find(r => r.id === resourceId);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (resource) {
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        userId: currentUser.id,
        username: currentUser.username,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      };
      resource.feedback.push(newFeedback);
      // Update rating
      const avgRating = resource.feedback.reduce((sum, f) => sum + f.rating, 0) / resource.feedback.length;
      resource.rating = Math.round(avgRating * 10) / 10;
      localStorage.setItem('resources', JSON.stringify(resources));
      return Promise.resolve(newFeedback);
    }
    throw new Error('Resource not found');
  },

  getCategories: async () => {
    const resources: Resource[] = JSON.parse(localStorage.getItem('resources') || '[]');
    const categories = [...new Set(resources.map(r => r.category))];
    return Promise.resolve(categories);
  }
};
