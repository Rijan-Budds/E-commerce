import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCreation = () => {
  const [step, setStep] = useState(1);
  const [post, setPost] = useState({
    title: '',
    photo: null,
    category: '',
    conditions: '',
    description: '',
    price: '',
    negotiable: false
  });
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!post.title.trim()) newErrors.title = 'Title is required';
      if (!post.photo) newErrors.photo = 'Photo is required';
    }
    
    if (currentStep === 2) {
      if (!post.category) newErrors.category = 'Category is required';
      if (!post.conditions) newErrors.conditions = 'Condition is required';
      if (!post.description.trim()) newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear photo error when file is selected
      if (errors.photo) {
        setErrors(prev => ({ ...prev, photo: '' }));
      }
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      const formData = new FormData();
      Object.keys(post).forEach(key => {
        formData.append(key, post[key]);
      });

      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
          navigate('/');
        } else {
          console.error('Error creating post:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  // Check if current step is valid to enable next button
  const isStepValid = () => {
    if (step === 1) {
      return post.title.trim() && post.photo;
    }
    if (step === 2) {
      return post.category && post.conditions && post.description.trim();
    }
    return true;
  };

  return (
    <div className="post-creation">
      <div className="progress-steps">
        Step {step} of 3
      </div>

      {step === 1 && (
        <div className="step">
          <h2>Title and Photo</h2>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
          
          <input
            type="file"
            name="photo"
            onChange={handlePhotoChange}
            accept="image/*"
            required
            className={errors.photo ? 'error' : ''}
          />
          {errors.photo && <span className="error-message">{errors.photo}</span>}
          
          {preview && <img src={preview} alt="Preview" className="preview-image" />}
          
          <button 
            onClick={nextStep} 
            disabled={!isStepValid()}
            className={!isStepValid() ? 'disabled' : ''}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <h2>Details</h2>
          <select
            name="category"
            value={post.category}
            onChange={handleChange}
            required
            className={errors.category ? 'error' : ''}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
          
          <select
            name="conditions"
            value={post.conditions}
            onChange={handleChange}
            required
            className={errors.conditions ? 'error' : ''}
          >
            <option value="">Select Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
          {errors.conditions && <span className="error-message">{errors.conditions}</span>}
          
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
          
          <div className="button-group">
            <button onClick={prevStep}>Back</button>
            <button 
              onClick={nextStep} 
              disabled={!isStepValid()}
              className={!isStepValid() ? 'disabled' : ''}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <h2>Pricing</h2>
          <input
            type="number"
            name="price"
            value={post.price}
            onChange={handleChange}
            placeholder="Price"
            step="0.01"
            required
          />
          <label>
            <input
              type="checkbox"
              name="negotiable"
              checked={post.negotiable}
              onChange={handleChange}
            />
            Price is negotiable
          </label>
          <div className="button-group">
            <button onClick={prevStep}>Back</button>
            <button onClick={handleSubmit}>Submit Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreation;