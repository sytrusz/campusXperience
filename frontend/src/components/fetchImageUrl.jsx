const fetchImageUrl = async (imageUrl) => {
    const token = localStorage.getItem('token');
    
    // Make sure you send the token with the request
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      return response.url; // This will be the correct image URL
    } else {
      throw new Error('Failed to fetch image');
    }
  };
  