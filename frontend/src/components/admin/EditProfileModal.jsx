import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { updateUserProfile } from '../../api/api';

const EditProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useAuth();
    const { portfolio, updatePortfolio } = usePortfolio();
    const [formData, setFormData] = useState({
        firstName: '',
        middleInitial: '',
        lastName: '',
        username: '',
        email: '',
        bio: '',
        location: '',
        skills: [],
        social: { github: '', facebook: '', indeed: '' },
        profileImage: '',
    });
    const [skillsInput, setSkillsInput] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileInputRef = React.useRef(null);

    useEffect(() => {
        if (portfolio) {
            setFormData({
                firstName: portfolio.firstName || '',
                middleInitial: portfolio.middleInitial || '',
                lastName: portfolio.lastName || '',
                username: portfolio.username || '',
                email: portfolio.email || '',
                bio: portfolio.bio || '',
                location: portfolio.location || '',
                skills: portfolio.skills || [],
                social: portfolio.social || { github: '', facebook: '', indeed: '' },
                profileImage: portfolio.profileImage || '',
            });
            setSkillsInput((portfolio.skills || []).join(', '));
            setPreviewUrl(portfolio.profileImage || '');
        }
    }, [portfolio]);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('social.')) {
            const socialKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                social: { ...prev.social, [socialKey]: value },
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSkillsInputChange = (e) => {
        setSkillsInput(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Image must be less than 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                setPreviewUrl(base64);
                setFormData(prev => ({ ...prev, profileImage: base64 }));
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
        const payload = { ...formData, skills: skillsArray };

        try {
            const updatedUser = await updateUserProfile(payload);
            updatePortfolio(updatedUser);
            if (user) {
                updateUser(updatedUser);
            }
            setSuccess('Profile updated successfully!');
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                data-lenis-prevent
                className="relative bg-secondary/95 backdrop-blur-md rounded-2xl shadow-2xl border border-border-glass w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-text-secondary/60 hover:text-text-secondary transition"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-semibold text-text-secondary mb-6 text-center">Edit Profile</h2>

                {error && (
                    <div className="mb-4 text-sm text-red-400 text-center bg-red-500/10 py-2 rounded-lg">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 text-sm text-green-400 text-center bg-green-500/10 py-2 rounded-lg">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* ====== PROFILE IMAGE ====== */}
                    <div className="flex items-center gap-4 pb-2">
                        <div className="w-20 h-20 rounded-full overflow-hidden border border-accent-orange/15 bg-white/5 flex-shrink-0">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted">No image</div>
                            )}
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="px-4 py-2 text-sm bg-accent-orange/20 text-accent-orange rounded-lg hover:bg-accent-orange/30 transition"
                            >
                                Upload Image
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <p className="text-xs text-text-secondary/60 mt-1">Max 5MB, JPG/PNG</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border-glass my-6 sm:my-8"></div>

                    {/* ====== PERSONAL INFORMATION ====== */}
                    <div>
                        <h3 className="text-sm font-medium text-text-secondary/80 uppercase tracking-wider mb-3">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary/80 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary/80 mb-1">Middle Initial</label>
                                <input
                                    type="text"
                                    name="middleInitial"
                                    value={formData.middleInitial}
                                    onChange={handleChange}
                                    maxLength="1"
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary/80 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary/80 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary/80 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border-glass my-6 sm:my-8"></div>

                    {/* ====== BIO & LOCATION ====== */}
                    <div>
                        <h3 className="text-sm font-medium text-text-secondary/80 uppercase tracking-wider mb-3">
                            Bio & Location
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary/80 mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary/80 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border-glass my-6 sm:my-8"></div>

                    {/* ====== SKILLS ====== */}
                    <div>
                        <h3 className="text-sm font-medium text-text-secondary/80 uppercase tracking-wider mb-3">
                            Skills
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary/80 mb-1">Skills (comma separated)</label>
                            <input
                                type="text"
                                value={skillsInput}
                                onChange={handleSkillsInputChange}
                                className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                placeholder="e.g. React, Node.js, Design"
                            />
                            <p className="text-xs text-text-secondary/60 mt-1">Separate each skill with a comma</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border-glass my-6 sm:my-8"></div>

                    {/* ====== SOCIAL LINKS ====== */}
                    <div>
                        <h3 className="text-sm font-medium text-text-secondary/80 uppercase tracking-wider mb-3">
                            Social Links
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-text-secondary/60 mb-1">GitHub</label>
                                <input
                                    type="url"
                                    name="social.github"
                                    value={formData.social.github}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-text-secondary/60 mb-1">Facebook</label>
                                <input
                                    type="url"
                                    name="social.facebook"
                                    value={formData.social.facebook}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                    placeholder="https://facebook.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-text-secondary/60 mb-1">Indeed</label>
                                <input
                                    type="url"
                                    name="social.indeed"
                                    value={formData.social.indeed}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                                    placeholder="https://indeed.com/username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ====== SUBMIT ====== */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-accent-orange hover:bg-accent-orange/90 text-black font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:ring-offset-2 focus:ring-offset-secondary disabled:opacity-60 mt-8"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;